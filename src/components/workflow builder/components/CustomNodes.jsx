import React, { useState } from 'react';
import { Handle, useReactFlow } from '@xyflow/react';

import { Box, Tooltip } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import { initialEdges } from '../db/nodes-edges';
import LastNodeButton from './partials/LastNodeButton';

function hasNoLeadingEdges(nodeId) {
  return !initialEdges.some((edge) => edge.source === nodeId);
}

const CustomNode = ({ id, data, positionAbsoluteX, positionAbsoluteY, isHorizontal }) => {
  const { addNodes, addEdges } = useReactFlow(); // Get functions to add nodes and edges
  const [isHovered, setIsHovered] = useState(false);
  const showHoverButton = hasNoLeadingEdges(id);

  // Function to add a child node below the current node
  const handleAddChildNode = () => {
    const newNodeId = `${id}__${Date.now()}`;
    const childNodePosition = {
      x: (isHorizontal ? positionAbsoluteX + 150 : positionAbsoluteX) + Math.random() * 0.01,
      y: (isHorizontal ? positionAbsoluteY : positionAbsoluteY + 150) + Math.random() * 0.01,
    };

    // Create new child node
    addNodes({
      id: newNodeId,
      position: childNodePosition,
      type: 'custom',
      data: {
        // nodeType: 'external-app',
        color: '#93AABD', // v1
        // color: '#798D9E', // v2
        // color: '#637381', // v3
        // color: '#637381', // v4
        // color: '#637381', // v5
        label: 'Empty Step',
        subtext: 'Add New Action Step',
        icon: '/assets/images/reactflow/newNodeV1.svg',
        // icon: '/assets/images/reactflow/newNodeV2.svg',
        // icon: '/assets/images/reactflow/newNodeV3.svg',
        // icon: '/assets/images/reactflow/newNodeV4.svg',
        // icon: '/assets/images/reactflow/newNodeV5.svg',
        note: false,
      },
    });

    // Create edge from current node to child node
    addEdges({ id: `${id}->${newNodeId}`, source: id, target: newNodeId });
  };

  const getImageRotationStyle = () =>
    data.label === 'Router (Pabbly)' && isHorizontal ? 'rotate(270deg)' : 'none';

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
            width: 100,
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100px',
              height: '100px',
              borderRadius: '40px',
              bgcolor: `${data.color}`,
              transition: 'filter 0.1s ease, transform 0.1s ease',
              filter: isHovered
                ? `drop-shadow(0px 0px 8px ${data.color})`
                : 'drop-shadow(0px 5px 6px rgba(0, 0, 0, 0.25))',
            }}
          >
            <img
              src={data.icon}
              alt={data.label}
              style={{
                width: '55px',
                height: '60px',
                transform: getImageRotationStyle(),
              }}
            />
            {showHoverButton && (
              <LastNodeButton
                isHorizontal={isHorizontal}
                color={data.color}
                onClick={handleAddChildNode} // Attach add child node handler
              />
            )}
          </Box>

          {/* Error Icon */}
          <Tooltip title="Error occurred in this step." arrow placement="top" disableInteractive>
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
              icon={data.errorIcon}
            />
          </Tooltip>
          {/* Trigger Icon */}
          <Tooltip title="Instant Trigger." arrow placement="top" disableInteractive>
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
            />
          </Tooltip>
        </div>

        <Handle
          isConnectable={false}
          type="source"
          position={isHorizontal ? 'right' : 'bottom'}
          style={{
            background: `transparent`,
            top: isHorizontal ? '50%' : '93%',
            left: isHorizontal ? '93%' : '50%',
            transform: isHorizontal ? 'translateY(-50%)' : 'translateX(-50%)',
            border: 'none',
          }}
        />

        <Handle
          isConnectable={false}
          type="target"
          position={isHorizontal ? 'left' : 'top'}
          style={{
            background: `transparent`,
            top: isHorizontal ? '50%' : 0,
            left: isHorizontal ? 0 : '50%',
            transform: isHorizontal ? 'translateY(-50%)' : 'translateX(-50%)',
            border: 'none',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: isHorizontal ? 'center' : 'start',
          marginLeft: isHorizontal ? 0 : 10,
          bottom: isHorizontal ? 0 : 28,
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
              display: 'flex',
              justifyContent: isHorizontal ? 'center' : 'start',
              alignItems: 'center',
              gap: 5,
              fontWeight: 'bold',
              fontFamily: 'Public Sans',
              fontSize: 16,
              color: '#1C252E',
            }}
          >
            {data.label}
            {data.note && (
              <Tooltip
                title="You can view the step note that you have added to this step."
                arrow
                placement="top"
                disableInteractive
              >
                <Iconify icon="fluent:notepad-28-regular" />
              </Tooltip>
            )}
          </div>
          <div
            style={{
              fontFamily: 'Public Sans',
              fontSize: 11,
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
