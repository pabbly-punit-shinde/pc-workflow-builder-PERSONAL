import { MarkerType } from '@xyflow/react';

export const generateGradients = (nodes, edges, isDashed, direction = 'TB') => {
  const gradients = [];

  edges.forEach((edge, index) => {
    const sourceNode = nodes.find((node) => node.id === edge.source);
    const targetNode = nodes.find((node) => node.id === edge.target);
    const gradientId = `gradient${index}`;

    const dx = targetNode.position.x - sourceNode.position.x;
    const dy = targetNode.position.y - sourceNode.position.y;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    let gradientCoords;
    if (absDx > absDy) {
      gradientCoords =
        dx >= 0
          ? { x1: '0', y1: '0', x2: '1', y2: '0' }
          : { x1: '1', y1: '0', x2: '0', y2: '0' };
    } else {
      gradientCoords =
        dy >= 0
          ? { x1: '0', y1: '0', x2: '0', y2: '1' }
          : { x1: '0', y1: '1', x2: '0', y2: '0' };
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
      strokeWidth: 3,
      opacity: 0.75,
      strokeDasharray: isDashed ? '5,5' : '0',
    };
    edge.markerEnd = {
      type: MarkerType.ArrowClosed,
      color: targetNode.data.color,
    };
  });

  return gradients;
};
