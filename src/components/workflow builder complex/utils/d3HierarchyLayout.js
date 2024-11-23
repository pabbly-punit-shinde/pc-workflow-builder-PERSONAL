import { tree, hierarchy } from 'd3-hierarchy';

export const getD3HierarchyLayout = (nodes, edges, direction = 'TB') => {
  // The function logic remains unchanged
  const nodeMap = nodes.reduce((acc, node) => {
    acc[node.id] = { ...node, children: [] };
    return acc;
  }, {});

  edges.forEach((edge) => {
    const sourceNode = nodeMap[edge.source];
    const targetNode = nodeMap[edge.target];
    if (sourceNode && targetNode) {
      sourceNode.children.push(targetNode);
    }
  });

  const rootNode = nodes.find((node) => !edges.some((edge) => edge.target === node.id));
  if (!rootNode) {
    console.error('No root node found for layout. Ensure graph is a tree or DAG.');
    return { nodes, edges };
  }

  const root = hierarchy(nodeMap[rootNode.id]);

  const treeLayout = tree()
    .nodeSize(direction === 'LR' ? [200, 200] : [200, 150])
    .separation((a, b) => (a.parent === b.parent ? 1.5 : 2));

  treeLayout(root);

  const newNodes = nodes.map((node) => {
    const layoutNode = root.descendants().find((n) => n.data.id === node.id);
    return {
      ...node,
      position: {
        x: (direction === 'LR' ? layoutNode.y : layoutNode.x) + Math.random() * 0.01,
        y: (direction === 'LR' ? layoutNode.x : layoutNode.y) + Math.random() * 0.01,
      },
    };
  });

  return { nodes: newNodes, edges };
};
