import React, { useState, useRef, useCallback, useEffect } from 'react';
import ColorPalette from './components/ColorPalette';
import ToolSelector from './components/ToolSelector';
import ImageSelector from './components/ImageSelector';
import DrawingCanvas from './components/DrawingCanvas';
import StarIcon from './components/icons/StarIcon';
import { Tool, DrawingMode, PreDrawnImage } from './types';
import { APP_COLORS, PRE_DRAWN_IMAGES, DEFAULT_COLOR, DEFAULT_BRUSH_SIZE, SOUND_EFFECTS } from './constants';
import { playSound } from './utils/soundHelper';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<DrawingMode>('welcome');
  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_COLOR);
  const [selectedTool, setSelectedTool] = useState<Tool>(Tool.BRUSH);
  const [brushSize, setBrushSize] = useState<number>(DEFAULT_BRUSH_SIZE);
  const [selectedImage, setSelectedImage] = useState<PreDrawnImage | null>(null);
  const [stars, setStars] = useState<number>(0);
  const [drawingKey, setDrawingKey] = useState<number>(0); // Used to reset DrawingCanvas

  const saveDrawingRef = useRef<(() => Promise<string | null>) | null>(null);
  const [showStarAnimation, setShowStarAnimation] = useState<boolean>(false);

  const handleImageSelect = (image: PreDrawnImage) => {
    setSelectedImage(image);
    setCurrentMode('coloringTemplate');
    setSelectedTool(Tool.FILL); // Default to fill tool for templates
    setDrawingKey(prev => prev + 1);
  };

  const handleStartFreeDraw = () => {
    setSelectedImage(null);
    setCurrentMode('freeDraw');
    setSelectedTool(Tool.BRUSH); // Default to brush for free draw
    setDrawingKey(prev => prev + 1);
  };

  const handleClear = () => {
    setDrawingKey(prev => prev + 1); // Re-mount DrawingCanvas to clear it
    playSound(SOUND_EFFECTS.ERASE);
  };

  const handleSave = async () => {
    if (saveDrawingRef.current) {
      const imageDataUrl = await saveDrawingRef.current();
      if (imageDataUrl) {
        const link = document.createElement('a');
        link.href = imageDataUrl;
        link.download = selectedImage ? `${selectedImage.name.toLowerCase().replace(/\s+/g, '_')}_colored.png` : 'my_drawing.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setStars(prevStars => prevStars + 1);
        playSound(SOUND_EFFECTS.REWARD);
        setShowStarAnimation(true);
        setTimeout(() => setShowStarAnimation(false), 1000); // Animation duration
      } else {
        console.error("Failed to get image data for saving.");
      }
    }
  };
  
  const navigateTo = (mode: DrawingMode) => {
    setCurrentMode(mode);
    if (mode === 'welcome') {
        setSelectedImage(null);
    }
    playSound(SOUND_EFFECTS.SWOOSH);
  }

  const availableTools = currentMode === 'coloringTemplate' ? [Tool.FILL, Tool.ERASER] : [Tool.BRUSH, Tool.ERASER];

  const canvasWidth = typeof window !== 'undefined' ? Math.min(800, window.innerWidth - (window.innerWidth > 768 ? 300 : 40) ) : 600; // Sidebar width approx 280px + padding
  const canvasHeight = typeof window !== 'undefined' ? Math.min(600, window.innerHeight - 200) : 400; // Header/footer height approx 150px


  useEffect(() => {
    const body = document.body;
    if (currentMode === 'coloringTemplate' || currentMode === 'freeDraw') {
      if (selectedTool === Tool.FILL) body.classList.add('fill-cursor'); else body.classList.remove('fill-cursor');
      if (selectedTool === Tool.BRUSH) body.classList.add('paint-cursor'); else body.classList.remove('paint-cursor');
      if (selectedTool === Tool.ERASER) body.classList.add('eraser-cursor'); else body.classList.remove('eraser-cursor');
    } else {
      body.classList.remove('fill-cursor', 'paint-cursor', 'eraser-cursor');
    }
    return () => { // Cleanup cursors when component unmounts or mode changes
      body.classList.remove('fill-cursor', 'paint-cursor', 'eraser-cursor');
    };
  }, [currentMode, selectedTool]);


  const renderContent = () => {
    switch (currentMode) {
      case 'welcome':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-sky-200 via-rose-100 to-amber-200 rounded-xl shadow-2xl">
            <img src="https://picsum.photos/seed/kidsart/200/150" alt="Kids Art" className="rounded-full mb-8 shadow-lg" />
            <h1 className="text-5xl font-bold text-pink-600 mb-4 animate-bounce">Coloring Fun!</h1>
            <p className="text-xl text-sky-700 mb-10 text-center">Let's get creative! Choose an activity below.</p>
            <div className="space-y-6 w-full max-w-xs">
              <button
                onClick={() => navigateTo('selectingImage')}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 px-6 rounded-xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Color a Picture
              </button>
              <button
                onClick={handleStartFreeDraw}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Draw Freely
              </button>
            </div>
          </div>
        );
      case 'selectingImage':
        return (
          <div className="w-full p-4">
            <ImageSelector images={PRE_DRAWN_IMAGES} onImageSelect={handleImageSelect} />
            <button onClick={() => navigateTo('welcome')} className="mt-8 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150">
              Back to Main Menu
            </button>
          </div>
        );
      case 'coloringTemplate':
      case 'freeDraw':
        return (
          <div className="flex flex-col md:flex-row gap-4 p-2 md:p-6 h-full w-full">
            <aside className="w-full md:w-72 flex-shrink-0 space-y-4">
              <ToolSelector
                availableTools={availableTools}
                selectedTool={selectedTool}
                onToolSelect={setSelectedTool}
                brushSize={brushSize}
                onBrushSizeChange={setBrushSize}
                isFreeDrawMode={currentMode === 'freeDraw'}
              />
              <ColorPalette colors={APP_COLORS} selectedColor={selectedColor} onColorSelect={setSelectedColor} />
              <div className="space-y-2 p-2 bg-lime-100 rounded-lg shadow-md">
                 <h3 className="text-lg font-semibold mb-2 text-lime-700">Actions</h3>
                <button onClick={handleSave} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-150">Save Art</button>
                <button onClick={handleClear} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-150">Clear</button>
                {currentMode === 'coloringTemplate' && (
                   <button onClick={() => navigateTo('selectingImage')} className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150">Change Picture</button>
                )}
                <button onClick={() => navigateTo('welcome')} className="w-full mt-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-150">Main Menu</button>
              </div>
            </aside>
            <main className="flex-grow flex items-center justify-center">
              <DrawingCanvas
                key={drawingKey} // Force re-mount on change for clean state
                mode={currentMode === 'coloringTemplate' ? 'svg' : 'canvas'}
                selectedImage={selectedImage}
                selectedColor={selectedColor}
                selectedTool={selectedTool}
                brushSize={brushSize}
                width={canvasWidth}
                height={canvasHeight}
                onSaveRequestRef={saveDrawingRef}
                onClearRequest={handleClear}
              />
            </main>
          </div>
        );
      default:
        return <div>Error: Unknown mode</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-pink-50 to-yellow-50 text-gray-800">
      <header className="p-4 bg-pink-500 text-white shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Children's Coloring Fun!</h1>
        <div className="flex items-center space-x-2 relative">
          <StarIcon className="w-10 h-10 text-yellow-300" />
          <span className="text-3xl font-bold">{stars}</span>
          {showStarAnimation && (
            <div className="absolute -top-2 -right-2 animate-ping">
               <StarIcon className="w-12 h-12 text-yellow-400" />
            </div>
          )}
        </div>
      </header>
      <div className={`flex-grow flex items-center justify-center ${currentMode !== 'welcome' && currentMode !== 'selectingImage' ? '' : 'p-4'}`}>
        {renderContent()}
      </div>
       <footer className="text-center p-3 bg-pink-400 text-white text-sm">
        Have fun creating masterpieces! &copy; 2024
      </footer>
    </div>
  );
};

export default App;