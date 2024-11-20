import Elk from 'elkjs/lib/elk.bundled';

const elk = new Elk();

function getDirection(direction) {
  switch (direction) {
    case 'TB':
      return 'DOWN';
    case 'LR':
      return 'RIGHT';
    case 'BT':
      return 'UP';
    case 'RL':
      return 'LEFT';
    default:
      return "DOWN";
  }
}

const elkLayout = async (nodes, edges, options) => {
  const graph = {
    id: 'elk-root',
    layoutOptions: {
      'elk.algorithm': 'mrtree',
      'elk.direction': getDirection(options.direction),
      'elk.spacing.nodeNode': `${options.spacing[0]}`,
    },
    children: nodes.map((node) => ({
      id: node.id,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  // Perform the layout and map the resulting positions
  const root = await elk.layout(graph);
  const layoutNodes = new Map();
  root.children?.forEach((node) => {
    layoutNodes.set(node.id, node);
  });

  const nextNodes = nodes.map((node) => {
    const elkNode = layoutNodes.get(node.id);
    const position = { x: elkNode.x, y: elkNode.y };

    return {
      ...node,
      position,
    };
  });

  return { nodes: nextNodes, edges };
};

export default elkLayout;
