import dagre from '@dagrejs/dagre';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const dagreLayout = async (nodes, edges, options) => {
  dagreGraph.setGraph({
    rankdir: options.direction,
    nodesep: options.spacing[0],
    ranksep: options.spacing[1],
  });

  // Remove nodes from the dagre graph that are no longer in the react flow state
  const existingNodeIds = nodes.map((node) => node.id);

  dagreGraph.nodes().forEach((node) => {
    if (!existingNodeIds.includes(node)) {
      dagreGraph.removeNode(node);
    }
  });

  // Add nodes to the dagre graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    });

    // Uncomment the following lines if sub-flow layout is needed, but note the related issue:
    // Dagre currently has an open issue with sub-flows.
    // if (node.parentNode) {
    //   dagreGraph.setParent(node.id, node.parentNode);
    // }
  });

  // Add edges to the dagre graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Perform the layout
  dagre.layout(dagreGraph);

  // Map updated positions back to nodes
  const nextNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    const position = {
      x: x - (node.measured?.width ?? 0) / 2,
      y: y - (node.measured?.height ?? 0) / 2,
    };

    return { ...node, position };
  });

  return { nodes: nextNodes, edges };
};

export default dagreLayout;
