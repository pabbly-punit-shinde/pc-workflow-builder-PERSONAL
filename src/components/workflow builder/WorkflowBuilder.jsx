import '@xyflow/react/dist/style.css';

import { tree, hierarchy } from 'd3-hierarchy';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import {
  Panel, // Panel component to place elements in specific positions within the flow
  MiniMap, // MiniMap component to display a mini overview of the graph
  addEdge, // Function to add an edge between nodes
  Controls, // Controls component for zooming, panning, etc.
  ReactFlow, // Main component to render the graph/flow
  Background, // Background dots to help with zooming
  MarkerType, // Enum for defining types of markers on edges
  useReactFlow, // Hook to interact with the ReactFlow instance
  useEdgesState, // Hook to manage the edges state
  useNodesState, // Hook to manage the nodes state
  ReactFlowProvider,
  BackgroundVariant, // Context provider for ReactFlow
} from '@xyflow/react';

import { Box, Tooltip } from '@mui/material'; 

// Importing custom components
import WorkflowNameHeader from 'src/components/workflow builder/components/workflow-name-header'; // Component for displaying the workflow's name
import Drawer from './components/Drawer'; // Custom drawer component for UI controls
import CustomNode from './components/CustomNodes'; // Custom node component for the flow chart
import ContextMenu from './components/ContextMenu'; // Context menu for node right-click actions
import { initialNodes, initialEdges } from './nodes-edges'; // Initial state for nodes and edges
import Overlay from './components/Overlay';

// Setting default configuration options
const proOptions = { account: 'paid-pro', hideAttribution: true }; // Pro options for advanced ReactFlow features
const defaultEdgeOptions = { type: 'smoothstep', pathOptions: { offset: 15 } }; // Default edge configuration

// Custom function to handle horizontal layout for nodes
const withIsHorizontal = (isHorizontal) => (props) => (
  <CustomNode {...props} isHorizontal={isHorizontal} />
);

// Function to layout the graph using the d3-hierarchy library      
const getD3HierarchyLayout = (nodes, edges, direction = 'TB') => {
  // Map nodes to a structure that d3-hierarchy expects
  const nodeMap = nodes.reduce((acc, node) => {
    acc[node.id] = { ...node, children: [] };
    return acc;
  }, {});

  // Define children based on edges
  edges.forEach((edge) => {
    const sourceNode = nodeMap[edge.source];
    const targetNode = nodeMap[edge.target];
    if (sourceNode && targetNode) {
      sourceNode.children.push(targetNode);
    }
  });

  // Identify the root node
  const rootNode = nodes.find((node) => !edges.some((edge) => edge.target === node.id));
  if (!rootNode) {
    console.error('No root node found for layout. Ensure graph is a tree or DAG.');
    return { nodes, edges };
  }

  // Create the root hierarchy
  const root = hierarchy(nodeMap[rootNode.id]);

  // Define the layout with adjustable node size and separation
  const treeLayout = tree()
    .nodeSize(direction === 'LR' ? [200, 200] : [200, 150]) // Adjust nodeSize for spacing
    .separation((a, b) => (a.parent === b.parent ? 1.5 : 2)); // Adjust separation

  // Apply layout to the root hierarchy
  treeLayout(root);

  // Map layouted positions back to nodes with slight random offset
  const newNodes = nodes.map((node) => {
    const layoutNode = root.descendants().find((n) => n.data.id === node.id);
    return {
      ...node,
      position: {
        x: (direction === 'LR' ? layoutNode.y : layoutNode.x) + Math.random() * 0.01, // Slight offset in x
        y: (direction === 'LR' ? layoutNode.x : layoutNode.y) + Math.random() * 0.01, // Slight offset in y
      },
    };
  });

  return { nodes: newNodes, edges };
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
      gradientCoords =
        dx >= 0
          ? { x1: '0', y1: '0', x2: '1', y2: '0' } // Horizontal left-to-right gradient
          : { x1: '1', y1: '0', x2: '0', y2: '0' }; // Horizontal right-to-left gradient
    } else {
      gradientCoords =
        dy >= 0
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
      strokeWidth: 3,
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
  const [clickCount, setClickCount] = useState(0);

  const ref = useRef(null); // Ref for ReactFlow component
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

   // Memoize the nodeTypes to avoid recalculating on every render
   const nodeTypes = useMemo(() => ({
    custom: withIsHorizontal(isHorizontal),
  }), [isHorizontal]); // Only change when isHorizontal changes
  

  const onConnect = useCallback(
    (params) => {
      const newEdge = { ...params, type: edgeType, animated: isAnimated };
      setEdges((eds) => addEdge(newEdge, eds));
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

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;
      setIsHorizontal(direction === 'LR');
      const layoutedElements = getD3HierarchyLayout(ns, es, direction);
      setNodes(layoutedElements.nodes);
      setEdges(layoutedElements.edges);
    },
    [nodes, edges, setEdges, setNodes]
  );

  useEffect(() => {
    if (!isInitialLayoutSet) {
      onLayout({ direction: 'TB', useInitialNodes: true });
      setIsInitialLayoutSet(true);
    }
  }, [isInitialLayoutSet, onLayout]);

  useEffect(() => {
    if (isInitialLayoutSet) {
      fitView();
    }
  }, [isInitialLayoutSet, fitView]);

  // Toggle solid, dashed and animated edge styles
  const toggleEdgeStyleAndAnimate = () => {
    setClickCount((prevCount) => {
      const newCount = (prevCount + 1) % 3;

      // Reset animation state each cycle to ensure it's ready for the next start
      if (newCount === 0) {
        setEdges(() =>
          edges.map((edge) => ({
            ...edge,
            style: {
              ...edge.style,
              strokeDasharray: '0', // Solid style
            },
          }))
        );
        setIsDashed(false);
        setIsAnimated(false); // Ensure animation is off before restarting
        updateEdgesWithTypeAndAnimation(edgeType, false);
      }

      if (newCount === 1) {
        // First click: Set edges to dashed
        setEdges(() =>
          edges.map((edge) => ({
            ...edge,
            style: {
              ...edge.style,
              strokeDasharray: '5,5', // Dashed style
            },
          }))
        );
        setIsDashed(true);
      } else if (newCount === 2) {
        // Second click: Start animation
        setIsAnimated(true);
        updateEdgesWithTypeAndAnimation(edgeType, true);
      }
      return newCount;
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

  const handleDownload = (size) => {
    console.log('Downloading snapshot with size:', size);
    // Add logic for downloading snapshot in the desired size
  };

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
        elementsSelectable={false}
        defaultEdgeOptions={defaultEdgeOptions}
        proOptions={proOptions}
        style={{ flex: 1, backgroundColor: '#f8f8f8' }}
      >
        {/* Define gradient styles for edges */}
        <svg width="0" height="0">
          <defs>{gradients}</defs>
        </svg>

        {/* Top-left panel with workflow name and UI controls */}
        <Panel position="top-left">
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap="5px">
            <WorkflowNameHeader />
          </Box>
        </Panel>
        <Background gap={20} color="#ddd" variant={BackgroundVariant.dot} />
        {/* Controls for zoom and other functionalities */}
        <Controls>
          <Tooltip title="Choose Snapshot Size" arrow placement="top" disableInteractive>
            <button
              type="button"
              style={{
                width: '27px', 
                height: '27px',
                backgroundColor: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '1px',
              }}
              onClick={() => setIsOverlayOpen(true)}
            >
              <img
                src="/assets/images/reactflow/icons/image-download.svg"
                alt="Snapshot Sizes"
                width="100%"
                height="100%"
              />
            </button>
          </Tooltip>
          <Overlay
            open={isOverlayOpen}
            onClose={() => setIsOverlayOpen(false)}
            onDownload={handleDownload}
          />
          <Drawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            onLayout={onLayout}
            setEdgeType={handleEdgeTypeChange}
            fitView={fitView}
            toggleMinimap={toggleMinimap}
            isDashed={isDashed}
            isAnimated={isAnimated}
            toggleEdgeStyleAndAnimate={toggleEdgeStyleAndAnimate}
          />
        </Controls>

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
