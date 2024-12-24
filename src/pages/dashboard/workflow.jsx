import React from 'react';

import { CONFIG } from 'src/config-global';

import ComplexLayoutFlow from 'src/components/workflow builder complex/ComplexLayoutFlow';

// import WorkflowNameHeader from 'src/components/workflow builder/workflow-name-header';

// ----------------------------------------------------------------------

const metadata = { title: `Page two | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      {/* <WorkflowNameHeader /> */}
      {/* <LayoutFlow /> */}
      <ComplexLayoutFlow/>
      
    </>
  );
}
