import { RefObject, useEffect } from 'react';
import { DocumentZoom } from 'shared/libs/apryse/document-zoom';
import { throttle } from 'throttle-debounce';

export const useZoomInitialization = (scrollView: RefObject<HTMLElement>) => {

  useEffect(() => {
    const wheelToZoom = (e: WheelEvent) => {
      const currentZoomFactor = DocumentZoom.getZoomFactor();

      const normalizedDeltaY = Math.sign(e.deltaY);

      let newZoomFactor = currentZoomFactor;
      if (normalizedDeltaY < 0) {
        newZoomFactor = Math.min(
          currentZoomFactor + DocumentZoom.getStep(currentZoomFactor),
          DocumentZoom.getMaxZoomLevel()
        );
      } else if (normalizedDeltaY > 0) {
        newZoomFactor = Math.max(
          currentZoomFactor - DocumentZoom.getStep(currentZoomFactor),
          DocumentZoom.getMinZoomLevel()
        );
      }

      DocumentZoom.zoomToMouse(newZoomFactor, e);
    };

    const onWheel = throttle(40, (e: WheelEvent) => {
      if (e.metaKey || e.ctrlKey) {
        e.preventDefault();

        wheelToZoom(e);
      }
    });

    const onWheelPrevent = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', onWheelPrevent, { passive: false });

    scrollView.current?.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      // @ts-ignore
      scrollView.current?.removeEventListener('wheel', onWheel, { passive: false });
      // @ts-ignore
      window.removeEventListener('wheel', onWheelPrevent, { passive: false });
    };
  }, [scrollView]);
};
