import React from 'react';

import { Box, Tooltip } from '@mui/material';

// import { Iconify } from 'src/components/iconify';

import DownloadButton from './DownloadButton';

const DIRECTION = {
  DOWN: 'TB',
  RIGHT: 'LR',
};

const buttonStyle = {
  width: '30px', // Adjusted width
  height: '30px', // Adjusted height
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const iconStyle = {
  width: '100%',
  height: '100%',
};

const ButtonsPanel = ({
  onLayout,
  setEdgeType,
  fitView,
  toggleAnimation,
  toggleMinimap,
  isDashed,
  toggleDashStyle,
}) => {
  console.log('isDashed:', isDashed); // Check if `isDashed` is correctly updating

  return (
    <Box sx={{ display: 'flex', gap: 1 }} flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}>
      <Tooltip
        title="Vertical layout (Top to Bottom) Double click to auto align in vertical layout"
        arrow
        placement="top"
        disableInteractive
      >
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            onLayout({ direction: DIRECTION.DOWN });
            fitView(); // Trigger fitView after layout change
          }}
        >
          <img
            src="/assets/images/reactflow/icons/vertical.svg"
            style={iconStyle}
            alt="Vertical Layout"
          />
        </button>
      </Tooltip>
      <Tooltip
        title="Horizontal layout (Left to Right) Double click to auto align in horizontal layout"
        arrow
        placement="top"
        disableInteractive
      >
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            onLayout({ direction: DIRECTION.RIGHT });
            fitView(); // Trigger fitView after layout change
          }}
        >
          <img
            src="/assets/images/reactflow/icons/horizontal.svg"
            style={iconStyle}
            alt="Horizontal Layout"
          />
        </button>
      </Tooltip>

      <Box
        sx={{
          width: {
            xs: '30px',
            md: '1px',
          },
          height: {
            xs: '1px',
            md: '20px',
          },
          backgroundColor: '#D3D3D3',
          margin: '5px 0',
        }}
      />

      <Tooltip title="Straight Edges" arrow placement="top" disableInteractive>
        <button type="button" style={buttonStyle} onClick={() => setEdgeType('straight')}>
          <img
            src="/assets/images/reactflow/icons/straight.svg"
            style={iconStyle}
            alt="Straight Edges"
          />
        </button>
      </Tooltip>

            {/* Button to toggle Smoothsteps edge */}
      <Tooltip title="Steps Edges" arrow placement="top" disableInteractive>
        <button type="button" style={buttonStyle} onClick={() => setEdgeType('step')}>
          <img src="/assets/images/reactflow/icons/steps.svg" style={iconStyle} alt="Steps Edges" />
        </button>
      </Tooltip>

      {/* Button to toggle Smoothsteps edge */}
      <Tooltip title="Smoothsteps Edges" arrow placement="top" disableInteractive>
        <button
          type="button"
          style={{ ...buttonStyle }} // Slightly larger for this button
          onClick={() => setEdgeType('smoothstep')}
        >
          <img
            src="/assets/images/reactflow/icons/smoothsteps.svg"
            style={iconStyle}
            alt="Smoothsteps Edges"
          />
        </button>
      </Tooltip>

      {/* Button to toggle Bezier edge */}
      <Tooltip title="Bezier Edges" arrow placement="top" disableInteractive>
        <button type="button" style={buttonStyle} onClick={() => setEdgeType('simplebezier')}>
          <img
            src="/assets/images/reactflow/icons/bezier.svg"
            style={iconStyle}
            alt="Bezier Edges"
          />
        </button>
      </Tooltip>

      <Box
        sx={{
          width: {
            xs: '30px',

            md: '1px',
          },
          height: {
            xs: '1px',

            md: '20px',
          },
          backgroundColor: '#D3D3D3',
          margin: '5px 0',
        }}
      />

      {/* Button to toggle edge animation */}
      <Tooltip
        title="Toggle edges animation (Edges should be dashed)"
        arrow
        placement="top"
        disableInteractive
      >
        <button type="button" onClick={toggleAnimation} style={buttonStyle}>
          <img
            src="/assets/images/reactflow/icons/animate.svg" // Replace with your animation icon
            style={iconStyle}
            alt="Toggle Animation"
          />
        </button>
      </Tooltip>

      {/* Button to toggle minimap visibility */}
      <Tooltip title="Toggle Minimap" arrow placement="top" disableInteractive>
        <button type="button" onClick={toggleMinimap} style={buttonStyle}>
          <img
            src="/assets/images/reactflow/icons/mini-map.svg" // Replace with your minimap icon
            style={iconStyle}
            alt="Toggle Minimap"
          />
        </button>
      </Tooltip>

      {/* Button to toggle edge Solid or Dashed */}
      <button type="button" onClick={toggleDashStyle} style={buttonStyle}>
        {isDashed ? (
          <Tooltip title="Toggle Solid Edges" arrow placement="top" disableInteractive>
            <img
              src="/assets/images/reactflow/icons/solid.svg"
              style={iconStyle}
              alt="Toggle Solid Edges"
            />
          </Tooltip>
        ) : (
          <Tooltip title="Toggle Dashed Edges" arrow placement="top" disableInteractive>
            <img
              src="/assets/images/reactflow/icons/dashed.svg"
              style={iconStyle}
              alt="Toggle Dashed Edges"
            />
          </Tooltip>
        )}
      </button>

      {/* Button to Download Snapshot */}
      <DownloadButton />
    </Box>
  );
};

export default ButtonsPanel;
