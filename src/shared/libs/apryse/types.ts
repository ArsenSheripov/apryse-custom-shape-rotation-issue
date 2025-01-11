import { Core } from '@pdftron/webviewer';

export type LinkParams = {
  url?: string;
  pageToLinkTo?: number;
};

export type TextFormat = Partial<
  Record<
    Core.Annotations.FreeTextAnnotation.RichTextEditor.Format,
    Core.Annotations.FreeTextAnnotation.RichTextEditor.FormatValue | Core.Annotations.Color
  >
>;

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextVerticalAlign = 'top' | 'center' | 'bottom';
export type AnnotationsChangedActions = 'add' | 'delete' | 'modify';
export type AnnotationsChanged = {
  annotations: Core.Annotations.Annotation[];
  action: AnnotationsChangedActions;
};

export enum AnnotationCustomData {
  FontPreset = 'fontPreset',
  WatermarkPageRange = 'watermarkPageRange',
}

export type FileSource = string | Core.PDFNet.PDFDoc | File;
