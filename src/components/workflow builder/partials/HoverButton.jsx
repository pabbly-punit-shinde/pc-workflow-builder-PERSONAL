// import { width } from '@mui/system';
import React, { useState } from 'react';

function HoverButton({ isHorizontal, color, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: isHorizontal ? 35 : -18,
    right: isHorizontal ? -23 : 33,
    rotate: isHorizontal ? '270deg' : '0deg',
    background: color,
    color: 'white',
    border: 'none',
    borderRadius: '0 0 150px 150px',
    width: 34,
    height: 16,
    cursor: 'pointer',
    // boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.1s ease',
    opacity: '50%',
  };

  const hoverStyle = {
    opacity: '100%',
  };

  // const svgStyle = {
  //   transition: 'all 0.1s ease',
  //   width: isHovered ? 16 : 10, // Width for svg based on hover
  //   height: isHovered ? 16 : 10, // Height for svg based on hover
  // };

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
        style={{width:'12px'}}
        viewBox="0 0 24 24"
      >
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 20v-8m0 0V4m0 8h8m-8 0H4"/>
      </svg>
    </button>
  );
}

export default HoverButton;
