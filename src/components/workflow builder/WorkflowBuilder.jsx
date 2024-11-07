// Importing the necessary styles and libraries
import '@xyflow/react/dist/style.css';

import dagre from 'dagre';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import {
  Panel, // Panel component to place elements in specific positions within the flow
  MiniMap, // MiniMap component to display a mini overview of the graph
  addEdge, // Function to add an edge between nodes
  Controls, // Controls component for zooming, panning, etc.
  ReactFlow, // Main component to render the graph/flow
  MarkerType, // Enum for defining types of markers on edges
  useReactFlow, // Hook to interact with the ReactFlow instance
  useEdgesState, // Hook to manage the edges state
  useNodesState, // Hook to manage the nodes state
  ReactFlowProvider, // Context provider for ReactFlow
} from '@xyflow/react';

import { Box } from '@mui/material'; // Material UI Box component for layout

// Importing custom components
import WorkflowNameHeader from 'src/components/workflow builder/components/workflow-name-header'; // Component for displaying the workflow's name
import Drawer from './components/Drawer'; // Custom drawer component for UI controls
import CustomNode from './components/CustomNodes'; // Custom node component for the flow chart
import ContextMenu from './components/ContextMenu'; // Context menu for node right-click actions
import { initialNodes, initialEdges } from './nodes-edges'; // Initial state for nodes and edges

// Setting default configuration options
const proOptions = { account: 'paid-pro', hideAttribution: true }; // Pro options for advanced ReactFlow features
const defaultEdgeOptions = { type: 'smoothstep', pathOptions: { offset: 5 } }; // Default edge configuration

// Custom function to handle horizontal layout for nodes
const withIsHorizontal = (isHorizontal) => (props) => (
  <CustomNode {...props} isHorizontal={isHorizontal} />
);

// Function to layout the graph using the dagre library (for automatic node positioning)
const getDagreLayout = (nodes, edges, direction = 'TB') => {
  const g = new dagre.graphlib.Graph();
  const baseNodeSpacing = direction === 'LR' ? 200 : 200; // Define spacing between nodes
  const baseRankSpacing = direction === 'LR' ? 100 : 100; // Define spacing between node ranks

  // Count how many edges go out from each node
  const targetCounts = edges.reduce((acc, edge) => {
    acc[edge.source] = (acc[edge.source] || 0) + 1;
    return acc;
  }, {});

  // Set graph layout options like direction and spacing
  g.setGraph({
    rankdir: direction,
    nodesep: baseNodeSpacing,
    ranksep: baseRankSpacing,
  });

  g.setDefaultEdgeLabel(() => ({})); // Set default edge labels (none)

  // Add nodes to the graph
  nodes.forEach((node) => {
    g.setNode(node.id, { width: 100, height: 50 }); // Set width and height for each node
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target); // Define edges between nodes
  });

  // Perform the layout computation
  dagre.layout(g);

  // Map layouted positions back to nodes
  const newNodes = nodes.map((node) => {
    const dagreNode = g.node(node.id);
    return {
      ...node,
      position: {
        x: dagreNode.x + Math.random() * 0.1, // Randomize position slightly for visual variation
        y: dagreNode.y + Math.random() * 0.1,
      },
    };
  });

  return { nodes: newNodes, edges }; // Return the updated node and edge positions
};

// Function to generate gradient colors for edges based on node colors
const generateGradients = (nodes, edges, isDashed) => {
  const gradients = [];

  // Loop through all edges and create gradient definitions for each
  edges.forEach((edge, index) => {
    const sourceNode = nodes.find((node) => node.id === edge.source); // Source node for the edge
    const targetNode = nodes.find((node) => node.id === edge.target); // Target node for the edge
    const gradientId = `gradient${index}`; // Unique ID for each gradient

    // Calculate the angle of the edge (horizontal or vertical)
    const dx = targetNode.position.x - sourceNode.position.x;
    const dy = targetNode.position.y - sourceNode.position.y;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Determine the gradient direction based on the edge orientation (horizontal or vertical)
    let gradientCoords;
    if (absDx > absDy) {
      gradientCoords = dx >= 0
        ? { x1: '0', y1: '0', x2: '1', y2: '0' } // Horizontal left-to-right gradient
        : { x1: '1', y1: '0', x2: '0', y2: '0' }; // Horizontal right-to-left gradient
    } else {
      gradientCoords = dy >= 0
        ? { x1: '0', y1: '0', x2: '0', y2: '1' } // Vertical top-to-bottom gradient
        : { x1: '0', y1: '1', x2: '0', y2: '0' }; // Vertical bottom-to-top gradient
    }

    // Add the gradient definition to the array
    gradients.push(
      <linearGradient
        id={gradientId}
        x1={gradientCoords.x1}
        y1={gradientCoords.y1}
        x2={gradientCoords.x2}
        y2={gradientCoords.y2}
        key={index}
      >
        <stop offset="0%" stopColor={sourceNode.data.color} />
        <stop offset="100%" stopColor={targetNode.data.color} />
      </linearGradient>
    );

    // Apply the gradient to the edge style
    edge.style = {
      stroke: `url(#${gradientId})`,
      strokeWidth: 2,
      opacity: 0.75,
      strokeDasharray: isDashed ? '5,5' : '0', // Optional dashed style for edges
    };
    edge.markerEnd = {
      type: MarkerType.ArrowClosed, // Arrow marker at the end of the edge
      color: targetNode.data.color, // Marker color matches target node color
    };
  });

  return gradients; // Return the array of gradient definitions
};

// Main LayoutFlow component
function LayoutFlow() {
  // State hooks for managing the flow's nodes, edges, and layout
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [edgeType, setEdgeType] = useState('smoothstep');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isInitialLayoutSet, setIsInitialLayoutSet] = useState(false);
  const [menu, setMenu] = useState(null);
  const [isMiniMapVisible, setIsMiniMapVisible] = useState(false); // State for toggling MiniMap visibility
  const [isDashed, setIsDashed] = useState(false);
  const ref = useRef(null); // Ref for ReactFlow component

  // Node type definitions (custom node with horizontal layout option)
  const nodeTypes = useMemo(
    () => ({
      custom: withIsHorizontal(isHorizontal),
    }),
    [isHorizontal]
  );

  // Callback for handling node connection (creating new edges)
  const onConnect = useCallback(
    (params) => {
      const newEdge = { ...params, type: edgeType, animated: isAnimated };
      setEdges((eds) => addEdge(newEdge, eds)); // Add the new edge to the state
    },
    [edgeType, isAnimated, setEdges]
  );

  // Update edge styles based on edge type and animation
  const updateEdgesWithTypeAndAnimation = (newEdgeType, newIsAnimated) => {
    const updatedEdges = edges.map((edge) => ({
      ...edge,
      type: newEdgeType,
      animated: newIsAnimated,
    }));
    setEdges(updatedEdges);
  };

  // Handle layout changes (top-to-bottom or left-to-right)
  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;
      setIsHorizontal(direction === 'LR');
      const layoutedElements = getDagreLayout(ns, es, direction);
      setNodes(layoutedElements.nodes);
      setEdges(layoutedElements.edges);
    },
    [nodes, edges, setEdges, setNodes]
  );

  useEffect(() => {
    if (!isInitialLayoutSet) {
      onLayout({ direction: 'TB', useInitialNodes: true }); // Set initial layout
      setIsInitialLayoutSet(true);
    }
  }, [isInitialLayoutSet, onLayout]);

  useEffect(() => {
    if (isInitialLayoutSet) {
      fitView(); // Adjust view to fit the layout
    }
  }, [isInitialLayoutSet, fitView]);

  // Toggle edge animation
  const toggleAnimation = () => {
    setIsAnimated((prev) => {
      updateEdgesWithTypeAndAnimation(edgeType, !prev);
      return !prev;
    });
  };

  // Toggle dashed/solid edge style
  const toggleDashStyle = () => {
    setIsDashed((prev) => {
      const newDashedState = !prev;
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          style: {
            ...edge.style,
            strokeDasharray: newDashedState ? '5,5' : '0', // Toggle between dashed and solid
          },
        }))
      );
      return newDashedState;
    });
  };

  // Toggle visibility of MiniMap
  const toggleMinimap = () => {
    setIsMiniMapVisible((prev) => !prev);
  };

  // Generate gradients for edges
  const gradients = generateGradients(nodes, edges, isDashed, isHorizontal ? 'LR' : 'TB');

  // Handle changes in edge type (e.g., smoothstep, straight)
  const handleEdgeTypeChange = (newEdgeType) => {
    setEdgeType(newEdgeType);
    updateEdgesWithTypeAndAnimation(newEdgeType, isAnimated);
  };

  // Handle right-click context menu for nodes
  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setMenu({
      id: node.id,
      top: event.clientY,
      left: event.clientX,
    });
  }, []);

  const onPaneClick = useCallback(() => setMenu(null), []); // Close the context menu when clicking on the pane

  return (
    <div style={{ display: 'flex', height: '92vh' }}>
      {/* Main ReactFlow component to render the graph */}
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        fitView
        nodeTypes={nodeTypes}
        draggable
        defaultEdgeOptions={defaultEdgeOptions}
        proOptions={proOptions}
        style={{ flex: 1 }}
      >
        {/* Define gradient styles for edges */}
        <svg width="0" height="0">
          <defs>{gradients}</defs>
        </svg>

        {/* Top-left panel with workflow name and UI controls */}
        <Panel position="top-left">
          <Box display="flex" flexDirection={{ xs: "column", md: 'row' }} gap="5px">
            <WorkflowNameHeader />
            <Drawer
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
              onLayout={onLayout}
              setEdgeType={handleEdgeTypeChange}
              toggleAnimation={toggleAnimation}
              fitView={fitView}
              toggleMinimap={toggleMinimap}
              toggleDashStyle={toggleDashStyle}
            />
          </Box>
        </Panel>

        {/* Controls for zoom and other functionalities */}
        <Controls />

        {/* MiniMap component to display a smaller overview */}
        {isMiniMapVisible && (
          <MiniMap
            style={{
              borderRadius: '0 0 4px 4px',
              boxShadow: '0 2px 4px rgba(84, 95, 111, .16), 0 0 1px rgba(37, 45, 91, .04)',
            }}
            nodeTypes={nodeTypes}
            nodeColor={(node) => node.data.color || '#555'}
          />
        )}
      </ReactFlow>

      {/* Context menu for right-click node actions */}
      {menu && (
        <ContextMenu
          id={menu.id}
          top={menu.top || 0}
          left={menu.left || 0}
          onClose={() => setMenu(null)}
        />
      )}
    </div>
  );
}

// Main App component that provides context for ReactFlow
export default function App() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
