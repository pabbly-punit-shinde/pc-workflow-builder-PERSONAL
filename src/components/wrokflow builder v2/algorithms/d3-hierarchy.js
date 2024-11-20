import { getIncomers } from '@xyflow/react';
import { tree, stratify } from 'd3-hierarchy';

const getPosition = (x, y, direction) => {
  switch (direction) {
    case 'TB':
      return { x, y };
    case 'LR':
      return { x: y, y: x };
    case 'BT':
      return { x: -x, y: -y };
    case 'RL':
      return { x: -y, y: x };
    default:
      throw new Error(`Invalid direction: ${direction}`);
  }
};

const layout = tree()
  .separation(() => 1);

const rootNode = {
  id: 'd3-hierarchy-root',
  x: 0,
  y: 0,
  position: { x: 0, y: 0 },
  data: {},
};

const d3HierarchyLayout = async (nodes, edges, options) => {
  const isHorizontal = options.direction === 'RL' || options.direction === 'LR';

  const initialNodes = [];
  let maxNodeWidth = 0;
  let maxNodeHeight = 0;

  nodes.forEach((node) => {
    const nodeWithPosition = { ...node, ...node.position };

    initialNodes.push(nodeWithPosition);
    maxNodeWidth = Math.max(maxNodeWidth, node.measured?.width ?? 0);
    maxNodeHeight = Math.max(maxNodeHeight, node.measured?.height ?? 0);
  });

  const nodeSize = isHorizontal
    ? [maxNodeHeight + options.spacing[1], maxNodeWidth + options.spacing[0]]
    : [maxNodeWidth + options.spacing[0], maxNodeHeight + options.spacing[1]];
  layout.nodeSize(nodeSize);

  const getParentId = (node) => {
    if (node.id === rootNode.id) {
      return undefined;
    }

    const incomers = getIncomers(node, nodes, edges);
    return incomers[0]?.id || rootNode.id;
  };

  const hierarchy = stratify()
    .id((d) => d.id)
    .parentId(getParentId)([rootNode, ...initialNodes]);

  const root = layout(hierarchy);
  const layoutNodes = new Map();
  root.descendants().forEach((node) => {
    layoutNodes.set(node.id, node);
  });

  const nextNodes = nodes.map((node) => {
    const { x, y } = layoutNodes.get(node.id);
    const position = getPosition(x, y, options.direction);
    const offsetPosition = {
      x: position.x - (node.measured?.width ?? 0) / 2,
      y: position.y - (node.measured?.height ?? 0) / 2,
    };

    return { ...node, position: offsetPosition };
  });

  return { nodes: nextNodes, edges };
};

export default d3HierarchyLayout;
