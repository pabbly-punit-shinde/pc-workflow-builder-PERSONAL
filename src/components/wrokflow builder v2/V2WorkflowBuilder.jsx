import '@xyflow/react/dist/style.css';

import { button, useControls } from 'leva';
import { useEffect, useCallback } from 'react';
import {
  addEdge,
  MiniMap,
  Controls,
  ReactFlow,
  MarkerType,
  useReactFlow,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  ConnectionLineType,
} from '@xyflow/react';

import { getId } from './utils/utils';
import { initialNodes } from './db/initialNodes';
import { initialEdges } from './db/initialEdges';
import useAutoLayout from './utils/useAutoLayout';
import CustomNode from './components/CustomNodes'; // Import the CustomNode

const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 15 },
};

function ReactFlowAutoLayout() {
  const { fitView, addNodes } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const layoutOptions = useControls({
    about: {
      value:
        'Add child nodes by clicking a node in the graph. Add new root nodes by clicking the button below.',
      editable: false,
    },
    algorithm: {
      value: 'd3-hierarchy',
      options: ['dagre', 'd3-hierarchy', 'elk'],
    },
    direction: {
      value: 'TB',
      options: {
        Vertical: 'TB',
        Horizontal: 'LR',
      },
    },
    spacing: [250, 50],
    'add root node': button(() =>
      addNodes({
        id: getId(),
        position: { x: 0, y: 0 },
        data: { label: `New Node` },
        style: { opacity: 0 },
        type: 'custom', // Specify type for root node
      })
    ),
  });

  useAutoLayout(layoutOptions);

  const addChildNode = useCallback(
    (parentNodeId) => {
      const childNodeId = getId();

      const childNode = {
        id: childNodeId,
        data: {
          label: `Node ${nodes.length + 1}`,
          color: '#93AABD', // Example color
          icon: '/path/to/icon.svg', // Example icon
          subtext: 'Add New Action Step',
          note: false,
        },
        position: { x: 0, y: 0 },
        style: { opacity: 0 },
        type: 'custom', // Set type to 'custom'
      };

      const connectingEdge = {
        id: `${parentNodeId}->${childNodeId}`,
        source: parentNodeId,
        target: childNodeId,
        style: { opacity: 0 },
      };

      setNodes((prevNodes) => prevNodes.concat([childNode]));
      setEdges((prevEdges) => prevEdges.concat([connectingEdge]));
    },
    [setNodes, setEdges, nodes.length]
  );

  const onNodeClick = useCallback(
    (_, node) => {
      addChildNode(node.id);
    },
    [addChildNode]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    fitView();
  }, [nodes, fitView]);

  const nodeTypes = {
    custom: CustomNode, // Register CustomNode
  };

  return (
    <div style={{ display: 'flex', height: '92vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // onNodeClick={onNodeClick}
        nodesDraggable
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        proOptions={proOptions}
        zoomOnDoubleClick
        nodeTypes={nodeTypes} // Pass nodeTypes to ReactFlow
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

function ReactFlowWrapper() {
  return (
    <ReactFlowProvider>
      <ReactFlowAutoLayout />
    </ReactFlowProvider>
  );
};

export default ReactFlowWrapper;
