const initialNodes = [
  {
    id: '1',
    type: 'custom',

    data: {
      nodeType: 'external-app',
      color: '#0A1551',
      label: 'Jotform',
      subtext: 'New Response',
      icon: '/assets/images/reactflow/Jotform.svg',
      triggerIcon: 'ic:baseline-bolt',
      note: false,
    },
    position: { x: 0, y: 0 },
  },
];

const initialEdges = [];

export { initialNodes, initialEdges };
