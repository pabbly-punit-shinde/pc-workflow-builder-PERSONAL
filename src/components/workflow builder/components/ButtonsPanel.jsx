import React, { useState } from 'react';
import { Box, Tooltip } from '@mui/material';

const DIRECTION = {
  DOWN: 'TB',
  RIGHT: 'LR',
};

const buttonStyle = {
  width: '27px', // Adjusted width
  height: '27px', // Adjusted height
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
  toggleMinimap,
  toggleEdgeStyleAndAnimate,
}) => {
  const [clickCount, setClickCount] = useState(0);

  // Function to determine the icon and tooltip based on the click count
  const getButtonIconAndTooltip = () => {
    const cycle = clickCount % 3; // We will cycle through 3 states (Solid, Dashed, Animated)
    if (cycle === 1) {
      return {
        icon: '/assets/images/reactflow/icons/animate.svg', // Animate icon
        tooltip: 'Animate Edges', // Tooltip for Animate
      };
    }
    if (cycle === 2) {
      return {
        icon: '/assets/images/reactflow/icons/solid.svg', // Solid icon
        tooltip: 'Solid Edges', // Tooltip for Solid
      };
    }
    return {
      icon: '/assets/images/reactflow/icons/dashed.svg', // Dashed icon
      tooltip: 'Dashed Edges', // Tooltip for Dashed
    };
  };

  // Get icon and tooltip dynamically based on the current state
  const { icon, tooltip } = getButtonIconAndTooltip();

  const handleEdgeStyleAndAnimate = () => {
    setClickCount((prevCount) => prevCount + 1);
    toggleEdgeStyleAndAnimate();
  };

  return (
    <Box
      sx={{ display: 'flex', gap: 1 }}
      flexDirection={{ xs: 'column', sm: 'column', md: 'column' }}
    >
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
          height: '1px',
          backgroundColor: '#D3D3D3',
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
          height: '1px',
          backgroundColor: '#D3D3D3',
        }}
      />

      {/* Button to toggle edge animation with dynamic tooltip */}
      <Tooltip title={tooltip} arrow placement="top" disableInteractive>
        <button type="button" onClick={handleEdgeStyleAndAnimate} style={buttonStyle}>
          <img src={icon} style={iconStyle} alt={tooltip} />
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
    </Box>
  );
};

export default ButtonsPanel;
