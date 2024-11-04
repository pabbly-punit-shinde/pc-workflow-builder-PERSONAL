import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

import { Paper, Divider, MenuList, MenuItem, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify'; // Assuming Iconify is used for icons

export default function ContextMenu({ id, top, left, onClose }) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = { x: node.position.x + 50, y: node.position.y + 50 };
    addNodes({
      ...node,
      selected: false,
      dragging: false,
      id: `${node.id}-copy`,
      position,
    });
    onClose();
  }, [id, getNode, addNodes, onClose]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    onClose();
    alert(`Deleted node: ${id}`);
  }, [id, setNodes, setEdges, onClose]);

  const showAlert = useCallback(() => {
    alert(`Node ID: ${id}`);
    onClose();
  }, [id, onClose]);

  return (
    <Paper
      elevation={3}
      style={{
        position: 'absolute',
        top,
        left,
        zIndex: 10,
        padding: '10px',
        minWidth: '180px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <MenuList>
        <Typography variant="caption" style={{ padding: '0.5em 1em', color: '#888' }}>
          Node: {id}
        </Typography>                
        <MenuItem onClick={showAlert}>
          <Iconify icon="basil:add-outline" style={{ marginRight: '10px' }} />
          Add Node
        </MenuItem>
        <MenuItem onClick={showAlert}>
          <Iconify icon="fluent:rename-16-regular" style={{ marginRight: '10px' }} />
          Rename Step
        </MenuItem>
        <Divider style={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={duplicateNode}>
          <Iconify icon="fa6-solid:clone" style={{ marginRight: '10px' }} />
          Clone Step
        </MenuItem>
        <MenuItem onClick={showAlert}>
          <Iconify icon="tabler:copy" style={{ marginRight: '10px' }} />
          Copy Step
        </MenuItem>
        <MenuItem onClick={showAlert}>
          <Iconify icon="ic:baseline-content-paste" style={{ marginRight: '10px' }} />
          Paste Step
        </MenuItem>
        <MenuItem onClick={showAlert}>
          <Iconify icon="gg:notes" style={{ marginRight: '10px' }} />
          Add Step Note
        </MenuItem>
        <Divider style={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={showAlert}>
          <Iconify icon="mdi:clock-outline" style={{ marginRight: '10px' }} />
          Set Trigger Time
        </MenuItem>
        <MenuItem onClick={showAlert}>
          <Iconify icon="ic:outline-info" style={{ marginRight: '10px' }} />
          Ignore Error(Enable)
        </MenuItem>

        <Divider style={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={deleteNode}>
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
