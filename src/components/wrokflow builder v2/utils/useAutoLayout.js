import { useEffect } from 'react';
import {
  useReactFlow,
  useNodesInitialized,
  useStore,
} from '@xyflow/react';

import { getSourceHandlePosition, getTargetHandlePosition } from '../utils/utils';
import layoutAlgorithms from '../algorithms';

function useAutoLayout(options) {
  const { setNodes, setEdges } = useReactFlow();
  const nodesInitialized = useNodesInitialized();
  
  // Here we are storing a map of the nodes and edges in the flow.
  const elements = useStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    compareElements
  );

  useEffect(() => {
    // Only run the layout if nodes are initialized and not empty
    if (!nodesInitialized || elements.nodes.length === 0) {
      return;
    }

    const runLayout = async () => {
      const layoutAlgorithm = layoutAlgorithms[options.algorithm];
      
      // Clone nodes and edges
      const nodes = elements.nodes.map(node => ({ ...node }));
      const edges = elements.edges.map(edge => ({ ...edge }));

      const { nodes: nextNodes, edges: nextEdges } = await layoutAlgorithm(
        nodes,
        edges,
        options
      );

      for (const node of nextNodes) {
        node.style = { ...node.style, opacity: 1 };
        node.sourcePosition = getSourceHandlePosition(options.direction);
        node.targetPosition = getTargetHandlePosition(options.direction);
      }

      for (const edge of edges) {
        edge.style = { ...edge.style, opacity: 1 };
      }

      setNodes(nextNodes);
      setEdges(nextEdges);
    };

    runLayout();
  }, [nodesInitialized, elements, options, setNodes, setEdges]);
}

export default useAutoLayout;

function compareElements(xs, ys) {
  return (
    compareNodes(xs.nodes, ys.nodes) && compareEdges(xs.edges, ys.edges)
  );
}

function compareNodes(xs, ys) {
  // Check if the number of nodes is different
  if (xs.length !== ys.length) return false;

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    const y = ys[i];

    // Node doesn't exist in the next state
    if (!y) return false;
    // Avoid layout changes during resizing or dragging
    if (x.resizing || x.dragging) return true;
    if (
      x.measured?.width !== y.measured?.width ||
      x.measured?.height !== y.measured?.height
    ) {
      return false;
    }
  }

  return true;
}

function compareEdges(xs, ys) {
  // Check if the number of edges is different
  if (xs.length !== ys.length) return false;

  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    const y = ys[i];

    if (x.source !== y.source || x.target !== y.target) return false;
    if (x?.sourceHandle !== y?.sourceHandle) return false;
    if (x?.targetHandle !== y?.targetHandle) return false;
  }

  return true;
}
