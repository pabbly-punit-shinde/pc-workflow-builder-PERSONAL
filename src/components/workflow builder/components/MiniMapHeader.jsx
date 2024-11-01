// MiniMapHeader.js
import React from 'react';

import { Box } from '@mui/material';

const MiniMapHeader = ({ title }) => (
  <Box
    sx={{
      backgroundColor: '#f0f0f0',
      padding: '8px 16px',
      borderBottom: '1px solid #ccc',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      fontWeight: 'bold',
    }}
  >
    {title}
  </Box>
);

export default MiniMapHeader;
