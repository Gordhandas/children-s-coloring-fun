
import { Color, PreDrawnImage, Tool } from './types';

export const APP_COLORS: Color[] = [
  { name: 'Red', hex: '#EF4444' }, { name: 'Orange', hex: '#F97316' }, { name: 'Yellow', hex: '#EAB308' },
  { name: 'Lime', hex: '#84CC16' }, { name: 'Green', hex: '#22C55E' }, { name: 'Teal', hex: '#14B8A6' },
  { name: 'Cyan', hex: '#06B6D4' }, { name: 'Blue', hex: '#3B82F6' }, { name: 'Indigo', hex: '#6366F1' },
  { name: 'Violet', hex: '#8B5CF6' }, { name: 'Purple', hex: '#A855F7' }, { name: 'Fuchsia', hex: '#D946EF' },
  { name: 'Pink', hex: '#EC4899' }, { name: 'Rose', hex: '#F43F5E' }, { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' }, { name: 'Light Gray', hex: '#D1D5DB' }, { name: 'Gray', hex: '#6B7280' },
];

export const DEFAULT_COLOR: string = APP_COLORS[0].hex;
export const DEFAULT_BRUSH_SIZE: number = 5;
export const MIN_BRUSH_SIZE: number = 1;
export const MAX_BRUSH_SIZE: number = 50;

export const TOOLS_CONFIG = {
  [Tool.BRUSH]: { name: 'Brush', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
  [Tool.FILL]: { name: 'Fill', icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 19v-6H5v6h2zm4 0h-2v-4h2v4zm4 0h-2v-4h2v4zm0-6h-2V9h2V7h-2V5H9v2H7v2h2v2h2v2h2v-2h2v2z' }, // Simplified fill icon
  [Tool.ERASER]: { name: 'Eraser', icon: 'M16.24 3.56c-.78-.78-2.05-.78-2.83 0l-1.83 1.83 2.83 2.83 1.83-1.83c.78-.78.78-2.05 0-2.83zM5.03 14.34L14.06 5.3l2.12 2.12-9.03 9.04H5.03v-2.12zm0 4.24H21v2H3v-4.59l2.03-2.03v4.62z' },
};

const CAR_SVG = `
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <rect class="colorable-part" x="10" y="30" width="180" height="40" stroke="black" stroke-width="2" fill="#A0A0A0" data-default-color="#A0A0A0"/>
  <rect class="colorable-part" x="60" y="10" width="80" height="25" stroke="black" stroke-width="2" fill="#ADD8E6" data-default-color="#ADD8E6"/>
  <circle class="colorable-part" cx="50" cy="80" r="15" stroke="black" stroke-width="2" fill="#333333" data-default-color="#333333"/>
  <circle class="colorable-part" cx="150" cy="80" r="15" stroke="black" stroke-width="2" fill="#333333" data-default-color="#333333"/>
  <line x1="60" y1="10" x2="80" y2="30" stroke="black" stroke-width="2"/>
  <line x1="140" y1="10" x2="120" y2="30" stroke="black" stroke-width="2"/>
</svg>
`;

const FLOWER_SVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle class="colorable-part" cx="50" cy="50" r="15" stroke="black" stroke-width="1.5" fill="#FFEB3B" data-default-color="#FFEB3B"/>
  <ellipse class="colorable-part" cx="50" cy="28" rx="10" ry="18" stroke="black" stroke-width="1.5" fill="#FFC0CB" data-default-color="#FFC0CB"/>
  <ellipse class="colorable-part" cx="50" cy="28" rx="10" ry="18" stroke="black" stroke-width="1.5" fill="#FFC0CB" data-default-color="#FFC0CB" transform="rotate(60 50 50)"/>
  <ellipse class="colorable-part" cx="50" cy="28" rx="10" ry="18" stroke="black" stroke-width="1.5" fill="#FFC0CB" data-default-color="#FFC0CB" transform="rotate(120 50 50)"/>
  <ellipse class="colorable-part" cx="50" cy="28" rx="10" ry="18" stroke="black" stroke-width="1.5" fill="#FFC0CB" data-default-color="#FFC0CB" transform="rotate(180 50 50)"/>
  <ellipse class="colorable-part" cx="50" cy="28" rx="10" ry="18" stroke="black" stroke-width="1.5" fill="#FFC0CB" data-default-color="#FFC0CB" transform="rotate(240 50 50)"/>
  <ellipse class="colorable-part" cx="50" cy="28" rx="10" ry="18" stroke="black" stroke-width="1.5" fill="#FFC0CB" data-default-color="#FFC0CB" transform="rotate(300 50 50)"/>
  <rect class="colorable-part" x="48" y="65" width="4" height="30" stroke="black" stroke-width="1.5" fill="#4CAF50" data-default-color="#4CAF50"/>
</svg>
`;

const BUTTERFLY_SVG = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <ellipse class="colorable-part" cx="50" cy="50" rx="5" ry="25" fill="#A0522D" data-default-color="#A0522D" stroke="black" stroke-width="1"/>
  <path class="colorable-part" d="M50 25 Q30 10 20 30 Q30 40 50 50" fill="#FFA500" data-default-color="#FFA500" stroke="black" stroke-width="1"/>
  <path class="colorable-part" d="M50 25 Q70 10 80 30 Q70 40 50 50" fill="#FFA500" data-default-color="#FFA500" stroke="black" stroke-width="1"/>
  <path class="colorable-part" d="M50 50 Q30 60 20 70 Q35 85 50 75" fill="#FFD700" data-default-color="#FFD700" stroke="black" stroke-width="1"/>
  <path class="colorable-part" d="M50 50 Q70 60 80 70 Q65 85 50 75" fill="#FFD700" data-default-color="#FFD700" stroke="black" stroke-width="1"/>
  <line x1="50" y1="15" x2="45" y2="5" stroke="black" stroke-width="1.5"/>
  <circle cx="44" cy="4" r="2" fill="black"/>
  <line x1="50" y1="15" x2="55" y2="5" stroke="black" stroke-width="1.5"/>
  <circle cx="56" cy="4" r="2" fill="black"/>
</svg>
`;


export const PRE_DRAWN_IMAGES: PreDrawnImage[] = [
  { id: 'car', name: 'Cute Car', thumbnailUrl: 'https://picsum.photos/seed/car/100/80', svgContent: CAR_SVG },
  { id: 'flower', name: 'Pretty Flower', thumbnailUrl: 'https://picsum.photos/seed/flower/100/80', svgContent: FLOWER_SVG },
  { id: 'butterfly', name: 'Colorful Butterfly', thumbnailUrl: 'https://picsum.photos/seed/butterfly/100/80', svgContent: BUTTERFLY_SVG },
];

// Sound effect placeholders - in a real app, these would be URLs to audio files
export const SOUND_EFFECTS = {
  CLICK: 'sound_click.mp3',
  FILL: 'sound_fill.mp3',
  ERASE: 'sound_erase.mp3',
  COMPLETE: 'sound_complete.mp3',
  REWARD: 'sound_reward.mp3',
  SWOOSH: 'sound_swoosh.mp3'
};
