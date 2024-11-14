import React from 'react';

import { Box, Card, Modal, Button, CardMedia, Typography, CardContent } from '@mui/material';

const Overlay = ({ open, onClose, onDownload }) => {
  const screenSizes = [
    {
      label: 'Landscape',
      value: '1.91:1',
      description:
        'Perfect for Facebook and LinkedIn posts, ensuring a wide view of your workflow.',
      thumbnail: '/assets/images/reactflow/overlay/Landscape.png',
    },
    {
      label: 'Square',
      value: '1:1',
      description:
        'Ideal for Instagram feeds and LinkedIn posts, offering a balanced view across all devices.',
      thumbnail: '/assets/images/reactflow/overlay/Square.png',
    },
    {
      label: 'Portrait',
      value: '4:5',
      description:
        'Optimized for Instagram and Facebook, giving a tall, detailed look at your workflow.',
      thumbnail: '/assets/images/reactflow/overlay/Portrait.png',
    },
  ];

  const handleDownload = (size) => {
    onDownload(size);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 850,
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6">
          Choose the Ideal Snapshot Size for Social Sharing
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" mb={2}>
          Pick the best snapshot format for Instagram, Facebook, or LinkedIn, ensuring your content
          is perfectly sized for any platform.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(205px, 1fr))',
            gap: 2,
          }}
        >
          {screenSizes.map((size) => (
            <Card
              key={size.value}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: 400,
                padding: 1,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Add smooth transition
                '&:hover': {
                  transform: 'scale(1.05)', // Slight zoom effect on hover
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)', // Increase shadow on hover
                },
              }}
            >
              <CardMedia
                component="img"
                image={size.thumbnail}
                alt={size.label}
                sx={{
                  height: '50%',
                  width: '100%',
                  objectFit: 'contain',
                  bgcolor: '#E5E5E5',
                  borderRadius: '8px',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="textPrimary" component="p">
                  {size.label} ({size.value})
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {size.description}
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                color="primary"
                size="medium"
                onClick={() => handleDownload(size.value)}
                sx={{
                  margin: 'auto',
                  marginBottom: 2,
                  '&:hover': {
                    variant: 'contained', // Change button to 'contained' on hover
                    bgcolor: 'primary.main', // Optional: Change background color on hover
                     color: "white"
                  },
                }}
              >
                Download
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default Overlay;
