const initialNodes = [
  {
    id: '1',
    type: 'custom',

    data: {
      nodeType: 'external-app',
      color: '#0A1551',
      label: 'Jotform',
      subtext: 'New Response',
      icon: '/assets/images/reactflow/StepsLogo/Jotform-Logo.svg',
      triggerIcon: 'ic:baseline-bolt',
      note: false,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#4285F4',
      label: 'Google Docs',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/StepsLogo/Gdocs-Logo.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 200, y: 0 }, // Adjusted position
  },
  {
    id: '3',
    type: 'custom',
    data: {
      nodeType: 'internal-app',
      color: '#20B276',
      label: 'Router (Pabbly)',
      subtext: 'Split Into Routes',
      icon: '/assets/images/reactflow/StepsLogo/Router-Logo.svg',
      note: false,
    },
    position: { x: 400, y: 0 }, // Adjusted position
  },
  {
    id: '4',
    type: 'custom',
    data: {
      // color: "#74AA9C",
      nodeType: 'external-app',
      color: '#00A67E',
      label: 'Chat Gpt',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/StepsLogo/ChatGpt-Logo.svg',
      note: false,
    },
    position: { x: 600, y: 0 }, // Adjusted position
  },
  {
    id: '5',
    type: 'custom',
    data: {
      // color: "#C75E56",
      nodeType: 'external-app',
      color: '#D44638',
      label: 'Gmail',
      subtext: 'Incoming Messages',
      icon: '/assets/images/reactflow/StepsLogo/Gmail-Logo.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 800, y: 0 }, // Adjusted position
  },
  {
    id: '6',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#F8761F',
      label: 'Hubspot',
      subtext: 'Create Contact',
      icon: '/assets/images/reactflow/StepsLogo/Hubspot-Logo.svg',
      note: true,
    },
    position: { x: 1000, y: 0 }, // Adjusted position
  },
  {
    id: '7',
    type: 'custom',
    data: {
      nodeType: 'internal-app',
      color: '#20B276',
      label: 'Router (Pabbly)',
      subtext: 'Split Into Routes',
      icon: '/assets/images/reactflow/StepsLogo/Router-Logo.svg',
      note: true,
    },
    position: { x: 1200, y: 0 }, // Adjusted position
  },
  {
    id: '8',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#F0C95C',
      label: 'Javascript',
      subtext: 'Extract Data',
      icon: '/assets/images/reactflow/StepsLogo/Js-Logo.svg',

      note: true,
    },
    position: { x: 1400, y: 0 }, // Adjusted position
  },
  {
    id: '9',
    type: 'custom',
    data: {
      nodeType: 'internal-app',
      color: '#20B276',
      label: 'Router (Pabbly)',
      subtext: 'Split Into Routes',
      icon: '/assets/images/reactflow/StepsLogo/Router-Logo.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 1600, y: 0 }, // Adjusted position
  },
  {
    id: '10',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#007392',
      label: 'MySql',
      subtext: 'Add New Row',
      icon: '/assets/images/reactflow/StepsLogo/MySql-Logo.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 1800, y: 0 }, // Adjusted position
  },
  {
    id: '11',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#36B056',
      label: 'Google Sheets',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/StepsLogo/Gsheets-Logo.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 2000, y: 0 }, // Adjusted position
  },
  {
    id: '12',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#4285F4',
      label: 'Google Docs',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/StepsLogo/Gdocs-Logo.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 2200, y: 0 }, // Adjusted position
  },
];

const initialEdges = [
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

export { initialNodes, initialEdges };
