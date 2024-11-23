import React, { useState } from 'react';
import { useReactFlow } from '@xyflow/react';

import { Box, Tooltip, IconButton } from '@mui/material';

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
  // fitView,
  toggleMinimap,
  toggleEdgeStyleAndAnimate,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const { fitView } = useReactFlow();
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
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0 0 6px #C2CAD0',
      }}
      flexDirection={{ xs: 'column', sm: 'column', md: 'column' }}
      // bgcolor='#F4F4F4'
    >
      <Tooltip
        title="Vertical layout (Top to Bottom) Double click to auto align in vertical layout"
        arrow
        placement="top"
        disableInteractive
      >
        <IconButton
          type="button"
          style={buttonStyle}
          onClick={() => {
            onLayout({ direction: DIRECTION.DOWN }); // Change layout direction
            setTimeout(() => {
              fitView(); // Fit the view after layout change
            }, 0); // Delay to allow layout change to propagate
          }}
          
        >
          <img
            src="/assets/images/reactflow/icons/vertical.svg"
            style={iconStyle}
            alt="Vertical Layout"
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Horizontal layout (Left to Right) Double click to auto align in horizontal layout"
        arrow
        placement="top"
        disableInteractive
      >
        <IconButton
          type="button"
          style={buttonStyle}
          onClick={() => {
            onLayout({ direction: DIRECTION.RIGHT }); // Change layout direction
            setTimeout(() => {
              fitView(); // Fit the view after layout change
            }, 0); // Delay to allow layout change to propagate
          }}
        >
          <img
            src="/assets/images/reactflow/icons/horizontal.svg"
            style={iconStyle}
            alt="Horizontal Layout"
          />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          height: '1px',
          width: '60%',
          backgroundColor: 'rgba(84, 95, 111, .30)',
        }}
      />
      <Tooltip title="Straight Edges" arrow placement="top" disableInteractive>
        <IconButton type="button" style={buttonStyle} onClick={() => setEdgeType('straight')}>
          <img
            src="/assets/images/reactflow/icons/straight.svg"
            style={iconStyle}
            alt="Straight Edges"
          />
        </IconButton>
      </Tooltip>

      {/* Button to toggle Smoothsteps edge */}
      <Tooltip title="Smoothsteps Edges" arrow placement="top" disableInteractive>
        <IconButton
          type="button"
          style={{ ...buttonStyle }} // Slightly larger for this button
          onClick={() => setEdgeType('smoothstep')}
        >
          <img
            src="/assets/images/reactflow/icons/smoothsteps.svg"
            style={iconStyle}
            alt="Smoothsteps Edges"
          />
        </IconButton>
      </Tooltip>

      {/* Button to toggle Bezier edge */}
      <Tooltip title="Bezier Edges" arrow placement="top" disableInteractive>
        <IconButton type="button" style={buttonStyle} onClick={() => setEdgeType('bezier')}>
          <img
            src="/assets/images/reactflow/icons/bezier.svg"
            style={iconStyle}
            alt="Bezier Edges"
          />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          height: '1px',
          width: '60%',
          backgroundColor: 'rgba(84, 95, 111, .30)',
        }}
      />

      {/* Button to toggle edge animation with dynamic tooltip */}
      <Tooltip title={tooltip} arrow placement="top" disableInteractive>
        <IconButton type="button" onClick={handleEdgeStyleAndAnimate} style={buttonStyle}>
          <img src={icon} style={iconStyle} alt={tooltip} />
        </IconButton>
      </Tooltip>

      {/* Button to toggle minimap visibility */}
      <Tooltip title="Toggle Minimap" arrow placement="top" disableInteractive>
        <IconButton type="button" onClick={toggleMinimap} style={buttonStyle}>
          <img
            src="/assets/images/reactflow/icons/mini-map.svg" // Replace with your minimap icon
            style={iconStyle}
            alt="Toggle Minimap"
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ButtonsPanel;
