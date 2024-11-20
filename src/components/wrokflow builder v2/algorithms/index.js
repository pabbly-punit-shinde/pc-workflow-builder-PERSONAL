import elk from './elk';
import dagre from './dagre';
import d3Hierarchy from './d3-hierarchy';

// The layout direction (T = top, R = right, B = bottom, L = left, TB = top to bottom, ...)
const Direction = {
  TB: 'TB',
  LR: 'LR',
  RL: 'RL',
  BT: 'BT',
};

// Options for layout algorithms
const LayoutAlgorithmOptions = {
  direction: Direction.TB,
  spacing: [50, 50], // Example default spacing
};

// Layout Algorithm function signature
const LayoutAlgorithm = async (nodes, edges, options) => 
  // Example structure: Replace with actual logic from imported algorithms
   ({
    nodes: [], // Updated nodes after layout
    edges: [], // Updated edges after layout
  })
;

// Exporting the layout algorithms as an object
const layoutAlgorithms = {
  dagre,
  'd3-hierarchy': d3Hierarchy,
  elk,
};

// Export all relevant objects and utilities
export default layoutAlgorithms;
export { Direction, LayoutAlgorithm, LayoutAlgorithmOptions };
