import { DocumentCoreInstance } from '../../document-core';

interface CreateCheckAnnotationParams {
  Annotations: DocumentCoreInstance['Annotations'];
}

export const CheckAnnotationName = 'check';

const INITIAL_CHECK_WIDTH = 18;
const INITIAL_CHECK_HEIGHT = 13;

export const createCheckAnnotation = ({ Annotations }: CreateCheckAnnotationParams) => {
  class CheckAnnotation extends Annotations.CustomAnnotation {
    constructor() {
      super(CheckAnnotationName); // provide the custom XFDF element name
      this.Subject = 'Check';
    }

    draw(ctx: CanvasRenderingContext2D, pageMatrix: unknown) {
      this.setStyles(ctx, pageMatrix);
      const size = Math.max(this.Width, this.Height);
      const originalAspectRatio = INITIAL_CHECK_HEIGHT / INITIAL_CHECK_WIDTH;
      const halfLineWidth = ctx.lineWidth / 2; // Calculating half of the lineWidth to adjust for stroke overflow
      const drawingAreaWidth = Math.max(size - ctx.lineWidth, 0); // Calculating the drawing area, cant't be negative
      const drawingAreaHeight = Math.max(size * originalAspectRatio - ctx.lineWidth, 0); // Calculating the drawing area, cant't be negative

      ctx.beginPath();
      ctx.moveTo(this.X + drawingAreaWidth * 0.944 + halfLineWidth, this.Y + drawingAreaHeight * 0.072 + halfLineWidth);
      ctx.lineTo(this.X + drawingAreaWidth * 0.333 + halfLineWidth, this.Y + drawingAreaHeight * 0.918 + halfLineWidth);
      ctx.lineTo(this.X + drawingAreaWidth * 0.056 + halfLineWidth, this.Y + drawingAreaHeight * 0.533 + halfLineWidth);
      /* Calculated the line coordinates based on the annotation's dimensions:
          The original SVG was 18x13, so we convert the coordinates to percentages.
          Start point: (17, 0.933594) becomes (94.4% of width, 7.2% of height)
          Middle point: (6, 11.9336) becomes (33.3% of width, 91.8% of height)
          End point: (1, 6.93359) becomes (5.6% of width, 53.3% of height)
        Used these percentages to calculate actual coordinates based on this.X, this.Y, this.Width, and this.Height. */

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      this.Width = size;
      this.Height = size * originalAspectRatio;
    }
  }

  // this is necessary to set the elementName before instantiation
  CheckAnnotation.prototype.elementName = CheckAnnotationName;

  return CheckAnnotation;
};
