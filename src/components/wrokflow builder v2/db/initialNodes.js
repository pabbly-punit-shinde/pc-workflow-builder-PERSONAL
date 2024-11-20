// export const nodes = [
//   {
//     id: "1",
//     data: { label: "Node 1" },
//     position: { x: 0, y: 0 },
//   },
//   {
//     id: "2",
//     data: { label: "Node 2" },
//     position: { x: 0, y: 0 },
//   },
//   {
//     id: "3",
//     data: { label: "Node 3" },
//     position: { x: 0, y: 0 },
//   },
//   {
//     id: "4",
//     data: { label: "Node 4" },
//     position: { x: 0, y: 0 },
//   },
//   {
//     id: "5",
//     data: { label: "Node 5" },
//     position: { x: 0, y: 0 },
//   },
// ];

export const initialNodes = [
  {
    id: "1",
    type: "custom",

    data: {
      nodeType: "external-app",
      color: "#0A1551",
      label: "Jotform",
      subtext: "New Response",
      icon: "/assets/images/reactflow/StepsLogo/Jotform-Logo.svg",
      triggerIcon: "ic:baseline-bolt",
      note: false,
    },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "custom",
    data: {
      nodeType: "external-app",
      color: "#4285F4",
      label: "Google Docs",
      subtext: "Append Text to Doc...",
      icon: "/assets/images/reactflow/StepsLogo/Gdocs-Logo.svg",
      errorIcon: "bi:exclamation",
      note: true,
    },
    position: { x: 200, y: 0 }, // Adjusted position
  },
  {
    id: "3",
    type: "custom",
    data: {
      nodeType: "internal-app",
      color: "#20B276",
      label: "Router (Pabbly)",
      subtext: "Split Into Routes",
      icon: "/assets/images/reactflow/StepsLogo/Router-Logo.svg",
      note: false,
    },
    position: { x: 400, y: 0 }, // Adjusted position
  },
  {
    id: "4",
    type: "custom",
    data: {
      // color: "#74AA9C",
      nodeType: "external-app",
      color: "#00A67E",
      label: "Chat Gpt",
      subtext: "Append Text to Doc...",
      icon: "/assets/images/reactflow/StepsLogo/ChatGpt-Logo.svg",
      note: false,
    },
    position: { x: 600, y: 0 }, // Adjusted position
  },
  {
    id: "5",
    type: "custom",
    data: {
      // color: "#C75E56",
      nodeType: "external-app",
      color: "#D44638",
      label: "Gmail",
      subtext: "Incoming Messages",
      icon: "/assets/images/reactflow/StepsLogo/Gmail-Logo.svg",
      errorIcon: "bi:exclamation",
      note: false,
    },
    position: { x: 800, y: 0 }, // Adjusted position
  },
  {
    id: "6",
    type: "custom",
    data: {
      nodeType: "external-app",
      color: "#F8761F",
      label: "Hubspot",
      subtext: "Create Contact",
      icon: "/assets/images/reactflow/StepsLogo/Hubspot-Logo.svg",
      note: true,
    },
    position: { x: 1000, y: 0 }, // Adjusted position
  },
  {
    id: "7",
    type: "custom",
    data: {
      nodeType: "internal-app",
      color: "#20B276",
      label: "Router (Pabbly)",
      subtext: "Split Into Routes",
      icon: "/assets/images/reactflow/StepsLogo/Router-Logo.svg",
      note: true,
    },
    position: { x: 1200, y: 0 }, // Adjusted position
  },
  {
    id: "8",
    type: "custom",
    data: {
      nodeType: "external-app",
      color: "#F0C95C",
      label: "Javascript",
      subtext: "Extract Data",
      icon: "/assets/images/reactflow/StepsLogo/Js-Logo.svg",

      note: true,
    },
    position: { x: 1400, y: 0 }, // Adjusted position
  },
  {
    id: "9",
    type: "custom",
    data: {
      nodeType: "internal-app",
      color: "#20B276",
      label: "Router (Pabbly)",
      subtext: "Split Into Routes",
      icon: "/assets/images/reactflow/StepsLogo/Router-Logo.svg",
      errorIcon: "bi:exclamation",
      note: false,
    },
    position: { x: 1600, y: 0 }, // Adjusted position
  },
  {
    id: "10",
    type: "custom",
    data: {
      nodeType: "external-app",
      color: "#007392",
      label: "MySql",
      subtext: "Add New Row",
      icon: "/assets/images/reactflow/StepsLogo/MySql-Logo.svg",
      errorIcon: "bi:exclamation",
      note: false,
    },
    position: { x: 1800, y: 0 }, // Adjusted position
  },
  {
    id: "11",
    type: "custom",
    data: {
      nodeType: "external-app",
      color: "#36B056",
      label: "Google Sheets",
      subtext: "Append Text to Doc...",
      icon: "/assets/images/reactflow/StepsLogo/Gsheets-Logo.svg",
      errorIcon: "bi:exclamation",
      note: true,
    },
    position: { x: 2000, y: 0 }, // Adjusted position
  },
  {
    id: "12",
    type: "custom",
    data: {
      nodeType: "external-app",
      color: "#4285F4",
      label: "Google Docs",
      subtext: "Append Text to Doc...",
      icon: "/assets/images/reactflow/StepsLogo/Gdocs-Logo.svg",
      errorIcon: "bi:exclamation",
      note: true,
    },
    position: { x: 2200, y: 0 }, // Adjusted position
  },
];
