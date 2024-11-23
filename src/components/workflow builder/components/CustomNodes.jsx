import React, { useState, useEffect, useCallback } from 'react';
import { Handle, useStoreApi, useReactFlow } from '@xyflow/react';

import { Box, Tooltip } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import LastNodeButton from './partials/LastNodeButton';

const CustomNode = ({ id, data, positionAbsoluteX, positionAbsoluteY, isHorizontal }) => {
  const { getEdges, addNodes, addEdges } = useReactFlow();
  const [isHovered, setIsHovered] = useState(false);
  const [hasNoOutgoingEdges, setHasNoOutgoingEdges] = useState(false);
  const store = useStoreApi();

  // Stable callback to check outgoing edges
  const updateOutgoingEdgesStatus = useCallback(() => {
    const edges = getEdges();
    const noOutgoing = !edges.some((edge) => edge.source === id); // Check if this node has outgoing edges
    setHasNoOutgoingEdges(noOutgoing);
  }, [getEdges, id]);

  // Update `hasNoOutgoingEdges` whenever edges change
  useEffect(() => {
    const unsubscribe = store.subscribe(
      () => {
        updateOutgoingEdgesStatus();
      },
      (state) => state.edges // Subscribe to edge updates
    );

    updateOutgoingEdgesStatus(); // Initial check
    return () => unsubscribe(); // Clean up subscription on unmount
  }, [store, updateOutgoingEdgesStatus]);

  // Function to add a child node below the current node
  const handleAddChildNode = () => {
    const newNodeId = `${id}__${Date.now()}`;
    const childNodePosition = {
      x: (isHorizontal ? positionAbsoluteX + 200 : positionAbsoluteX) + Math.random() * 0.01,
      y: (isHorizontal ? positionAbsoluteY : positionAbsoluteY + 150) + Math.random() * 0.01,
    };

    // Create new child node
    addNodes({
      id: newNodeId,
      position: childNodePosition,
      type: 'custom',
      data: {
        color: '#93AABD',
        label: 'Add Action',
        subtext: 'Choose Your Next Application',
        icon: '/assets/images/reactflow/newNodeV1.svg',
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
            {hasNoOutgoingEdges && (
              <LastNodeButton
                isHorizontal={isHorizontal}
                color={data.color}
                onClick={handleAddChildNode} // Attach add child node handler
              />
            )}
          </Box>
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
