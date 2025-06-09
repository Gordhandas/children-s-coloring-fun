import React from 'react';
import { Tool } from '../types';
import { TOOLS_CONFIG, MIN_BRUSH_SIZE, MAX_BRUSH_SIZE, SOUND_EFFECTS } from '../constants';
import { playSound } from '../utils/soundHelper';


interface ToolSelectorProps {
  availableTools: Tool[];
  selectedTool: Tool;
  onToolSelect: (tool: Tool) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
  isFreeDrawMode: boolean;
}

const ToolSelector: React.FC<ToolSelectorProps> = ({
  availableTools,
  selectedTool,
  onToolSelect,
  brushSize,
  onBrushSizeChange,
  isFreeDrawMode,
}) => {
  return (
    <div className="p-4 bg-amber-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-amber-700">Tools</h3>
      <div className="space-y-2">
        {availableTools.map((tool) => (
          <button
            key={tool}
            title={TOOLS_CONFIG[tool].name}
            className={`w-full flex items-center justify-start p-2 rounded-md transition-all duration-150 ease-in-out transform hover:bg-amber-300 hover:shadow-sm
                        ${selectedTool === tool ? 'bg-amber-400 text-white font-semibold shadow-inner' : 'bg-amber-200 text-amber-800'}`}
            onClick={() => {
              onToolSelect(tool);
              playSound(SOUND_EFFECTS.CLICK);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={TOOLS_CONFIG[tool].icon} />
            </svg>
            {TOOLS_CONFIG[tool].name}
          </button>
        ))}
      </div>
      {isFreeDrawMode && selectedTool === Tool.BRUSH && (
        <div className="mt-4">
          <label htmlFor="brushSize" className="block text-sm font-medium text-amber-700 mb-1">
            Brush Size: {brushSize}
          </label>
          <input
            type="range"
            id="brushSize"
            min={MIN_BRUSH_SIZE}
            max={MAX_BRUSH_SIZE}
            value={brushSize}
            onChange={(e) => onBrushSizeChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>
      )}
    </div>
  );
};

export default ToolSelector;