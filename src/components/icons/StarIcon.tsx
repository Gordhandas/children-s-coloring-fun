import React from 'react';

interface StarIconProps {
  className?: string;
}

const StarIcon: React.FC<StarIconProps> = ({ className = "w-8 h-8 text-yellow-400" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.116 3.986 1.037 5.357c.215 1.109-.829 2.013-1.838 1.437L12 17.35l-4.518 2.985c-1.009.576-2.053-.328-1.838-1.437l1.037-5.357L2.584 11.043c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

export default StarIcon;