// Drawer.jsx
import React from 'react';
// import { Icon } from "@iconify-icon/react";

import ButtonsPanel from './ButtonsPanel';

const Drawer = ({ isDrawerOpen, setIsDrawerOpen, onLayout, setEdgeType, toggleAnimation }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      backgroundColor: '#FFFFFF',
      padding: '10px',
      borderRadius: '10px',
      width: '60px',
      boxShadow: '0px 5px 6px rgb(0 0 0 / 0.25)',
    }}
  >
    <button
      type="button"
      onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {isDrawerOpen ? (
        <img
          src="/assets/images/reactflow/icons/close.svg"
          alt="Close Drawer"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <img
          src="/assets/images/reactflow/icons/open.svg"
          alt="Open Drawer"
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </button>

    {isDrawerOpen && (
      <>
        <ButtonsPanel onLayout={onLayout} setEdgeType={setEdgeType} />

        {/* Button to toggle edge animation */}
        <button
          type="button"
          onClick={toggleAnimation}
          style={{
            width: '40px',
            height: '40px',
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
      </>
    )}
  </div>
);

export default Drawer;
