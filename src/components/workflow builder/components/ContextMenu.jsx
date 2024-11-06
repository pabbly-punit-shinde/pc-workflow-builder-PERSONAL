import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { Paper, Divider, MenuList, MenuItem, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';

export default function ContextMenu({ id, top, left, onClose }) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const duplicateNode = useCallback(() => {
    const node = getNode(id);
    const position = { x: node.position.x + 50, y: node.position.y + 50 };
    const newNode = {
      ...node,
      id: `${node.id}-copy`,
      position,
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
        top: top ?? 0,
        left: left ?? 0,
        zIndex: 10,
        padding: '10px',
        minWidth: '180px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <MenuList>
        <MenuItem onClick={duplicateNode}>
          <Iconify icon="ic:round-content-copy" width={20} />
          <Typography variant="subtitle2" sx={{ ml: 1 }}>Duplicate</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={removeNode}>
          <Iconify icon="ic:round-delete" width={20} />
          <Typography variant="subtitle2" sx={{ ml: 1 }}>Delete</Typography>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
