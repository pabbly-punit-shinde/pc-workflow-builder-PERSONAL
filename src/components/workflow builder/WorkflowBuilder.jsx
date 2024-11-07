import '@xyflow/react/dist/style.css';

import dagre from 'dagre';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import {
  Panel,
  MiniMap,
  addEdge,
  Controls,
  ReactFlow,
  MarkerType,
  useReactFlow,
  useEdgesState,
  useNodesState,
  ReactFlowProvider,
} from '@xyflow/react';

import { Box } from '@mui/material';

import WorkflowNameHeader from 'src/components/workflow builder/components/workflow-name-header';

import Drawer from './components/Drawer';
import CustomNode from './components/CustomNodes';
import ContextMenu from './components/ContextMenu';
import { initialNodes, initialEdges } from './nodes-edges';

const proOptions = { account: 'paid-pro', hideAttribution: true };
const defaultEdgeOptions = { type: 'smoothstep', pathOptions: { offset: 5 } };

const withIsHorizontal = (isHorizontal) => (props) => (
  <CustomNode {...props} isHorizontal={isHorizontal} />
);

const getDagreLayout = (nodes, edges, direction = 'TB') => {
  const g = new dagre.graphlib.Graph();
  const baseNodeSpacing = direction === 'LR' ? 200 : 200;
  const baseRankSpacing = direction === 'LR' ? 100 : 100;

  const targetCounts = edges.reduce((acc, edge) => {
    acc[edge.source] = (acc[edge.source] || 0) + 1;
    return acc;
  }, {});

  g.setGraph({
    rankdir: direction,
    nodesep: baseNodeSpacing,
    ranksep: baseRankSpacing,
  });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 100, height: 50 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const newNodes = nodes.map((node) => {
    const dagreNode = g.node(node.id);
    return {
      ...node,
      position: {
        x: dagreNode.x + Math.random() * 0.1,
        y: dagreNode.y + Math.random() * 0.1,
      },
    };
  });

  return { nodes: newNodes, edges };
};

const generateGradients = (nodes, edges) => {
  const gradients = [];

  edges.forEach((edge, index) => {
    const sourceNode = nodes.find((node) => node.id === edge.source);
    const targetNode = nodes.find((node) => node.id === edge.target);
    const gradientId = `gradient${index}`;

    // Calculate the angle of the line connecting source and target nodes
    const dx = targetNode.position.x - sourceNode.position.x;
    const dy = targetNode.position.y - sourceNode.position.y;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Set gradient direction based on the dominant axis
    let gradientCoords;
    if (absDx > absDy) {
      // Horizontal or near-horizontal line
      gradientCoords = dx >= 0
        ? { x1: '0', y1: '0', x2: '1', y2: '0' } // Left to right
        : { x1: '1', y1: '0', x2: '0', y2: '0' }; // Right to left
    } else {
      // Vertical or near-vertical line
      gradientCoords = dy >= 0
        ? { x1: '0', y1: '0', x2: '0', y2: '1' } // Top to bottom
        : { x1: '0', y1: '1', x2: '0', y2: '0' }; // Bottom to top
    }

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

    edge.style = {
      stroke: `url(#${gradientId})`,
      strokeWidth: 2,
      opacity: 0.75,
    };
    edge.markerEnd = {
      type: MarkerType.ArrowClosed,
      color: targetNode.data.color,
    };
  });

  return gradients;
};






function LayoutFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { fitView } = useReactFlow();
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [edgeType, setEdgeType] = useState('smoothstep');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isInitialLayoutSet, setIsInitialLayoutSet] = useState(false);
  const [menu, setMenu] = useState(null);
  const [isMiniMapVisible, setIsMiniMapVisible] = useState(false); // New state for MiniMap visibility
  const ref = useRef(null);

  const nodeTypes = useMemo(
    () => ({
      custom: withIsHorizontal(isHorizontal),
    }),
    [isHorizontal]
  );

  const onConnect = useCallback(
    (params) => {
      const newEdge = { ...params, type: edgeType, animated: isAnimated };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edgeType, isAnimated, setEdges]
  );

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
      const layoutedElements = getDagreLayout(ns, es, direction);
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

  const toggleAnimation = () => {
    setIsAnimated((prev) => {
      updateEdgesWithTypeAndAnimation(edgeType, !prev);
      return !prev;
    });
  };

  const toggleMinimap = () => {
    setIsMiniMapVisible((prev) => !prev);
  };

  const gradients = generateGradients(nodes, edges, isHorizontal ? 'LR' : 'TB');

  const handleEdgeTypeChange = (newEdgeType) => {
    setEdgeType(newEdgeType);
    updateEdgesWithTypeAndAnimation(newEdgeType, isAnimated);
  };

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    setMenu({
      id: node.id,
      top: event.clientY,
      left: event.clientX,
    });
  }, []);

  const onPaneClick = useCallback(() => setMenu(null), []);

  return (
    <div style={{ display: 'flex', height: '92vh' }}>
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
        <svg width="0" height="0">
          <defs>{gradients}</defs>
        </svg>
        <Panel position="top-left">
          <Box sx={{ display: 'flex', gap: 1 }}>
            <WorkflowNameHeader />
            <Drawer
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
              onLayout={onLayout}
              setEdgeType={handleEdgeTypeChange}
              toggleAnimation={toggleAnimation}
              fitView={fitView}
              toggleMinimap={toggleMinimap} // Pass the toggleMinimap function
            />
          </Box>
        </Panel>
        <Controls />
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

export default function App() {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
