import React from 'react';

import DownloadButton from './DownloadButton';

const DIRECTION = {
  DOWN: 'TB',
  RIGHT: 'LR',
};

const buttonStyle = {
  width: '30px',  // Adjusted width
  height: '30px', // Adjusted height
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
};

const iconStyle = {
  width: '100%',
  height: '100%',
};

const ButtonsPanel = ({ onLayout, setEdgeType, fitView }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
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
    <div style={{ height: '1px', backgroundColor: '#D3D3D3', margin: '5px 0' }} />
    <button type="button" style={buttonStyle} onClick={() => setEdgeType('straight')}>
      <img
        src="/assets/images/reactflow/icons/straight.svg"
        style={iconStyle}
        alt="Straight Edges"
      />
    </button>
    <button type="button" style={buttonStyle} onClick={() => setEdgeType('step')}>
      <img src="/assets/images/reactflow/icons/steps.svg" style={iconStyle} alt="Steps Edges" />
    </button>
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
    <button type="button" style={buttonStyle} onClick={() => setEdgeType('bezier')}>
      <img src="/assets/images/reactflow/icons/bezier.svg" style={iconStyle} alt="Bezier Edges" />
    </button>

    <div style={{ height: '1px', backgroundColor: '#D3D3D3', margin: '5px 0' }} />

    <DownloadButton />
  </div>
);

export default ButtonsPanel;
