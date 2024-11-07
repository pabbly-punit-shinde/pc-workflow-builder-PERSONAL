import { toPng } from 'html-to-image'; // Import toPng function to generate an image from HTML element
import React, { useEffect } from 'react'; // React library
import { useReactFlow, getNodesBounds, getViewportForBounds } from '@xyflow/react'; // ReactFlow hooks for flow management
import { Tooltip } from '@mui/material'; // Tooltip component from Material UI

// Function to trigger the download of the image
function downloadImage(dataUrl) {
  const a = document.createElement('a'); // Create an anchor element
  a.setAttribute('download', 'Pabbly-Connect-Workflow.png'); // Set the file name for the download
  a.setAttribute('href', dataUrl); // Set the data URL as the href for downloading
  a.click(); // Programmatically click the anchor to initiate download
}

// DownloadButton component to allow downloading the flow as an image
function DownloadButton() {
  const { getNodes } = useReactFlow(); // ReactFlow hook to access nodes

  // Function to check if the font is loaded
  const fontIsLoaded = () => {
    document.fonts
      .load('1em "Public Sans"') // Attempt to load the "Public Sans" font
      .then(() => {
        console.log('Font loaded'); // Log if font loads successfully
      })
      .catch(() => {
        console.log('Font loading failed'); // Log if font loading fails
      });
  };

  useEffect(() => {
    fontIsLoaded(); // Call fontIsLoaded on component mount
  }, []);

  // Function to capture the flow area as an image and trigger the download
  const onClick = () => {
    const nodesBounds = getNodesBounds(getNodes()); // Get the bounds of all nodes in the flow
    const viewport = getViewportForBounds(
      nodesBounds, // Get the viewport based on the node bounds
      window.innerWidth, // Set the viewport width
      window.innerHeight, // Set the viewport height
      0.5, // Padding factor for the viewport
      2 // Scale factor for the viewport
    );

    // Generate PNG from the viewport area
    toPng(document.querySelector('.react-flow__viewport'), {
      backgroundColor: '#F3F7FA', // Set background color for the image
      width: window.innerWidth, // Set image width
      height: window.innerHeight, // Set image height
      style: {
        width: window.innerWidth, // Set the width of the captured area
        height: window.innerHeight, // Set the height of the captured area
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`, // Apply zoom and translation
        fontFamily: 'Public Sans, sans-serif', // Apply font family to the captured image
      },
    }).then(downloadImage); // Once image is generated, trigger the download
  };

  return (
    // Tooltip that displays when hovering over the download button
    <Tooltip title="Take Snapshot" arrow placement="top" disableInteractive>
      <button
        type="button"
        style={{
          width: '30px', // Button width
          height: '30px', // Button height
          backgroundColor: 'transparent', // Transparent background for the button
          border: 'none', // No border for cleaner design
          cursor: 'pointer', // Change cursor to pointer on hover
        }}
        className="download-btn" // Class name for styling
        onClick={onClick} // Attach the onClick handler to download the image
      >
        <img
          src="/assets/images/reactflow/icons/image-download.svg" // Icon for download button
          style={{ width: '30px' }} // Set the width of the icon
          alt="Download Snap" // Alt text for accessibility
        />
      </button>
    </Tooltip>
  );
}

export default DownloadButton;
