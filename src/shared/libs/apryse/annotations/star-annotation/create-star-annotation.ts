import { DocumentCoreInstance } from '../../document-core';

interface CreateStarAnnotationParams {
  Annotations: DocumentCoreInstance['Annotations'];
}

export const StarAnnotationName = 'star';

const INITIAL_STAR_WIDTH = 44;
const INITIAL_STAR_HEIGHT = 45;

export const createStarAnnotation = ({ Annotations }: CreateStarAnnotationParams) => {
  class StarAnnotation extends Annotations.CustomAnnotation {
    constructor() {
      super(StarAnnotationName);
      this.Subject = 'Star';
    }

    draw(ctx: CanvasRenderingContext2D, pageMatrix: unknown) {
      this.setStyles(ctx, pageMatrix);

      const originalAspectRatio = INITIAL_STAR_HEIGHT / INITIAL_STAR_WIDTH;
      const currentAspectRatio = this.Width / this.Height;

      let drawWidth;
      let drawHeight;
      let offsetX;
      let offsetY;

      if (currentAspectRatio > originalAspectRatio) {
        drawHeight = this.Height;
        drawWidth = drawHeight * originalAspectRatio;
        offsetX = (this.Width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = this.Width;
        drawHeight = drawWidth / originalAspectRatio;
        offsetX = 0;
        offsetY = (this.Height - drawHeight) / 2;
      }

      const points = [
        [0.5, 0.03],
        [0.646, 0.335],
        [0.973, 0.384],
        [0.736, 0.621],
        [0.792, 0.956],
        [0.5, 0.798],
        [0.207, 0.956],
        [0.264, 0.621],
        [0.027, 0.384],
        [0.354, 0.335],
      ];

      ctx.beginPath();

      const startX = this.X + offsetX + points[0][0] * drawWidth;
      const startY = this.Y + offsetY + points[0][1] * drawHeight;
      ctx.moveTo(startX, startY);

      for (let i = 1; i < points.length; i++) {
        const x = this.X + offsetX + points[i][0] * drawWidth;
        const y = this.Y + offsetY + points[i][1] * drawHeight;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(startX, startY);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.fill();
      ctx.stroke();
    }
  }

  StarAnnotation.prototype.elementName = StarAnnotationName;

  return StarAnnotation;
};
