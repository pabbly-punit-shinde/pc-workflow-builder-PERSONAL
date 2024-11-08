import React from 'react';

import { Box, Tooltip } from '@mui/material';

import ButtonsPanel from './ButtonsPanel';

const Drawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  onLayout,
  setEdgeType,
  toggleAnimation,
  toggleMinimap,
  fitView,
  isDashed,
  toggleDashStyle,
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'column', md: 'column' },
      justifyContent: 'space-between', // Spread items to place the button icon at the end
      gap: '10px',
      backgroundColor: '#FFFFFF',
      // padding: '5px',
      width: '27px',

      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(84, 95, 111, .16), 0 0 1px rgba(37, 45, 91, .04)',
      transition: 'width 0.3s ease',
    }}
  >
    {/* Conditionally render the ButtonsPanel component when the drawer is open */}
    {isDrawerOpen && (
      <Box style={{ flex: 1 }}>
        {' '}
        {/* Ensure the ButtonsPanel takes available space */}
        <ButtonsPanel
          onLayout={onLayout}
          setEdgeType={setEdgeType}
          fitView={fitView}
          toggleAnimation={toggleAnimation}
          toggleMinimap={toggleMinimap}
          isDashed={isDashed}
          toggleDashStyle={toggleDashStyle}
        />
      </Box>
    )}

    {/* Button to open or close the drawer, positioned at the end */}
    <Box>
      <button
        type="button"
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        style={{
          width: '27px',
          height: '27px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {isDrawerOpen ? (
          <Tooltip title="Click to close the drawer" arrow placement="top" disableInteractive>
            <Box
              component="img"
              src="/assets/images/reactflow/icons/close.svg"
              alt="Close Drawer"
              sx={{
                width: '27px',
                height: '27px',
                rotate: '180deg',
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Click to open the drawer" arrow placement="top" disableInteractive>
            <Box
              component="img"
              src="/assets/images/reactflow/icons/open.svg"
              alt="Open Drawer"
              sx={{
                width: '100%',
                height: '100%',
              }}
            />
          </Tooltip>
        )}
      </button>
    </Box>
  </Box>
);

export default Drawer;
