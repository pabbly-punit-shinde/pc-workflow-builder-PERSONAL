import React from 'react'; 

import { Tooltip } from '@mui/material';

import ButtonsPanel from './ButtonsPanel'; // Import ButtonsPanel component to be displayed inside the drawer

// Drawer component to control the open/close state and layout options
const Drawer = ({ 
  isDrawerOpen, // Determines if the drawer is open or closed
  setIsDrawerOpen, // Function to toggle the drawer open/close state
  onLayout, // Callback for layout changes
  setEdgeType, // Function to set edge type
  toggleAnimation, // Function to toggle animation
  toggleMinimap, // Function to toggle minimap visibility
  fitView, // Function to adjust the view to fit content
  isDashed, // State for dashed style (used to toggle dashed edges)
  toggleDashStyle, // Function to toggle the dashed style
}) => (
  <div
    style={{
      display: 'flex', // Use flexbox for layout
      flexDirection: 'row', // Set direction to row for horizontal layout
      gap: '10px', // Space between items
      backgroundColor: '#FFFFFF', // Background color of the drawer
      padding: '5px', // Padding inside the drawer
      width: isDrawerOpen ? 410 : '38px', // Drawer width when open (410px) and closed (38px)
      height: '100%', // Ensure drawer takes full height of the container
      borderRadius: '4px', // Round corners of the drawer
      boxShadow: '0 2px 4px rgba(84, 95, 111, .16), 0 0 1px rgba(37, 45, 91, .04)', // Drop shadow effect
      transition: 'width 0.3s ease', // Smooth transition for width when toggling open/closed
    }}
  >
    {/* Button to open or close the drawer */}
    <button
      type="button"
      onClick={() => setIsDrawerOpen(!isDrawerOpen)} // Toggle drawer open/close state
      style={{
        width: '30px', // Set button width
        height: '30px', // Set button height
        backgroundColor: 'transparent', // Transparent background
        border: 'none', // Remove border for cleaner look
        cursor: 'pointer', // Change cursor to pointer on hover
      }}
    >
      {/* Display different icons based on whether the drawer is open or closed */}
      {isDrawerOpen ? (
        <Tooltip title="Click to close the drawer" arrow placement="top" disableInteractive>
          <img
            src="/assets/images/reactflow/icons/close.svg" // Icon for closing the drawer
            alt="Close Drawer"
            style={{ width: '100%', height: '100%', rotate: "90deg" }} // Rotate icon when closing
          />
        </Tooltip>
      ) : (
        <Tooltip title="Click to open the drawer" arrow placement="top" disableInteractive>
          <img
            src="/assets/images/reactflow/icons/open.svg" // Icon for opening the drawer
            alt="Open Drawer"
            style={{ width: '100%', height: '100%' }} // Icon size to fill button
          />
        </Tooltip>
      )}
    </button>

    {/* Conditionally render the ButtonsPanel component when the drawer is open */}
    {isDrawerOpen && (
      <div style={{ flex: 1 }}> {/* Ensure the ButtonsPanel takes available space */}
        <ButtonsPanel
          onLayout={onLayout} // Pass layout function to ButtonsPanel
          setEdgeType={setEdgeType} // Pass edge type setting function to ButtonsPanel
          fitView={fitView} // Pass fit view function to ButtonsPanel
          toggleAnimation={toggleAnimation} // Pass animation toggle function to ButtonsPanel
          toggleMinimap={toggleMinimap} // Pass minimap toggle function to ButtonsPanel
          isDashed={isDashed} // Pass current dashed style state to ButtonsPanel
          toggleDashStyle={toggleDashStyle} // Pass function to toggle dashed edge style to ButtonsPanel
        />
      </div>
    )}
  </div>
);

export default Drawer; 
