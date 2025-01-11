import { DocumentViewer } from './document-viewer';

interface ZoomStepFactor {
  step: number;
  startZoom: number;
}

const zoomStepFactors: ZoomStepFactor[] = [
  {
    step: 7.5,
    startZoom: 0,
  },
  {
    step: 15,
    startZoom: 100,
  },
  {
    step: 35,
    startZoom: 250,
  },
  {
    step: 75,
    startZoom: 400,
  },
];

export class DocumentZoom {
  private static minZoom = 0.05;
  private static maxZoom = 9.99;

  private static zoomStepHistory: number[] = [];

  // Keeping track of changes to zoomFactor outside this helper functions
  private static storedZoomFactor = -1;

  static getMinZoomLevel() {
    return this.minZoom;
  }

  static getMaxZoomLevel() {
    return this.maxZoom;
  }

  static getViewCenterAfterScale(scale: number) {
    const documentContainer = document.getElementById('document-scroll-view');
    const documentWrapper = document.getElementById('document-viewer');

    if (!documentContainer || !documentWrapper) {
      return { x: 0, y: 0 };
    }

    const clientX = window.innerWidth / 2;
    const clientY = window.innerHeight / 2;

    const x =
      (clientX + documentContainer.scrollLeft - documentWrapper.offsetLeft) * scale -
      clientX +
      documentContainer.offsetLeft;
    const y =
      (clientY + documentContainer.scrollTop - documentWrapper.offsetTop) * scale -
      clientY +
      documentContainer.offsetTop;

    return { x, y };
  }

  static convertZoomStepFactorsToRangesMap(zoomStepFactors: ZoomStepFactor[]) {
    const rangesMap: Record<string, [number | null, number | null]> = {};

    zoomStepFactors.sort((a, b) => a.startZoom - b.startZoom);
    for (let i = 0; i < zoomStepFactors.length; i++) {
      const zoomStepFactor = zoomStepFactors[i];
      const nextZoomStepFactor = zoomStepFactors[i + 1];
      rangesMap[`${zoomStepFactor.step / 100}`] = nextZoomStepFactor
        ? [zoomStepFactor.startZoom / 100, nextZoomStepFactor.startZoom / 100]
        : [zoomStepFactor.startZoom / 100, null];
    }

    return rangesMap;
  }

  static getStep(currentZoomFactor: number) {
    const zoomFactorRangesMap = this.convertZoomStepFactorsToRangesMap(zoomStepFactors);
    const steps = Object.keys(zoomFactorRangesMap);
    const step = steps.find(step => {
      const zoomFactorRanges = zoomFactorRangesMap[step];
      return this.isCurrentZoomFactorInRange(currentZoomFactor, zoomFactorRanges);
    });

    if (!step) return 0;

    return parseFloat(step);
  }

  static isCurrentZoomFactorInRange(zoomFactor: number, ranges: [number | null, number | null]) {
    const [rangeLowBound, rangeHighBound] = ranges;

    if (rangeLowBound === null) {
      return zoomFactor < (rangeHighBound || 0);
    }

    if (rangeHighBound === null) {
      return zoomFactor >= rangeLowBound;
    }

    return zoomFactor >= rangeLowBound && zoomFactor < rangeHighBound;
  }

  static zoomToInternal(currentZoomFactor: number, newZoomFactor: number) {
    const scale = newZoomFactor / currentZoomFactor;
    const { x, y } = this.getViewCenterAfterScale(scale);
    DocumentViewer.documentViewer.zoomTo(newZoomFactor, x, y);

    this.storedZoomFactor = newZoomFactor;
  }

  static resetZoomStepHistory() {
    this.zoomStepHistory = [];
  }

  static zoomIn() {
    const currentZoomFactor = this.getZoomFactor();

    if (this.storedZoomFactor > 0 && currentZoomFactor !== this.storedZoomFactor) {
      // zoom level was changed by external side effect (like one of core's function to change zoom level)
      // in these cases we need to reset step history
      this.resetZoomStepHistory();
    }
    if (currentZoomFactor === this.getMaxZoomLevel()) {
      return;
    }

    let step = this.getStep(currentZoomFactor);

    if (this.zoomStepHistory.length > 0 && this.zoomStepHistory[this.zoomStepHistory.length - 1] < 0) {
      // if step history has steps and it has been opposite direction (zoomOut)
      // We use that step. This makes sure that when crossing step range, zoom level goes to same
      // as it was when zoomOut was done.
      // We differentiate zoomIn and zoomOut steps by zoomOut steps are negative and zoomIn are positive
      // thus here using absolute value
      step = Math.abs(this.zoomStepHistory.pop()!);
    } else {
      // We differentiate zoomIn and zoomOut steps by zoomOut steps are negative and zoomIn are positive
      this.zoomStepHistory.push(step);
    }
    const newZoomFactor = Math.min(currentZoomFactor + step, this.getMaxZoomLevel());
    this.zoomToInternal(currentZoomFactor, newZoomFactor);
  }

  static zoomOut() {
    const currentZoomFactor = this.getZoomFactor();

    if (this.storedZoomFactor > 0 && currentZoomFactor !== this.storedZoomFactor) {
      // zoom level was changed by external side effect (like one of core's function to change zoom level)
      // in these cases we need to reset step history
      this.resetZoomStepHistory();
    }
    if (currentZoomFactor === this.getMinZoomLevel()) {
      return;
    }

    let step = this.getStep(currentZoomFactor);
    if (this.zoomStepHistory.length > 0 && this.zoomStepHistory[this.zoomStepHistory.length - 1] > 0) {
      // if step history has steps and it has been opposite direction (zoomIn)
      // We use that step. This makes sure that when crossing step range, zoom level goes to same
      // as it was when zoomIn was done.
      // We differentiate zoomIn and zoomOut steps by zoomOut steps are negative and zoomIn are positive
      step = this.zoomStepHistory.pop()!;
    } else {
      // We differentiate zoomIn and zoomOut steps by zoomOut steps are negative and zoomIn are positive
      this.zoomStepHistory.push(-1 * step);
    }
    const newZoomFactor = Math.max(currentZoomFactor - step, this.getMinZoomLevel());
    this.zoomToInternal(currentZoomFactor, newZoomFactor);
  }

  static zoomTo(newZoomFactor: number) {
    // if user sets certain zoom level, then we reset the step history
    this.resetZoomStepHistory();

    const currentZoomFactor = this.getZoomFactor();

    this.zoomToInternal(currentZoomFactor, newZoomFactor);
  }

  static zoomToMouse(zoomFactor: number, mouseEvent: MouseEvent) {
    const xOffset = 0;

    // height of main header and the header tools that may appear below
    const headerHeight = (document.querySelector('[data-element="document-header"]') as HTMLElement)?.offsetHeight || 0;

    const yOffset = headerHeight;

    DocumentViewer.documentViewer.zoomToMouse(zoomFactor, xOffset, yOffset, mouseEvent);
  }

  static getZoomFactor() {
    return DocumentViewer.documentViewer.getZoomLevel();
  }

  static fitToWidth() {
    this.resetZoomStepHistory();

    DocumentViewer.documentViewer.setFitMode(DocumentViewer.documentViewer.FitMode.FitWidth);
  }

  static fitToPage() {
    this.resetZoomStepHistory();

    DocumentViewer.documentViewer.setFitMode(DocumentViewer.documentViewer.FitMode.FitPage);
  }
}
