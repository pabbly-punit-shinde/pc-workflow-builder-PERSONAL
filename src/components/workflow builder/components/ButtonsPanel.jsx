import React from 'react';

import { Tooltip } from '@mui/material';

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

const ButtonsPanel = ({ onLayout, setEdgeType, fitView, toggleAnimation, toggleMinimap }) => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
    <Tooltip title="Vertical layout (Top to Bottom) Double click to auto align in vertical layout" arrow placement="top" disableInteractive>
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
    <Tooltip title="Horizontal layout (Left to Right) Double click to auto align in horizontal layout" arrow placement="top" disableInteractive>
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

    <div style={{ width: '1px', backgroundColor: '#D3D3D3', margin: '5px 0' }} />
    
    <Tooltip title="Straight Edges" arrow placement="top" disableInteractive>
      <button type="button" style={buttonStyle} onClick={() => setEdgeType('straight')}>
        <img
          src="/assets/images/reactflow/icons/straight.svg"
          style={iconStyle}
          alt="Straight Edges"
        />
      </button>
    </Tooltip>
    <Tooltip title="Steps Edges" arrow placement="top" disableInteractive>
      <button type="button" style={buttonStyle} onClick={() => setEdgeType('step')}>
        <img src="/assets/images/reactflow/icons/steps.svg" style={iconStyle} alt="Steps Edges" />
      </button>
    </Tooltip>

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

    <Tooltip title="Bezier Edges" arrow placement="top" disableInteractive>
      <button type="button" style={buttonStyle} onClick={() => setEdgeType('bezier')}>
        <img src="/assets/images/reactflow/icons/bezier.svg" style={iconStyle} alt="Bezier Edges" />
      </button>
    </Tooltip>

    <div style={{ width: '1px', backgroundColor: '#D3D3D3', margin: '5px 0' }} />

    {/* Button to toggle edge animation */}
    <Tooltip title="Toggle edges animation" arrow placement="top" disableInteractive>
      <button
        type="button"
        onClick={toggleAnimation}
        style={buttonStyle}
      >
        <img
          src="/assets/images/reactflow/icons/animate.svg" // Replace with your animation icon
          style={iconStyle}
          alt="Toggle Animation"
        />
      </button>
    </Tooltip>

    {/* Button to toggle minimap visibility */}
    <Tooltip title="Toggle Minimap" arrow placement="top" disableInteractive>
      <button
        type="button"
        onClick={toggleMinimap}
        style={buttonStyle}
      >
        <img
          src="/assets/images/reactflow/icons/mini-map.svg" // Replace with your minimap icon
          style={iconStyle}
          alt="Toggle Minimap"
        />
      </button>
    </Tooltip>

    <DownloadButton />
  </div>
);

export default ButtonsPanel;
