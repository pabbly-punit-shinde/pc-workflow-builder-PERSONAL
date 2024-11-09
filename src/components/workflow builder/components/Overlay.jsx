import React from 'react';

import { Box,Card, Modal,  Button,CardMedia, Typography,CardContent  } from '@mui/material';

const Overlay = ({ open, onClose, onDownload }) => {
  const screenSizes = [
    { label: 'Landscape', value: '1.91:1', thumbnail: '/assets/images/reactflow/overlay/Landscape.png' },
    { label: 'Square', value: '1:1', thumbnail: '/assets/images/reactflow/overlay/Square.png' },
    { label: 'Portrait', value: '4:5', thumbnail: '/assets/images/reactflow/overlay/Portrait.png' },
    
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
          maxWidth: 700,          
        //   height: '70vh',         
        //   maxHeight: '80vh',      
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          overflowY: 'auto',      
        }}
      >
        <Typography variant="h6" gutterBottom>
          Choose Screen Size for Snapshot
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(205px, 1fr))',
            gap: 2,
          }}
        >
          {screenSizes.map((size) => (
            <Card key={size.value} sx={{ display: 'flex', flexDirection: 'column', height: 300, padding:1 }}>
              <CardMedia
                component="img"
                image={size.thumbnail} 
                alt={size.label}
                sx={{ height: '50%', width: '100%', objectFit: 'contain', bgcolor:"#E5E5E5", borderRadius:'8px' }} // Ensures image fits within card
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {size.label}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Aspect Ratio: {size.value}
                </Typography>
              </CardContent>
              <Button variant='contained' color='primary' size="medium" onClick={() => handleDownload(size.value)} sx={{ margin: 'auto', marginBottom:2 }}>
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
