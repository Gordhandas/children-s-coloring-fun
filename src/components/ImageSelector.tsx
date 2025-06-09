import React from 'react';
import { PreDrawnImage } from '../types';
import { playSound } from '../utils/soundHelper';
import { SOUND_EFFECTS } from '../constants';

interface ImageSelectorProps {
  images: PreDrawnImage[];
  onImageSelect: (image: PreDrawnImage) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images, onImageSelect }) => {
  return (
    <div className="p-6 bg-emerald-50 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-emerald-700">Choose a Picture to Color!</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => {
              onImageSelect(image);
              playSound(SOUND_EFFECTS.SWOOSH);
            }}
            className="p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-75"
            aria-label={`Color ${image.name}`}
          >
            <img src={image.thumbnailUrl} alt={image.name} className="w-full h-32 object-cover rounded-md mb-2" />
            <p className="text-center text-emerald-600 font-medium">{image.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;