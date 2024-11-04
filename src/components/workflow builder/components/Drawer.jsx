import React from 'react';

import { Tooltip } from '@mui/material';

import ButtonsPanel from './ButtonsPanel';

const Drawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  onLayout,
  setEdgeType,
  toggleAnimation,
  fitView,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      backgroundColor: '#FFFFFF',
      padding: '5px',
      width: '38px', // Set this to 38px
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(84, 95, 111, .16), 0 0 1px rgba(37, 45, 91, .04)',
    }}
  >
    <button
      type="button"
      onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      style={{
        width: '30px', // Adjusted width
        height: '30px', // Adjusted height
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
            style={{ width: '100%', height: '100%' }}
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

    {isDrawerOpen && (
      <>
        <ButtonsPanel
          onLayout={onLayout}
          setEdgeType={setEdgeType}
          fitView={fitView} // Pass fitView here
        />

        {/* Button to toggle edge animation */}
        <Tooltip title="Toggle edges animation" arrow placement="top" disableInteractive>
          <button
            type="button"
            onClick={toggleAnimation}
            style={{
              width: '30px', // Adjusted width
              height: '30px', // Adjusted height
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <img
              src="/assets/images/reactflow/icons/animate.svg" // Replace with your animation icon
              style={{ width: '100%', height: '100%' }}
              alt="Toggle Animation"
            />
          </button>
        </Tooltip>
      </>
    )}
  </div>
);

export default Drawer;
