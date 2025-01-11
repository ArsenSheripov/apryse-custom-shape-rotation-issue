import { DocumentCoreInstance } from '../../document-core';

interface CreateCrossAnnotationParams {
  Annotations: DocumentCoreInstance['Annotations'];
}

export const CrossAnnotationName = 'cross';

export const createCrossAnnotation = ({ Annotations }: CreateCrossAnnotationParams) => {
  class CrossAnnotation extends Annotations.CustomAnnotation {
    constructor() {
      super(CrossAnnotationName); // provide the custom XFDF element name
      this.Subject = 'Cross';
    }

    draw(ctx: CanvasRenderingContext2D, pageMatrix: unknown) {
      this.setStyles(ctx, pageMatrix);

      const size = Math.max(this.Width, this.Height);
      const halfLineWidth = ctx.lineWidth / 2; // Calculatig half of the lineWidth to adjust for stroke overflow
      const drawingArea = Math.max(size - ctx.lineWidth, 0); // Calculatig the drawing area, cant't be negative

      ctx.beginPath();
      ctx.moveTo(this.X + halfLineWidth, this.Y + halfLineWidth);
      ctx.lineTo(this.X + drawingArea + halfLineWidth, this.Y + drawingArea + halfLineWidth);
      ctx.moveTo(this.X + halfLineWidth, this.Y + drawingArea + halfLineWidth);
      ctx.lineTo(this.X + drawingArea + halfLineWidth, this.Y + halfLineWidth);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      this.Width = size;
      this.Height = size;
    }
  }

  // this is necessary to set the elementName before instantiation
  CrossAnnotation.prototype.elementName = CrossAnnotationName;

  return CrossAnnotation;
};
