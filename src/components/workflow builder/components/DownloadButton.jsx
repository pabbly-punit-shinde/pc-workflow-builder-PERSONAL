import { toPng } from 'html-to-image';
import React, { useEffect } from 'react';
import { useReactFlow, getNodesBounds, getViewportForBounds } from '@xyflow/react';

import { Tooltip } from '@mui/material';

function downloadImage(dataUrl) {
  const a = document.createElement('a');
  a.setAttribute('download', 'Pabbly-Connect-Workflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

function DownloadButton() {
  const { getNodes } = useReactFlow();

  // Function to check if the font is loaded
  const fontIsLoaded = () => {
    document.fonts
      .load('1em "Public Sans"')
      .then(() => {
        console.log('Font loaded');
      })
      .catch(() => {
        console.log('Font loading failed');
      });
  };

  useEffect(() => {
    fontIsLoaded();
  }, []);

  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      window.innerWidth,
      window.innerHeight,
      0.5,
      2
    );

    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#F3F7FA',
      width: window.innerWidth,
      height: window.innerHeight,
      style: {
        width: window.innerWidth,
        height: window.innerHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        fontFamily: 'Public Sans, sans-serif', // Ensure font family here
      },
    }).then(downloadImage);
  };

  return (
    <Tooltip title="Take Snapshot" arrow placement="top" disableInteractive>
      <button
        type="button"
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        className="download-btn"
        onClick={onClick}
      >
        <img
          src="/assets/images/reactflow/icons/image-download.svg"
          style={{ width: '30px' }}
          alt="Download Snap"
        />
      </button>
    </Tooltip>
  );
}

export default DownloadButton;
