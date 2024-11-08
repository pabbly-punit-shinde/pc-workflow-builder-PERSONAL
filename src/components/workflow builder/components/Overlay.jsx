import React from 'react';

import { Box, Modal, Button, Typography } from '@mui/material';

const Overlay = ({ open, onClose, onDownload }) => {
  const screenSizes = [
    // LinkedIn sizes
    { label: 'LinkedIn Landscape (1200x628)', value: '1200x628' },
    { label: 'LinkedIn Square (1200x1200)', value: '1200x1200' },
    { label: 'LinkedIn Vertical (720x900)', value: '720x900' },

    // Facebook sizes
    { label: 'Facebook Feed Desktop (479x246)', value: '479x246' },
    { label: 'Facebook Feed Mobile (1080x1350)', value: '1080x1350' },
    { label: 'Facebook Right Column (1200x1200)', value: '1200x1200' },
    { label: 'Facebook Marketplace (1200x1200)', value: '1200x1200' },
    { label: 'Facebook Stories (1080x1920)', value: '1080x1920' },

    // Instagram sizes
    { label: 'Instagram Stories (1080x1920)', value: '1080x1920' },
    { label: 'Instagram Feed (1080x1350)', value: '1080x1350' },
  ];

  const handleDownload = (size) => {
    // Logic to download based on size
    onDownload(size);
    onClose(); // Close overlay after download
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          backgroundColor: 'white',
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Choose Screen Size for Snapshot:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {screenSizes.map((size) => (
            <Button key={size.value} onClick={() => handleDownload(size.value)}>
              {size.label}
            </Button>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default Overlay;
