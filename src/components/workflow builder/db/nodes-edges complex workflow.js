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
  {
    id: '2',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#4285F4',
      label: 'Google Docs',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/docs.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 200, y: 0 },
  },
  {
    id: '3',
    type: 'custom',
    data: {
      nodeType: 'internal-app',
      color: '#20B276',
      label: 'Router (Pabbly)',
      subtext: 'Split Into Routes',
      icon: '/assets/images/reactflow/router.svg',
      note: false,
    },
    position: { x: 400, y: 0 },
  },
  {
    id: '3b1',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#007392',
      label: 'MySql',
      subtext: 'Add New Row',
      icon: '/assets/images/reactflow/mysql.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 1800, y: 0 },
  },
  {
    id: '3b2',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#36B056',
      label: 'Google Sheets',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/sheets.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 2000, y: 0 },
  },
  {
    id: '4',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#00A67E',
      label: 'Chat Gpt',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/chatgpt.svg',
      note: false,
    },
    position: { x: 600, y: 0 },
  },
  {
    id: '5',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#D44638',
      label: 'Gmail',
      subtext: 'Incoming Messages',
      icon: '/assets/images/reactflow/mail.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 800, y: 0 },
  },
  {
    id: '5a',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#F8761F',
      label: 'Hubspot',
      subtext: 'Create Contact',
      icon: '/assets/images/reactflow/hubspot.svg',
      note: true,
    },
    position: { x: 1000, y: 0 },
  },
  {
    id: '6',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#F8761F',
      label: 'Hubspot',
      subtext: 'Create Contact',
      icon: '/assets/images/reactflow/hubspot.svg',
      note: true,
    },
    position: { x: 1000, y: 0 },
  },
  {
    id: '7',
    type: 'custom',
    data: {
      nodeType: 'internal-app',
      color: '#20B276',
      label: 'Router (Pabbly)',
      subtext: 'Split Into Routes',
      icon: '/assets/images/reactflow/router.svg',
      note: true,
    },
    position: { x: 1200, y: 0 },
  },
  {
    id: '8',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#F0C95C',
      label: 'Javascript',
      subtext: 'Extract Data',
      icon: '/assets/images/reactflow/js.svg',
      note: true,
    },
    position: { x: 1400, y: 0 },
  },
  {
    id: '9',
    type: 'custom',
    data: {
      nodeType: 'internal-app',
      color: '#20B276',
      label: 'Router (Pabbly)',
      subtext: 'Split Into Routes',
      icon: '/assets/images/reactflow/router.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 1600, y: 0 },
  },
  {
    id: '10',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#007392',
      label: 'MySql',
      subtext: 'Add New Row',
      icon: '/assets/images/reactflow/mysql.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 1800, y: 0 },
  },
  {
    id: '11',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#36B056',
      label: 'Google Sheets',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/sheets.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 2000, y: 0 },
  },
  {
    id: '12',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#4285F4',
      label: 'Google Docs',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/docs.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 2200, y: 0 },
  },
  {
    id: '13',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#4285F4',
      label: 'Google Docs',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/docs.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 2200, y: 0 },
  },
  {
    id: '13A',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#4285F4',
      label: 'Google Docs',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/docs.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 2200, y: 0 },
  },
  // sadhgkjhsdkjghsadkjgh
  {
    id: '14',
    type: 'custom',
    data: {
      nodeType: 'internal-app',
      color: '#20B276',
      label: 'Router (Pabbly)',
      subtext: 'Split Into Routes',
      icon: '/assets/images/reactflow/router.svg',
      note: true,
    },
    position: { x: 1200, y: 0 },
  },
  {
    id: '15',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#F0C95C',
      label: 'Javascript',
      subtext: 'Extract Data',
      icon: '/assets/images/reactflow/js.svg',
      note: true,
    },
    position: { x: 1400, y: 0 },
  },
  {
    id: '16',
    type: 'custom',
    data: {
      nodeType: 'internal-app',
      color: '#20B276',
      label: 'Router (Pabbly)',
      subtext: 'Split Into Routes',
      icon: '/assets/images/reactflow/router.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 1600, y: 0 },
  },
  {
    id: '17',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#007392',
      label: 'MySql',
      subtext: 'Add New Row',
      icon: '/assets/images/reactflow/mysql.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 1800, y: 0 },
  },
  {
    id: '18',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#36B056',
      label: 'Google Sheets',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/sheets.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 2000, y: 0 },
  },
  {
    id: '19',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#4285F4',
      label: 'Google Docs',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/docs.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 2200, y: 0 },
  },
  {
    id: '20',
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
  {
    id: '21',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#4285F4',
      label: 'Google Docs',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/docs.svg',
      errorIcon: 'bi:exclamation',
      note: true,
    },
    position: { x: 200, y: 0 },
  },
  // {
  //   id: '22',
  //   type: 'custom',
  //   data: {
  //     nodeType: 'internal-app',
  //     color: '#20B276',
  //     label: 'Router (Pabbly)',
  //     subtext: 'Split Into Routes',
  //     icon: '/assets/images/reactflow/router.svg',
  //     note: false,
  //   },
  //   position: { x: 400, y: 0 },
  // },
  // {
  //   id: '23',
  //   type: 'custom',
  //   data: {
  //     nodeType: 'external-app',
  //     color: '#007392',
  //     label: 'MySql',
  //     subtext: 'Add New Row',
  //     icon: '/assets/images/reactflow/mysql.svg',
  //     errorIcon: 'bi:exclamation',
  //     note: false,
  //   },
  //   position: { x: 1800, y: 0 },
  // },
  // {
  //   id: '24',
  //   type: 'custom',
  //   data: {
  //     nodeType: 'external-app',
  //     color: '#36B056',
  //     label: 'Google Sheets',
  //     subtext: 'Append Text to Doc...',
  //     icon: '/assets/images/reactflow/sheets.svg',
  //     errorIcon: 'bi:exclamation',
  //     note: true,
  //   },
  //   position: { x: 2000, y: 0 },
  // },
  {
    id: '25',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#00A67E',
      label: 'Chat Gpt',
      subtext: 'Append Text to Doc...',
      icon: '/assets/images/reactflow/chatgpt.svg',
      note: false,
    },
    position: { x: 600, y: 0 },
  },
  {
    id: '26',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#D44638',
      label: 'Gmail',
      subtext: 'Incoming Messages',
      icon: '/assets/images/reactflow/mail.svg',
      errorIcon: 'bi:exclamation',
      note: false,
    },
    position: { x: 800, y: 0 },
  },
  {
    id: '27',
    type: 'custom',
    data: {
      nodeType: 'external-app',
      color: '#F8761F',
      label: 'Hubspot',
      subtext: 'Create Contact',
      icon: '/assets/images/reactflow/hubspot.svg',
      note: true,
    },
    position: { x: 1000, y: 0 },
  },
];

const initialEdges = [
  {
    id: 'e12',
    source: '1', // Jotform
    target: '2', // Google Docs
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#0A1551',
    },
  },
  {
    id: 'e13',
    source: '2', // Google Docs
    target: '3', // Router (Pabbly)
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#4285F4',
    },
  },

  {
    id: 'e22a',
    source: '3', // Router (Pabbly)
    target: '4', // Chat Gpt
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e22b',
    source: '4', // Chat Gpt
    target: '5', // Gmail
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#74AA9C',
    },
  },
  {
    id: 'e55a',
    source: '5', // Chat Gpt
    target: '5a', // Gmail
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#74AA9C',
    },
  },
  {
    id: 'e33b1',
    source: '3', // Router (Pabbly)
    target: '3b1', // Chat Gpt
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '3b13b2',
    source: '3b1', // Router (Pabbly)
    target: '3b2', // Chat Gpt
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e36',
    source: '3', // Router (Pabbly)
    target: '6', // Hubspot
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e613',
    source: '6', // Router (Pabbly)
    target: '13', // Hubspot
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e2a7',
    source: '5a', // Hubspot
    target: '7', // Router (Pabbly)
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#F8761F',
    },
  },
  {
    id: 'e78',
    source: '7', // Router (Pabbly)
    target: '8', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e89',
    source: '8', // Javascript
    target: '9', // Router (Pabbly)
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#F0C95C',
    },
  },
  {
    id: 'e910',
    source: '9', // Router (Pabbly)
    target: '10', // MySql
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e911',
    source: '9', // Router (Pabbly)
    target: '11', // Google Sheets
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e712',
    source: '7', // Router (Pabbly)
    target: '12', // Google Docs
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: 'e713A',
    source: '7', // Router (Pabbly)
    target: '13A', // Google Docs
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  // sajhdglkjfhsadkjlghsdkajghkjs

  {
    id: '1314',
    source: '13', // Router (Pabbly)
    target: '14', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '1415',
    source: '14', // Router (Pabbly)
    target: '15', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '1516',
    source: '15', // Router (Pabbly)
    target: '16', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '1617',
    source: '16', // Router (Pabbly)
    target: '17', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '1618',
    source: '16', // Router (Pabbly)
    target: '18', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '1419',
    source: '14', // Router (Pabbly)
    target: '19', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '1620',
    source: '16', // Router (Pabbly)
    target: '20', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '2025',
    source: '20', // Router (Pabbly)
    target: '25', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '2526',
    source: '25', // Router (Pabbly)
    target: '26', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '1721',
    source: '17', // Router (Pabbly)
    target: '21', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  {
    id: '13A27',
    source: '13A', // Router (Pabbly)
    target: '27', // Javascript
    type: 'smoothstep',
    style: {
      strokeWidth: 2,
      stroke: '#20B276',
    },
  },
  
];

export { initialNodes, initialEdges };
