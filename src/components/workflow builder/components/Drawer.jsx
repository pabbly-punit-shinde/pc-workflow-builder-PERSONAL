import React from 'react';

import { Tooltip } from '@mui/material';

import ButtonsPanel from './ButtonsPanel'; // Import ButtonsPanel component

const Drawer = ({ isDrawerOpen, setIsDrawerOpen, onLayout, setEdgeType, toggleAnimation, toggleMinimap, fitView, isDashed,
  toggleDashStyle, }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row', // Set the direction to row for horizontal layout
      gap: '10px',
      backgroundColor: '#FFFFFF',
      padding: '5px',
      width: isDrawerOpen ? 410 : '38px', // Drawer width when open and closed
      height: '100%', // Ensure it takes the full height
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(84, 95, 111, .16), 0 0 1px rgba(37, 45, 91, .04)',
      transition: 'width 0.3s ease', // Smooth transition
    }}
  >
    <button
      type="button"
      onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      style={{
        width: '30px', // Button width
        height: '30px', // Button height
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {isDrawerOpen ? (
        <Tooltip title="Click to close the drawer" arrow placement="top" disableInteractive>
          <img
            src="/assets/images/reactflow/icons/close.svg"
            alt="Close Drawer"
            style={{ width: '100%', height: '100%', rotate: "90deg" }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Click to open the drawer" arrow placement="top" disableInteractive>
          <img
            src="/assets/images/reactflow/icons/open.svg"
            alt="Open Drawer"
            style={{ width: '100%', height: '100%' }}
          />
        </Tooltip>
      )}
    </button>

    {/* Conditionally render ButtonsPanel when the drawer is open */}
    {isDrawerOpen && (
      <div style={{ flex: 1 }}>
        <ButtonsPanel
          onLayout={onLayout}
          setEdgeType={setEdgeType}
          fitView={fitView}
          toggleAnimation={toggleAnimation}
          toggleMinimap={toggleMinimap}
          isDashed={isDashed}           // Pass down isDashed state
          toggleDashStyle={toggleDashStyle} // Pass down toggleDashStyle function
        />
      </div>
    )}
  </div>
);

export default Drawer;
