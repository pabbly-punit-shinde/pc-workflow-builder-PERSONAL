import React from 'react';

import { Box,Card, Modal,  Button,CardMedia, Typography,CardContent  } from '@mui/material';

const Overlay = ({ open, onClose, onDownload }) => {
  const screenSizes = [
    { label: 'LinkedIn Landscape', value: '1200x628', thumbnail: 'https://brand.linkedin.com/apps/settings/wcm/designs/linkedin/katy/global/clientlibs/resources/img/default-share.png' },
    { label: 'LinkedIn Square', value: '1200x1200', thumbnail: 'https://brand.linkedin.com/apps/settings/wcm/designs/linkedin/katy/global/clientlibs/resources/img/default-share.png' },
    { label: 'LinkedIn Vertical', value: '720x900', thumbnail: 'https://brand.linkedin.com/apps/settings/wcm/designs/linkedin/katy/global/clientlibs/resources/img/default-share.png' },
    { label: 'Facebook Feed Desktop', value: '479x246', thumbnail: 'https://1000logos.net/wp-content/uploads/2016/11/Facebook-Logo-Meaning.jpg' },
    { label: 'Facebook Feed Mobile', value: '1080x1350', thumbnail: 'https://1000logos.net/wp-content/uploads/2016/11/Facebook-Logo-Meaning.jpg' },
    { label: 'Facebook Right Column', value: '1200x1200', thumbnail: 'https://1000logos.net/wp-content/uploads/2016/11/Facebook-Logo-Meaning.jpg' },
    { label: 'Facebook Marketplace', value: '1200x1200', thumbnail: 'https://1000logos.net/wp-content/uploads/2016/11/Facebook-Logo-Meaning.jpg' },
    { label: 'Facebook Stories', value: '1080x1920', thumbnail: 'https://1000logos.net/wp-content/uploads/2016/11/Facebook-Logo-Meaning.jpg' },
    { label: 'Instagram Stories', value: '1080x1920', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQZmxNImi_xQIAnxLmZT-eA9MHF55zIgpjXSdsutqWNFlYmIwGvNyX1jnHBEBGn5tEaY&usqp=CAU' },
    { label: 'Instagram Feed', value: '1080x1350', thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNQZmxNImi_xQIAnxLmZT-eA9MHF55zIgpjXSdsutqWNFlYmIwGvNyX1jnHBEBGn5tEaY&usqp=CAU' },
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
          maxWidth: 900,          
        //   height: '70vh',         
        //   maxHeight: '80vh',      
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          overflowY: 'auto',      
        }}
      >
        <Typography variant="h6" gutterBottom>
          Choose Screen Size for Snapshot:
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 2,
          }}
        >
          {screenSizes.map((size) => (
            <Card key={size.value} sx={{ display: 'flex', flexDirection: 'column', height: 200, padding:1 }}>
              <CardMedia
                component="img"
                image={size.thumbnail} 
                alt={size.label}
                sx={{ height: '20%', width: '100%', objectFit: 'cover' }} // Ensures image fits within card
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {size.label}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Size: {size.value}
                </Typography>
              </CardContent>
              <Button size="small" onClick={() => handleDownload(size.value)} sx={{ margin: 'auto' }}>
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
