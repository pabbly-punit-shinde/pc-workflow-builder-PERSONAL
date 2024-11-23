import '@xyflow/react/dist/style.css';

import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import {
  Panel, // Panel component to place elements in specific positions within the flow
  MiniMap, // MiniMap component to display a mini overview of the graph
  addEdge, // Function to add an edge between nodes
  Controls, // Controls component for zooming, panning, etc.
  ReactFlow, // Main component to render the graph/flow
  Background, // Enum for defining types of markers on edges
  useReactFlow, // Hook to interact with the ReactFlow instance
  useEdgesState, // Hook to manage the edges state
  useNodesState, // Hook to manage the nodes state
  ControlButton, // Context provider for ReactFlow
  ReactFlowProvider,
  BackgroundVariant,
} from '@xyflow/react';

import { Box, Tooltip } from '@mui/material';

// Importing custom components
import WorkflowNameHeader from 'src/components/workflow builder/components/partials/workflow-name-header'; // Component for displaying the workflow's name
import { DashboardContent } from 'src/layouts/dashboard';

import Drawer from './components/Drawer'; // Custom drawer component for UI controls
import CustomNode from './components/CustomNodes'; // Custom node component for the flow chart
import ContextMenu from './components/ContextMenu'; // Context menu for node right-click actions
import { initialNodes, initialEdges } from './db/nodes-edges-start'; // Initial state for nodes and edges
import Overlay from './components/partials/Overlay';
import { generateGradients } from './utils/generateGradients';
import { getD3HierarchyLayout } from './utils/d3HierarchyLayout';

// Setting default configuration options
const proOptions = { account: 'paid-pro', hideAttribution: true }; // Pro options for advanced ReactFlow features
const defaultEdgeOptions = { type: 'smoothstep', pathOptions: { offset: 15 } }; // Default edge configuration

// Custom function to handle horizontal layout for nodes
const withIsHorizontal = (isHorizontal) => (props) => (
  <CustomNode {...props} isHorizontal={isHorizontal} />
);

// Main LayoutFlow component
function LayoutFlow() {
  // State hooks for managing the flow's nodes, edges, and layout
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [edgeType, setEdgeType] = useState('smoothstep');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isInitialLayoutSet, setIsInitialLayoutSet] = useState(false);
  const [menu, setMenu] = useState(null);
  const [isMiniMapVisible, setIsMiniMapVisible] = useState(false); // State for toggling MiniMap visibility
  const [isDashed, setIsDashed] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const ref = useRef(null); // Ref for ReactFlow component
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // Memoize the nodeTypes to avoid recalculating on every render
  const nodeTypes = useMemo(
    () => ({
      custom: withIsHorizontal(isHorizontal),
    }),
    [isHorizontal]
  ); // Only change when isHorizontal changes

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
    <DashboardContent disablePadding maxWidth="xxl">
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
            <ControlButton onClick={() => setIsOverlayOpen(true)}>
              <img
                src="/assets/images/reactflow/icons/image-download.svg"
                alt="Snapshot Sizes"
                width="100%"
                height="100%"
              />
            </ControlButton>
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
    </DashboardContent>
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
