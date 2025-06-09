
import React from 'react';
import { Color } from '../types';
import { playSound } from '../utils/soundHelper';
import { SOUND_EFFECTS } from '../constants';

interface ColorPaletteProps {
  colors: Color[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, selectedColor, onColorSelect }) => {
  return (
    <div className="p-4 bg-sky-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-sky-700">Colors</h3>
      <div className="grid grid-cols-6 gap-2">
        {colors.map((color) => (
          <button
            key={color.hex}
            title={color.name}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-150 ease-in-out transform hover:scale-110
                        ${selectedColor === color.hex ? 'ring-4 ring-offset-2 ring-sky-500 scale-110 border-sky-600' : 'border-gray-300 hover:border-sky-400'}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => {
              onColorSelect(color.hex);
              playSound(SOUND_EFFECTS.CLICK);
            }}
            aria-label={`Select color ${color.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
