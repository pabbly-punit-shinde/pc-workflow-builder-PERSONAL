import { useReactFlow } from '@xyflow/react'; // Importing hooks and methods from React Flow
import React, { useState, useEffect, useCallback } from 'react'; // React core hooks
import { Paper, Divider, MenuList, MenuItem, Typography } from '@mui/material'; // Material UI components
import { Iconify } from 'src/components/iconify'; // Custom Iconify component for icons

// ContextMenu component to show a menu with options for a specific node
export default function ContextMenu({ id, top, left, onClose }) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow(); // Hooks from React Flow
  const [nodeType, setNodeType] = useState(null); // State to store node type
  const [label, setLabel] = useState(null); // State to store node label
  const [adjustedPosition, setAdjustedPosition] = useState({ top, left }); // Adjusted position for context menu

  // useEffect to fetch the node data and adjust menu position based on viewport size
  useEffect(() => {
    const node = getNode(id); // Get the node using the provided ID
    if (node && node.data) {
      setNodeType(node.data.nodeType); // Set node type
      setLabel(node.data.label || node.data.nodeType); // Set node label (default to node type)
    }

    // Function to adjust menu position to fit within the viewport
    const adjustPosition = () => {
      const menuHeight = 450; // Approximate height of the menu
      const menuWidth = 180; // Approximate width of the menu
      const viewportHeight = window.innerHeight; // Get viewport height
      const viewportWidth = window.innerWidth; // Get viewport width

      let adjustedTop = top;
      let adjustedLeft = left;

      // Adjust top position if the menu exceeds the viewport height
      if (top + menuHeight > viewportHeight) {
        adjustedTop = viewportHeight - menuHeight - 200; // Leave some padding from the bottom
      }
      // Adjust left position if the menu exceeds the viewport width
      if (left + menuWidth > viewportWidth) {
        adjustedLeft = viewportWidth - menuWidth - 50; // Leave some padding from the right
      }

      setAdjustedPosition({ top: adjustedTop, left: adjustedLeft }); // Update position
    };

    adjustPosition(); // Call the adjustment function
    window.addEventListener('resize', adjustPosition); // Re-adjust position on window resize
    return () => window.removeEventListener('resize', adjustPosition); // Cleanup event listener on unmount
  }, [getNode, id, top, left]); // Re-run the effect when dependencies change

  // Function to duplicate a node when the "Clone Step" menu item is clicked
  const duplicateNode = useCallback(() => {
    const node = getNode(id); // Get the node by ID
    const position = { x: node.position.x + 50, y: node.position.y + 50 }; // Offset the position for the new node
    const newNode = {
      ...node, // Copy all properties from the original node
      id: `${node.id}-copy`, // Set a new ID for the duplicated node
      position, // Apply the new position
      data: {
        ...node.data, // Copy node data
        label: node.data.label || node.data.nodeType, // Ensure label is set
      },
    };
    addNodes(newNode); // Add the duplicated node
    onClose(); // Close the context menu after duplication
  }, [addNodes, getNode, id, onClose]); // Memoize the callback to avoid unnecessary re-renders

  // Function to remove a node and its edges when the "Delete" menu item is clicked
  const removeNode = useCallback(() => {
    setNodes((nds) => nds.filter((node) => node.id !== id)); // Remove the node from the node list
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id)); // Remove any edges connected to the node
    onClose(); // Close the context menu after deletion
  }, [id, setEdges, setNodes, onClose]); // Memoize the callback to avoid unnecessary re-renders

  return (
    <Paper
      elevation={3} // Material UI Paper component for the menu with shadow
      style={{
        position: 'absolute', // Position the menu absolutely on the page
        top: adjustedPosition.top, // Use the adjusted top position
        left: adjustedPosition.left, // Use the adjusted left position
        zIndex: 10, // Ensure the menu is on top of other elements
        padding: '10px', // Padding inside the menu
        minWidth: '180px', // Set a minimum width for the menu
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect for the menu
      }}
    >
      <MenuList>
        {/* Display the node ID and label in the context menu */}
        <Typography variant="caption" style={{ padding: '0.5em 1em', color: '#888' }}>
          Node: {id} - {label}
        </Typography>

        {/* Conditional menu items based on the node type */}
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

        {/* Divider between actions */}
        <Divider style={{ borderStyle: 'dashed' }} />

        {/* Delete node menu item */}
        <MenuItem onClick={removeNode}>
          <Iconify
            icon="solar:trash-bin-trash-bold"
            style={{ marginRight: '10px', color: 'red' }} // Red color for delete icon
          />
          Delete
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
