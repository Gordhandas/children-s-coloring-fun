
export enum Tool {
  BRUSH = 'BRUSH',
  FILL = 'FILL',
  ERASER = 'ERASER',
}

export interface PreDrawnImage {
  id: string;
  name: string;
  thumbnailUrl: string; // Using picsum for placeholders
  svgContent: string;
}

export type DrawingMode = 'welcome' | 'selectingImage' | 'coloringTemplate' | 'freeDraw';

export interface Color {
  name: string;
  hex: string;
}
