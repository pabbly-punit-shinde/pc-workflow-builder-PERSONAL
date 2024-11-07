import React, { useState } from 'react';

// HoverButton component that displays a button with an SVG icon and changes its appearance on hover
function HoverButton({ isHorizontal, color, onClick }) {
  // State to track if the button is being hovered over
  const [isHovered, setIsHovered] = useState(false);

  // Base style for the button (applies when not hovered)
  const baseStyle = {
    display: 'flex', // Center the content (icon) in the button
    justifyContent: 'center', // Align content horizontally at the center
    alignItems: 'center', // Align content vertically at the center
    position: 'absolute', // Absolute positioning for the button
    bottom: isHorizontal ? 35 : -15, // Set the bottom position based on `isHorizontal`
    right: isHorizontal ? -23 : 27, // Set the right position based on `isHorizontal`
    rotate: isHorizontal ? '270deg' : '0deg', // Rotate the button based on `isHorizontal`
    background: color, // Set background color passed from props
    color: 'white', // Set text/icon color to white
    border: 'none', // Remove the border
    borderRadius: '0 0 150px 150px', // Rounded bottom corners for the button
    width: 30, // Width of the button
    height: 15, // Height of the button
    cursor: 'pointer', // Pointer cursor to indicate it's clickable
    // boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.2)', // Optional shadow for the button (commented out)
    transition: 'all 0.1s ease', // Smooth transition for changes in styles
    opacity: '70%', // Initial opacity of the button (70% transparent)
  };

  // Hover style for the button (applies when hovered)
  const hoverStyle = {
    bottom: isHorizontal ? 27 : -19, // Adjust bottom position when hovered
    right: isHorizontal ? -20 : 27, // Adjust right position when hovered
    border: '2px solid #F3F7FA', // Add a border when hovered
    borderRadius: '50%', // Make the button circular when hovered
    width: 30, // Keep width the same during hover
    height: 30, // Increase height when hovered to create a circular effect
    fontSize: 16, // Increase font size when hovered (if any text was present)
    opacity: '100%', // Full opacity on hover (100% transparent)
  };

  // Style for the SVG icon inside the button, with transition effects
  const svgStyle = {
    transition: 'all 0.1s ease', // Smooth transition for changes in SVG size
    width: isHovered ? 16 : 10, // Change width of the SVG based on hover state
    height: isHovered ? 16 : 10, // Change height of the SVG based on hover state
  };

  return (
    <button
      type="button"
      style={isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle} // Apply hover styles if hovered, else base styles
      onClick={onClick} // Trigger the onClick handler when the button is clicked
      onMouseEnter={() => setIsHovered(true)} // Set the hovered state to true on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set the hovered state to false on mouse leave
    >
      {/* SVG icon that will appear inside the button */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        style={svgStyle} // Apply dynamic size to the SVG based on hover state
        viewBox="0 0 24 24" // ViewBox for the SVG icon
      >
        {/* Path for the SVG icon, a plus sign */}
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 20v-8m0 0V4m0 8h8m-8 0H4"/>
      </svg>
    </button>
  );
}

export default HoverButton; // Export the HoverButton component for use in other parts of the app
