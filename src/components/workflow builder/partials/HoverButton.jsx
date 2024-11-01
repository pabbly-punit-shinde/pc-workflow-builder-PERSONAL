// HoverButton.js
import React, { useState } from 'react';

function HoverButton({ isHorizontal, color, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: isHorizontal ? 34 : -12,
    right: isHorizontal ? -20 : 28,
    rotate: isHorizontal ? '270deg' : '0deg',
    fontSize: 12,
    background: color,
    color: 'white',
    border: 'none',
    borderRadius: '0 0 150px 150px',
    width: 30,
    height: 15,
    cursor: 'pointer',
    boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.2s ease', // smooth transition
    opacity: '70%',
  };

  const hoverStyle = {
    bottom: isHorizontal ? 27 : -20,
    right: isHorizontal ? -20 : 28,
    border: '1px solid white',
    borderRadius: '50%',
    width: 30,
    height: 30,
    fontSize: 16, // Increased font size for hover
    // transform: 'scale(1.5)', // Scale up the button on hover
    opacity: '100%',
  };

  return (
    <button
      type="button"
      style={isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      +
    </button>
  );
}

export default HoverButton;
