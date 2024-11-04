// CustomNode.js
import { Handle } from '@xyflow/react';
import React, { useState } from 'react';

import { Iconify } from 'src/components/iconify';

import HoverButton from '../partials/HoverButton'; // Import the HoverButton component
// import { position } from 'stylis';
// import { borderRadius } from '@mui/system';

const CustomNode = ({ data, isHorizontal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: isHorizontal ? 'column' : 'row',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 85,
            height: 85,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <img
            src={data.icon}
            alt={data.label}
            style={{
              width: '100%',
              height: '100%',
              transition: 'filter 0.3s ease',
              filter: isHovered
                ? `drop-shadow(0px 0px 8px ${data.color})`
                : 'drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))',
            }}
          />
          <Iconify
            id="errorInNode"
            width={24}
            backgroundColor="red"
            onClick={() => alert('This will show the errors.')}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: 'white',
              border: '2px solid #F3F7FA',
              borderRadius: '50%',
            }}
            // icon={"bi:exclamation"}
            icon={data.errorIcon}
          />
          <Iconify
            id="trigger icon"
            width={24}
            backgroundColor={data.color}
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              color: 'white',
              border: '2px solid #F3F7FA',
              borderRadius: '50%',
            }}
            icon={data.triggerIcon}

            // icon="ic:baseline-bolt"
          />
          {/* Use HoverButton component, visible only on hover */}

          {isHovered && (
            <HoverButton
              isHorizontal={isHorizontal}
              color={data.color}
              onClick={() => alert('New node will be added when clicked.')}
            />
          )}
        </div>

        {/* Source Handle */}
        <Handle
          type="source"
          position={isHorizontal ? 'right' : 'bottom'}
          style={{
            background: 'transparent',
            top: isHorizontal ? '50%' : '90%',
            left: isHorizontal ? '90%' : '50%',
            transform: isHorizontal ? 'translateY(-50%)' : 'translateX(-50%)',
            border: 'none',
          }}
        />

        {/* Target Handle */}
        <Handle
          type="target"
          position={isHorizontal ? 'left' : 'top'}
          style={{
            background: 'transparent',
            top: isHorizontal ? '50%' : 0,
            left: isHorizontal ? 0 : '50%',
            transform: isHorizontal ? 'translateY(-50%)' : 'translateX(-50%)',
            border: 'none',
          }}
        />
      </div>

      {/* Wrapper for Label and Subtext with relative positioning */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: isHorizontal ? 'center' : 'flex-start',
          marginLeft: isHorizontal ? 0 : 10,
          bottom: isHorizontal ? 0 : 22,
        }}
      >
        <div
          style={{
            position: 'absolute',
            padding: '5px',
            textWrap: 'nowrap',
            textAlign: isHorizontal ? 'center' : 'left',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              fontFamily: 'Public Sans',
              fontSize: 16,
              color: '#1C252E',
            }}
          >
            {data.label}
          </div>
          <div
            style={{
              fontFamily: 'Public Sans',
              fontSize: 11, //  changed from 10 to 11
              color: '#556370',
            }}
          >
            {data.subtext}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
