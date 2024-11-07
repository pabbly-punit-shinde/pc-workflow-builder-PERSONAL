import { useReactFlow } from '@xyflow/react'; // Importing hooks and methods from React Flow
import React, { useState, useEffect, useCallback } from 'react'; // React core hooks
import { Paper, Divider, MenuList, MenuItem, Typography } from '@mui/material'; // Material UI components
import { Iconify } from 'src/components/iconify'; // Custom Iconify component for icons

// ContextMenu component to show a menu with options for a specific node
export default function ContextMenu({ id, top, left, onClose }) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow(); // Hooks from React Flow to manage nodes and edges
  const [nodeType, setNodeType] = useState(null); // State to store the type of the node
  const [label, setLabel] = useState(null); // State to store the label of the node
  const [adjustedPosition, setAdjustedPosition] = useState({ top, left }); // State to store the adjusted position of the menu

  // useEffect to fetch the node data and adjust menu position based on viewport size
  useEffect(() => {
    const node = getNode(id); // Get the node using the provided ID
    if (node && node.data) {
      setNodeType(node.data.nodeType); // Set the node type (e.g., 'external-app', 'internal-app')
      setLabel(node.data.label || node.data.nodeType); // Set the label (or default to the node type if no label is provided)
    }

    // Function to adjust the position of the menu to fit within the viewport
    const adjustPosition = () => {
      const menuHeight = 450; // Approximate height of the menu
      const menuWidth = 180; // Approximate width of the menu
      const viewportHeight = window.innerHeight; // Get the current viewport height
      const viewportWidth = window.innerWidth; // Get the current viewport width

      let adjustedTop = top;
      let adjustedLeft = left;

      // If the menu exceeds the viewport height, adjust the top position
      if (top + menuHeight > viewportHeight) {
        adjustedTop = viewportHeight - menuHeight - 200; // Leave some padding from the bottom
      }
      // If the menu exceeds the viewport width, adjust the left position
      if (left + menuWidth > viewportWidth) {
        adjustedLeft = viewportWidth - menuWidth - 50; // Leave some padding from the right
      }

      setAdjustedPosition({ top: adjustedTop, left: adjustedLeft }); // Update the adjusted position
    };

    adjustPosition(); // Call the adjustPosition function to initially position the menu
    window.addEventListener('resize', adjustPosition); // Re-adjust position when the window is resized
    return () => window.removeEventListener('resize', adjustPosition); // Clean up the event listener on unmount
  }, [getNode, id, top, left]); // Re-run the effect when dependencies (id, top, left) change

  // Function to duplicate a node when the "Clone Step" menu item is clicked
  const duplicateNode = useCallback(() => {
    const node = getNode(id); // Get the node by its ID
    const position = { x: node.position.x + 50, y: node.position.y + 50 }; // Offset the position of the new node
    const newNode = {
      ...node, // Copy all properties from the original node
      id: `${node.id}-copy`, // Create a new ID for the duplicated node
      position, // Apply the new position
      data: {
        ...node.data, // Copy the node's data
        label: node.data.label || node.data.nodeType, // Ensure the label is set
      },
    };
    addNodes(newNode); // Add the new duplicated node to the flow
    onClose(); // Close the context menu after duplication
  }, [addNodes, getNode, id, onClose]); // Memoize the callback to avoid unnecessary re-renders

  // Function to remove a node and its edges when the "Delete" menu item is clicked
  const removeNode = useCallback(() => {
    setNodes((nds) => nds.filter((node) => node.id !== id)); // Remove the node from the list of nodes
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id)); // Remove any edges connected to the node
    onClose(); // Close the context menu after deletion
  }, [id, setEdges, setNodes, onClose]); // Memoize the callback to avoid unnecessary re-renders

  return (
    <Paper
      elevation={3} // Material UI Paper component for the menu with shadow
      style={{
        position: 'absolute', // Position the menu absolutely on the page
        top: adjustedPosition.top, // Use the adjusted top position for the menu
        left: adjustedPosition.left, // Use the adjusted left position for the menu
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
