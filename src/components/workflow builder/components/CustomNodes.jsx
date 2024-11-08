// CustomNode.js
import { Handle } from '@xyflow/react'; // Import Handle component from React Flow
import React, { useState } from 'react'; // React library
import { Box } from '@mui/material'; // Material UI Box component for layout and styling
import { Iconify } from 'src/components/iconify'; // Custom Iconify component for icons

// CustomNode component to render a node with icon, label, and handles
const CustomNode = ({ data, isHorizontal }) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  // Function to determine the rotation style for the image based on node label and orientation
  const getImageRotationStyle = () =>
    data.label === 'Router (Pabbly)' && isHorizontal ? 'rotate(270deg)' : 'none';

  return (
    <div
      style={{
        position: 'relative', // Position relative for the node container
        display: 'flex',
        flexDirection: isHorizontal ? 'column' : 'row', // Flex layout based on horizontal/vertical
        alignItems: 'center', // Center content
        cursor: 'pointer', // Change cursor to pointer for clickable node
      }}
      onMouseEnter={() => setIsHovered(true)} // Set hover state when mouse enters
      onMouseLeave={() => setIsHovered(false)} // Reset hover state when mouse leaves
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center', // Center the child content
          position: 'relative', // Position relative for child absolute elements
        }}
      >
        <div
          style={{
            width: 100, // Set width of the image container
            height: 100, // Set height of the image container
            display: 'flex',
            justifyContent: 'center', // Center image inside container
            alignItems: 'center', // Align image vertically
          }}
        >
          <Box
            sx={{
              transition: 'filter 0.1s ease, transform 0.1s ease', // Transition effect for hover
              filter: isHovered
                ? `drop-shadow(0px 0px 10px ${data.color})` // Apply hover shadow with color
                : 'drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))', // Regular shadow when not hovered
            }}
          >
            <img
              src={data.icon} // Use icon from data
              alt={data.label} // Set alt text for accessibility
              style={{
                width: '100%', // Set image width to 100% of container
                height: '100%', // Set image height to 100% of container
                transform: getImageRotationStyle(), // Apply rotation if needed
              }}
            />
          </Box>

          {/* Error Icon in the top right corner */}
          <Iconify
            id="errorInNode"
            width={24}
            backgroundColor="red"
            onClick={() => alert('This will show the errors.')} // Show errors on click
            sx={{
              position: 'absolute', // Position icon absolutely within parent container
              top: 0,
              right: 0,
              color: 'white',
              border: '2px solid #F3F7FA',
              borderRadius: '50%', // Make the icon circular
            }}
            icon={data.errorIcon} // Use error icon from data
          />

          {/* Trigger Icon in the bottom left corner */}
          <Iconify
            id="trigger icon"
            width={24}
            backgroundColor={data.color} // Set background color from data
            sx={{
              position: 'absolute', // Position icon absolutely within parent container
              bottom: 0,
              left: 0,
              color: 'white',
              border: '2px solid #F3F7FA',
              borderRadius: '50%', // Make the icon circular
            }}
            icon={data.triggerIcon} // Use trigger icon from data
          />
        </div>

        {/* Source Handle */}
        <Handle
          type="source" // Type of handle (source, used to output connections)
          position={isHorizontal ? 'right' : 'bottom'} // Position handle based on orientation
          style={{
            background: `transparent`, // Transparent background for the handle
            top: isHorizontal ? '50%' : '90%', // Adjust position based on orientation
            left: isHorizontal ? '90%' : '50%',
            transform: isHorizontal ? 'translateY(-50%)' : 'translateX(-50%)', // Center the handle
            border: 'none', // Remove border
          }}
        />

        {/* Target Handle */}
        <Handle
          type="target" // Type of handle (target, used to receive connections)
          position={isHorizontal ? 'left' : 'top'} // Position handle based on orientation
          style={{
            width: 10, // Small size for target handle
            height: 10, // Small size for target handle
            background: `transparent`, // Transparent background for the handle
            top: isHorizontal ? '50%' : 0, // Adjust position based on orientation
            left: isHorizontal ? 0 : '50%',
            transform: isHorizontal ? 'translateY(-50%)' : 'translateX(-50%)', // Center the handle
            border: 'none', // Remove border
          }}
        />
      </div>

      {/* Wrapper for Label and Subtext */}
      <div
        style={{
          position: 'relative', // Position relative for positioning of label
          display: 'flex',
          justifyContent: isHorizontal ? 'center' : 'start', // Align label based on orientation
          marginLeft: isHorizontal ? 0 : 10, // Adjust left margin based on orientation
          bottom: isHorizontal ? 0 : 28, // Adjust bottom position for label
        }}
      >
        <div
          style={{
            position: 'absolute', // Position label absolutely
            padding: '5px',
            textWrap: 'nowrap', // Prevent text from wrapping
            textAlign: isHorizontal ? 'center' : 'left', // Align text based on orientation
          }}
        >
          {/* Label Text */}
          <div
            style={{
              display: 'flex',
              justifyContent: isHorizontal ? 'center' : 'start',
              alignItems: 'center',
              gap: 5,
              fontWeight: 'bold', // Bold font for the label
              fontFamily: 'Public Sans', // Font family
              fontSize: 16, // Font size for label
              color: '#1C252E', // Label color
            }}
          >
            {data.label}
            
            {data.note && <Iconify icon="fluent:notepad-28-regular" />} {/* Conditionally render note icon */}
          </div>
          {/* Subtext for additional information */}
          <div
            style={{
              fontFamily: 'Public Sans', // Font family
              fontSize: 11, // Font size for subtext
              color: '#556370', // Subtext color
            }}
          >
            {data.subtext} {/* Display subtext */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
