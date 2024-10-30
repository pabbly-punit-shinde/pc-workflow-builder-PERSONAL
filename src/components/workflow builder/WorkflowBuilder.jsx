import '@xyflow/react/dist/style.css';

import dagre from 'dagre';
import React, { useState, useCallback, useLayoutEffect } from 'react';
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

import Drawer from './Drawer';
import CustomNode from './CustomNodes';
import { initialNodes, initialEdges } from './nodes-edges';
import WorkflowNameHeader from 'src/components/workflow builder/workflow-name-header';

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
  const nodeSpacing = direction === 'LR' ? 140 : 140;
  const rankSpacing = direction === 'LR' ? 50 : 100;
  g.setGraph({
    rankdir: direction,
    nodesep: nodeSpacing,
    ranksep: rankSpacing,
  });
  g.setDefaultEdgeLabel(() => ({}));
  nodes.forEach((node) => g.setNode(node.id, { width: 100, height: 50 }));
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
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

// Updated generateGradients function
const generateGradients = (nodes, edges, direction) => {
  let gradients = [];
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
        <stop offset="0%" stopColor={sourceNode.data.color} />
        <stop offset="100%" stopColor={targetNode.data.color} />
      </linearGradient>
    );

    edge.style = {
      strokeWidth: 2,
      stroke: `url(#${gradientId})`,
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

  const onConnect = useCallback(
    (params) => {
      const newEdge = { ...params, type: edgeType, animated: isAnimated };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [edgeType, isAnimated]
  );

  const onLayout = useCallback(
    ({ direction, useInitialNodes = false }) => {
      const ns = useInitialNodes ? initialNodes : nodes;
      const es = useInitialNodes ? initialEdges : edges;
      setIsHorizontal(direction === 'LR');
      const layoutedElements = getDagreLayout(ns, es, direction);
      setNodes(layoutedElements.nodes);
      setEdges(layoutedElements.edges);
      window.requestAnimationFrame(() => fitView());
    },
    [nodes, edges]
  );

  useLayoutEffect(() => {
    onLayout({ direction: 'TB', useInitialNodes: true });
  }, []);

  React.useEffect(() => {
    const updatedEdges = edges.map((edge) => ({
      ...edge,
      type: edgeType,
      animated: isAnimated,
    }));
    setEdges(updatedEdges);
  }, [edgeType, isAnimated]);

  const toggleAnimation = () => {
    setIsAnimated((prev) => !prev);
  };

  const nodeTypes = {
    custom: (props) => <CustomNode {...props} isHorizontal={isHorizontal} />,
  };

  const gradients = generateGradients(nodes, edges, isHorizontal ? 'LR' : 'TB');

  // Define a function for button click
  const handleButtonClick = () => {
    // Perform some action here
    console.log('Button clicked!');
  };

  return (
    <div style={{ width: '94vw', height: '85vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
        draggable={true}
        defaultEdgeOptions={defaultEdgeOptions}
        proOptions={proOptions}
      >
        <svg width="0" height="0">
          <defs>{gradients}</defs>
        </svg>
        <WorkflowNameHeader />
        <Panel position="top-right">
          <Drawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            onLayout={onLayout}
            setEdgeType={setEdgeType}
            toggleAnimation={toggleAnimation}
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
      </ReactFlow>
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <LayoutFlow />
  </ReactFlowProvider>
);
