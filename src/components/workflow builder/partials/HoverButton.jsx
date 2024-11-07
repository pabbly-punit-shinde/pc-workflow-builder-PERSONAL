import React, { useState } from 'react';

function HoverButton({ isHorizontal, color, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: isHorizontal ? 35 : -15,
    right: isHorizontal ? -23 : 27,
    rotate: isHorizontal ? '270deg' : '0deg',
    background: color,
    color: 'white',
    border: 'none',
    borderRadius: '0 0 150px 150px',
    width: 30,
    height: 15,
    cursor: 'pointer',
    // boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.1s ease',
    opacity: '70%',
  };

  const hoverStyle = {
    bottom: isHorizontal ? 27 : -19,
    right: isHorizontal ? -20 : 27,
    border: '2px solid #F3F7FA',
    borderRadius: '50%',
    width: 30,
    height: 30,
    fontSize: 16,
    opacity: '100%',
  };

  const svgStyle = {
    transition: 'all 0.1s ease',
    width: isHovered ? 16 : 10, // Width for svg based on hover
    height: isHovered ? 16 : 10, // Height for svg based on hover
  };

  return (
    <button
      type="button"
      style={isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        style={svgStyle}
        viewBox="0 0 24 24"
      >
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 20v-8m0 0V4m0 8h8m-8 0H4"/>
      </svg>
    </button>
  );
}

export default HoverButton;
