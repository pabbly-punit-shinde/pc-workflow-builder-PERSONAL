import '@xyflow/react/dist/style.css';

import dagre from 'dagre';
import React, { useRef, useState, useEffect, useCallback } from 'react';
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

import WorkflowNameHeader from 'src/components/workflow builder/components/workflow-name-header';

import Drawer from './components/Drawer';
import CustomNode from './components/CustomNodes';
import ContextMenu from './components/ContextMenu';
import { initialNodes, initialEdges } from './nodes-edges';

// Define pro options
const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

// Define default edge options without specifying markerEnd color directly
const defaultEdgeOptions = {
  type: 'smoothstep',
  pathOptions: { offset: 5 },
};

// Updated Dagre Layout
const getDagreLayout = (nodes, edges, direction = 'TB') => {
  const g = new dagre.graphlib.Graph();
  const baseNodeSpacing = direction === 'LR' ? 180 : 200;
  const baseRankSpacing = direction === 'LR' ? 60 : 100;

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

  const newEdges = edges.map((edge) => {
    const numTargets = targetCounts[edge.source] || 1;

    if (numTargets > 1) {
      g.setGraph({
        nodesep: direction === 'LR' ? 180 : 200,
        ranksep: direction === 'LR' ? 120 : 200,
      });
    }

    return {
      ...edge,
    };
  });

  return { nodes: newNodes, edges: newEdges };
};

// Updated generateGradients function
const generateGradients = (nodes, edges, direction) => {
  const gradients = [];
  edges.forEach((edge, index) => {
    const sourceNode = nodes.find((node) => node.id === edge.source);
    const targetNode = nodes.find((node) => node.id === edge.target);
    const gradientId = `gradient${index}`;

    const gradientCoords =
      direction === 'TB'
        ? { x1: '0', y1: '0', x2: '0', y2: '1' }
        : { x1: '0', y1: '0', x2: '1', y2: '0' };

    gradients.push(
      <linearGradient
        id={gradientId}
        x1={gradientCoords.x1}
        y1={gradientCoords.y1}
        x2={gradientCoords.x2}
        y2={gradientCoords.y2}
        key={index}
      >
        <stop offset="10%" stopColor={sourceNode.data.color} />
        <stop offset="100%" stopColor={targetNode.data.color} />
      </linearGradient>
    );

    edge.style = {
      strokeWidth: 2,
      stroke: `url(#${gradientId})`,
      opacity: 0.75,
    };
    edge.markerEnd = {
      type: MarkerType.ArrowClosed,
      color: targetNode.data.color,
      opacity: 0.75,
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
  const [menu, setMenu] = useState(null); // State for context menu
  const ref = useRef(null);

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

  const nodeTypes = {
    custom: (props) => <CustomNode {...props} isHorizontal={isHorizontal} />,
  };

  const gradients = generateGradients(nodes, edges, isHorizontal ? 'LR' : 'TB');

  const handleEdgeTypeChange = (newEdgeType) => {
    setEdgeType(newEdgeType);
    updateEdgesWithTypeAndAnimation(newEdgeType, isAnimated);
  };

  // Handle right-click on node to open context menu
  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    const pane = ref.current.getBoundingClientRect();
    setMenu({
      id: node.id,
      top: event.clientY < pane.height - 10 ? event.clientY : null,
      left: event.clientX < pane.width - 10 ? event.clientX : null,
      right: event.clientX >= pane.width - 10 ? pane.width - event.clientX : null,
      bottom: event.clientY >= pane.height - 10 ? pane.height - event.clientY : null,
    });
  }, []);

  // Close the context menu when clicking outside
  const onPaneClick = useCallback(() => setMenu(null), []);

  return (
    <div style={{ width: '95vw', height: '92vh' }}>
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
      >
        <svg width="0" height="0">
          <defs>{gradients}</defs>
        </svg>
        <Panel position="top-left">
          <WorkflowNameHeader />
        </Panel>
        <Panel position="top-right">
          <Drawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            onLayout={onLayout}
            setEdgeType={handleEdgeTypeChange}
            toggleAnimation={toggleAnimation}
            fitView={fitView}
          />
        </Panel>

        <Controls />
        <MiniMap
          style={{
            borderRadius: '0 0 4px 4px',
            boxShadow: '0 2px 4px rgba(84, 95, 111, .16), 0 0 1px rgba(37, 45, 91, .04)',
          }}
          nodeTypes={nodeTypes}
          nodeColor={(node) => node.data.color || '#F3F7FA'}
        />

        {menu && <ContextMenu onClose={onPaneClick} {...menu} />}
      </ReactFlow>
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);
