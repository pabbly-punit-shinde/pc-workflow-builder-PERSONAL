// export const edges = [
//   {
//     id: "1->2",
//     source: "1",
//     target: "2",
//   },
//   {
//     id: "1->3",
//     source: "1",
//     target: "3",
//   },
//   {
//     id: "4->5",
//     source: "4",
//     target: "5",
//   },
// ];

export const initialEdges = [
  {
    id: 'e12',
    source: '1',
    target: '2',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#0A1551',
    },
  },
  {
    id: 'e13',
    source: '2',
    target: '3',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#4285F4',
    },
  },
  {
    id: 'e22a',
    source: '3',
    target: '4',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  // Assign hardcoded colors to remaining edges
  {
    id: 'e22b',
    source: '4',
    target: '5',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#74AA9C',
    },
  },
  {
    id: 'e36',
    source: '3',
    target: '6',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e67',
    source: '6',
    target: '7',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#F8761F',
    },
  },
  {
    id: 'e78',
    source: '7',
    target: '8',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e89',
    source: '8',
    target: '9',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#F0C95C',
    },
  },
  {
    id: 'e910',
    source: '9',
    target: '10',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e911',
    source: '9',
    target: '11',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e712',
    source: '7',
    target: '12',
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
];