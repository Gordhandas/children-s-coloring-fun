import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Tool, PreDrawnImage } from '../types';
import { playSound } from '../utils/soundHelper';
import { SOUND_EFFECTS, DEFAULT_COLOR } from '../constants';

interface DrawingCanvasProps {
  mode: 'svg' | 'canvas';
  selectedImage?: PreDrawnImage | null;
  selectedColor: string;
  selectedTool: Tool;
  brushSize: number;
  width?: number;
  height?: number;
  onSaveRequestRef: React.MutableRefObject<(() => Promise<string | null>) | null>;
  onClearRequest: () => void; // Callback to trigger re-keying from parent for full reset
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  mode,
  selectedImage,
  selectedColor,
  selectedTool,
  brushSize,
  width = 600,
  height = 400,
  onSaveRequestRef,
  onClearRequest,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [svgString, setSvgString] = useState<string | null>(null);

  const getCursorClass = useCallback(() => {
    if (selectedTool === Tool.FILL) return 'fill-cursor';
    if (selectedTool === Tool.BRUSH) return 'paint-cursor';
    if (selectedTool === Tool.ERASER) return 'eraser-cursor';
    return 'default';
  }, [selectedTool]);


  useEffect(() => {
    if (mode === 'svg' && selectedImage) {
      setSvgString(selectedImage.svgContent);
    } else if (mode === 'canvas') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = selectedColor;
          ctx.lineWidth = brushSize;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
      }
    }
  }, [mode, selectedImage, selectedColor, brushSize, width, height]); // Re-initialize canvas/SVG on these changes

  const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'canvas' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    if ('touches' in event.nativeEvent) {
      x = event.nativeEvent.touches[0].clientX - rect.left;
      y = event.nativeEvent.touches[0].clientY - rect.top;
    } else {
      x = event.nativeEvent.offsetX;
      y = event.nativeEvent.offsetY;
    }
    
    ctx.strokeStyle = selectedTool === Tool.ERASER ? '#FFFFFF' : selectedColor; // Eraser draws white
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [isDrawing, mode, selectedColor, selectedTool, brushSize]);

  const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (mode !== 'canvas' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
     let x, y;
    if ('touches' in event.nativeEvent) {
      x = event.nativeEvent.touches[0].clientX - rect.left;
      y = event.nativeEvent.touches[0].clientY - rect.top;
    } else {
      x = event.nativeEvent.offsetX;
      y = event.nativeEvent.offsetY;
    }

    ctx.beginPath();
    ctx.moveTo(x,y);
    // For dot on click
    if (selectedTool === Tool.BRUSH || selectedTool === Tool.ERASER) {
        ctx.fillStyle = selectedTool === Tool.ERASER ? '#FFFFFF' : selectedColor;
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath(); // Reset path for next lineTo
        ctx.moveTo(x, y);
    }

  }, [mode, selectedColor, selectedTool, brushSize]);

  const stopDrawing = useCallback(() => {
    if (mode !== 'canvas') return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath(); // Reset path
    }
  }, [mode]);

  const handleSvgClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== 'svg' || !svgContainerRef.current) return;
    const target = event.target as SVGElement;
    if (target.classList && target.classList.contains('colorable-part')) {
      if (selectedTool === Tool.FILL) {
        target.setAttribute('fill', selectedColor);
        playSound(SOUND_EFFECTS.FILL);
      } else if (selectedTool === Tool.ERASER) {
        const defaultColor = target.dataset.defaultColor || 'white';
        target.setAttribute('fill', defaultColor);
        playSound(SOUND_EFFECTS.ERASE);
      }
    }
  }, [mode, selectedColor, selectedTool]);


  useEffect(() => {
    onSaveRequestRef.current = async (): Promise<string | null> => {
      if (mode === 'canvas' && canvasRef.current) {
        return canvasRef.current.toDataURL('image/png');
      } else if (mode === 'svg' && svgContainerRef.current) {
        const svgElement = svgContainerRef.current.querySelector('svg');
        if (svgElement) {
          const svgData = new XMLSerializer().serializeToString(svgElement);
          const img = new Image();
          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const url = URL.createObjectURL(svgBlob);

          return new Promise((resolve) => {
            img.onload = () => {
              const tempCanvas = document.createElement('canvas');
              // Ensure canvas dimensions match SVG to avoid clipping/scaling issues
              const svgRect = svgElement.viewBox.baseVal;
              const svgWidth = svgRect && svgRect.width !==0 ? svgRect.width : (svgElement.getAttribute('width') ? parseFloat(svgElement.getAttribute('width') as string) : width);
              const svgHeight = svgRect && svgRect.height !==0 ? svgRect.height : (svgElement.getAttribute('height') ? parseFloat(svgElement.getAttribute('height') as string) : height);
              
              tempCanvas.width = svgWidth;
              tempCanvas.height = svgHeight;
              
              const ctx = tempCanvas.getContext('2d');
              if (ctx) {
                 // Fill with white background first for transparency
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                ctx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
                resolve(tempCanvas.toDataURL('image/png'));
              } else {
                resolve(null);
              }
              URL.revokeObjectURL(url);
            };
            img.onerror = () => {
              console.error("Error loading SVG to image for saving.");
              URL.revokeObjectURL(url);
              resolve(null);
            }
            img.src = url;
          });
        }
      }
      return Promise.resolve(null);
    };
  }, [mode, width, height, onSaveRequestRef]);


  return (
    <div className={`bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-pink-300 ${getCursorClass()}`} style={{ width, height }}>
      {mode === 'canvas' && (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="touch-none"
        />
      )}
      {mode === 'svg' && selectedImage && svgString && (
        <div
          ref={svgContainerRef}
          onClick={handleSvgClick}
          className="w-full h-full flex items-center justify-center p-2"
          dangerouslySetInnerHTML={{ __html: svgString }}
        />
      )}
    </div>
  );
};

export default DrawingCanvas;