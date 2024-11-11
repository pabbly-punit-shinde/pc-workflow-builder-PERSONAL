import { useReactFlow } from '@xyflow/react';
import React, { useState, useEffect, useCallback } from 'react';

import { Paper, Divider, MenuList, MenuItem, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function ContextMenu({ id, top, left, onClose }) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();
  const [nodeType, setNodeType] = useState(null);
  const [label, setLabel] = useState(null);
  const [adjustedPosition, setAdjustedPosition] = useState({ top, left });

  useEffect(() => {
    const node = getNode(id);
    if (node && node.data) {
      setNodeType(node.data.nodeType);
      setLabel(node.data.label || node.data.nodeType);
    }

    // Adjust position if the context menu goes beyond viewport bounds
    const adjustPosition = () => {
      const menuHeight = 450; // approximate menu height
      const menuWidth = 180; // approximate menu width
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let adjustedTop = top;
      let adjustedLeft = left;

      if (top + menuHeight > viewportHeight) {
        adjustedTop = viewportHeight - menuHeight - 10; // 10px padding from edge
      }
      if (left + menuWidth > viewportWidth) {
        adjustedLeft = viewportWidth - menuWidth - 50;
      }

      setAdjustedPosition({ top: adjustedTop, left: adjustedLeft });
    };

    adjustPosition();
    window.addEventListener('resize', adjustPosition); // Handle window resize
    return () => window.removeEventListener('resize', adjustPosition);
  }, [getNode, id, top, left]);

  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = { x: node.position.x + 50, y: node.position.y + 50 };
    const newNode = {
      ...node,
      id: `${node.id}-copy`,
      position,
      data: {
        ...node.data,
        label: node.data.label || node.data.nodeType,
      },
    };
    addNodes(newNode);
    onClose();
  }, [addNodes, getNode, id, onClose]);

  const removeNode = useCallback(() => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    onClose();
  }, [id, setEdges, setNodes, onClose]);

  return (
    <Paper
      elevation={3}
      style={{
        position: 'absolute',
        top: adjustedPosition.top,
        left: adjustedPosition.left,
        zIndex: 10,
        padding: '10px',
        minWidth: '180px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <MenuList>
        <Typography variant="caption" style={{ padding: '0.5em 1em', color: '#888' }}>
          Node: {id} - {label}
        </Typography>
        {/* Menu items based on node type */}
        {nodeType === 'external-app'
          ? [
              <MenuItem key="add-node">
                <Iconify icon="basil:add-outline" style={{ marginRight: '10px' }} />
                Add Node
              </MenuItem>,
              <MenuItem>
                <Iconify icon="fluent:rename-16-regular" style={{ marginRight: '10px' }} />
                Rename Step
              </MenuItem>,
              <Divider style={{ borderStyle: 'dashed' }} />,
              <MenuItem onClick={duplicateNode}>
                <Iconify icon="fa6-solid:clone" style={{ marginRight: '10px' }} />
                Clone Step
              </MenuItem>,
              <MenuItem>
                <Iconify icon="tabler:copy" style={{ marginRight: '10px' }} />
                Copy Step
              </MenuItem>,
              <MenuItem>
                <Iconify icon="ic:baseline-content-paste" style={{ marginRight: '10px' }} />
                Paste Step
              </MenuItem>,
              <MenuItem>
                <Iconify icon="gg:notes" style={{ marginRight: '10px' }} />
                Add Step Note
              </MenuItem>,
              <MenuItem>
                <Iconify icon="mdi:clock-outline" style={{ marginRight: '10px' }} />
                Set Trigger Time
              </MenuItem>,
              <MenuItem>
                <Iconify icon="ic:outline-info" style={{ marginRight: '10px' }} />
                Ignore Error (Enable)
              </MenuItem>,
            ]
          : nodeType === 'internal-app'
            ? [
                <MenuItem key="add-route">
                  <Iconify icon="basil:add-outline" style={{ marginRight: '10px' }} />
                  Add Route
                </MenuItem>,
                <MenuItem>
                <Iconify icon="gg:notes" style={{ marginRight: '10px' }} />
                Add Step Note
              </MenuItem>,
                <MenuItem>
                  <Iconify icon="fluent:rename-16-regular" style={{ marginRight: '10px' }} />
                  Rename Step
                </MenuItem>,
                <MenuItem onClick={duplicateNode}>
                  <Iconify icon="fa6-solid:clone" style={{ marginRight: '10px' }} />
                  Clone Route
                </MenuItem>,
              ]
            : [
                <Typography
                  key="no-actions"
                  variant="body2"
                  style={{ padding: '1em', color: '#888' }}
                >
                  No actions available for this node type
                </Typography>,
              ]}
        <Divider style={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={removeNode}>
          <Iconify
            icon="solar:trash-bin-trash-bold"
            style={{ marginRight: '10px', color: 'red' }}
          />
          Delete
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
