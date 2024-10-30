// import React, { useState, useEffect, useCallback } from 'react';

// import {
//   Box,
//   Chip,
//   List,
//   Avatar,
//   Switch,
//   Popover,
//   Divider,
//   Tooltip,
//   ListItem,
//   TextField,
//   Accordion,
//   Typography,
//   Autocomplete,
//   ListItemText,
//   InputAdornment,
//   FormHelperText,
//   AccordionSummary,
//   AccordionDetails,
//   FormControlLabel,
// } from '@mui/material';

// import { Iconify } from 'src/components/iconify';

// export default function InsertDataField() {
//   const [tags, setTags] = useState([]);
//   const [tagInput, setTagInput] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchInput, setSearchInput] = useState('');
//   const [popoverPosition, setPopoverPosition] = useState('bottom');
//   const [popoverMaxHeight, setPopoverMaxHeight] = useState(300); // Default max height for popover

//   // Use useCallback to memoize adjustPopoverPosition
//   const adjustPopoverPosition = useCallback(() => {
//     if (!anchorEl) return;

//     const viewportHeight = window.innerHeight;
//     const rect = anchorEl.getBoundingClientRect();

//     const spaceBelow = viewportHeight - rect.bottom; // Space below the anchor
//     const spaceAbove = rect.top; // Space above the anchor

//     // Set the maximum height based on available space
//     if (spaceBelow > spaceAbove) {
//       setPopoverMaxHeight(Math.min(spaceBelow - 20, 400)); // Open downwards
//       setPopoverPosition('bottom');
//     } else {
//       setPopoverMaxHeight(Math.min(spaceAbove - 20, 400)); // Open upwards
//       setPopoverPosition('top');
//     }
//   }, [anchorEl]);

//   // Effect to control body scroll when Popover is open
//   useEffect(() => {
//     if (anchorEl) {
//       document.body.style.overflow = 'hidden'; // Disable body scroll
//       adjustPopoverPosition(); // Adjust popover position on open
//     } else {
//       document.body.style.overflow = ''; // Re-enable body scroll
//     }

//     return () => {
//       document.body.style.overflow = ''; // Ensure scroll is reset on unmount
//     };
//   }, [anchorEl, adjustPopoverPosition]);

//   const handleAddTag = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClosePopover = () => {
//     setAnchorEl(null);
//   };

//   const handleSelectAccordionContent = (content) => {
//     // Add selected content to tags without checking for duplicates
//     setTags([...tags, content]);
//     handleClosePopover();
//   };

//   const open = Boolean(anchorEl);
//   const popoverId = open ? 'simple-popover' : undefined;

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Box display="flex" justifyContent="space-between" mr="6px" alignItems="center">
//         <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
//           Email Address (Required)
//         </Typography>
//         <FormControlLabel
//           control={<Switch name="small" size="small" />}
//           label="Map"
//           labelPlacement="start"
//         />
//       </Box>
//       <Autocomplete
//         multiple
//         freeSolo
//         options={[]}
//         value={tags}
//         onChange={(event, newValue) => setTags(newValue)}
//         inputValue={tagInput}
//         onInputChange={(event, newInputValue) => {
//           setTagInput(newInputValue);
//         }}
//         onKeyDown={(event) => {
//           if (event.key === 'Enter' && tagInput.trim()) {
//             setTags([...tags, tagInput.trim()]);
//             setTagInput('');
//             event.preventDefault();
//           }
//         }}
//         renderTags={(value, getTagProps) =>
//           value.map((option, index) => (
//             <Tooltip title={option} arrow placement="top">
//               <Chip
//                 variant="soft"
//                 color="info"
//                 size="small"
//                 label={option}
//                 style={{ minWidth: 'auto', width: 'auto' }}
//                 {...getTagProps({ index })}
//               />
//             </Tooltip>
//           ))
//         }
//         renderInput={(params) => (
//           <TextField
//             onClick={handleAddTag}
//             {...params}
//             variant="outlined"
//             size="large"
//             placeholder="+ Enter text or map data."
//             InputProps={{
//               ...params.InputProps,
//               endAdornment: <InputAdornment position="Start" />,
//             }}
//             sx={{
//               '& .MuiAutocomplete-inputRoot': {
//                 minHeight: 'auto',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'start',
//               },
//             }}
//           />
//         )}
//       />
//       {/* Popover that opens when the TextField is clicked */}
//       <Popover
//         id={popoverId}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClosePopover}
//         anchorOrigin={{
//           vertical: popoverPosition,
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: popoverPosition === 'bottom' ? 'top' : 'bottom',
//           horizontal: 'left',
//         }}
//         sx={{
//           '& .MuiPopover-paper': {
//             width: anchorEl ? anchorEl.clientWidth : 'auto',
//             maxHeight: popoverMaxHeight, // Set dynamic max height based on available space
//             overflowY: 'auto', // Enable scrolling inside the popover
//           },
//         }}
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography variant="subtitle1" sx={{ mb: 1 }}>
//             Insert Data from Previous Step
//           </Typography>

//           {/* Search field inside the Popover */}
//           <TextField
//             fullWidth
//             size="small"
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Search & Map Data..."
//             variant="outlined"
//           />

//           {/* First Accordion */}
//           <Accordion sx={{ mt: '10px' }}>
//             <AccordionSummary
//               expandIcon={<Iconify icon="jam:chevron-down" width={16} />}
//               aria-controls="panel1a-content"
//               id="panel1a-header"
//             >
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Avatar
//                   variant="circle"
//                   src="https://d23j5fl26hha5c.cloudfront.net/images/1590489835035_1590663162-google-sheets-64.png"
//                   sx={{
//                     p: 1,
//                     width: 36,
//                     height: 36,
//                     bgcolor: 'background.neutral',
//                     border: '1px solid #D4E2FF',
//                   }}
//                 />{' '}
//                 <Typography fontWeight={700}>
//                   {' '}
//                   1. Webhook by Pabbly: Catch Webhook (Preferred){' '}
//                 </Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               {/* Accordion 1 Content */}
//               {/* <Typography variant="body2" gutterBottom>
//                 Select content from the list to add as a tag:
//               </Typography> */}
//               <List>
//                 <Divider />
//                 <ListItem
//                   button
//                   onClick={() =>
//                     handleSelectAccordionContent(
//                       '1. Text : And we are going to dictate some text so I just met a person named as demo Pabbly he is a business owner of Xyz company and he has a email address at demo@xyzcompany.com now let me tell you his mobile number is 1122334455'
//                     )
//                   }
//                 >
//                   <ListItemText primary="1. Text : And we are going to dictate some text so I just met a person named as demo Pabbly he is a business owner of Xyz company and he has a email address at demo@xyzcompany.com now let me tell you his mobile number is 1122334455" />
//                 </ListItem>
//                 <Divider />

//                 <ListItem button onClick={() => handleSelectAccordionContent('Option 2')}>
//                   <ListItemText primary="Option 2" />
//                 </ListItem>
//                 <Divider />

//                 <ListItem button onClick={() => handleSelectAccordionContent('Option 3')}>
//                   <ListItemText primary="Option 3" />
//                 </ListItem>
//               </List>
//             </AccordionDetails>
//           </Accordion>

//           {/* Second Accordion */}
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<Iconify icon="jam:chevron-down" width={16} />}
//               aria-controls="panel2a-content"
//               id="panel2a-header"
//             >
//               <Box display="flex" alignItems="center" gap={1}>
//                 <Avatar
//                   variant="circle"
//                   src="https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1663756758-OpenAI.png"
//                   sx={{
//                     p: 1,
//                     width: 36,
//                     height: 36,
//                     bgcolor: 'background.neutral',
//                     border: '1px solid #D4E2FF',
//                   }}
//                 />{' '}
//                 <Typography fontWeight={700}>
//                   {' '}
//                   2. OpenAI (ChatGPT, DALL-E, Whisper): ChatGPT{' '}
//                 </Typography>
//               </Box>
//             </AccordionSummary>
//             <AccordionDetails>
//               {/* Accordion 1 Content */}
//               {/* <Typography variant="body2" gutterBottom>
//                 Select content from the list to add as a tag:
//               </Typography> */}
//               <List>
//                 <Divider />
//                 <ListItem
//                   button
//                   onClick={() =>
//                     handleSelectAccordionContent(
//                       '1. Text : And we are going to dictate some text so I just met a person named as demo Pabbly he is a business owner of Xyz company and he has a email address at demo@xyzcompany.com now let me tell you his mobile number is 1122334455'
//                     )
//                   }
//                 >
//                   <ListItemText primary="1. Text : And we are going to dictate some text so I just met a person named as demo Pabbly he is a business owner of Xyz company and he has a email address at demo@xyzcompany.com now let me tell you his mobile number is 1122334455" />
//                 </ListItem>
//                 <Divider />

//                 <ListItem button onClick={() => handleSelectAccordionContent('Option 2')}>
//                   <ListItemText primary="Option 2" />
//                 </ListItem>
//                 <Divider />

//                 <ListItem button onClick={() => handleSelectAccordionContent('Option 3')}>
//                   <ListItemText primary="Option 3" />
//                 </ListItem>
//               </List>
//             </AccordionDetails>
//           </Accordion>
//         </Box>
//       </Popover>
//       <FormHelperText sx={{ ml: '13px' }}>Enter the email address.</FormHelperText>
//     </Box>
//   );
// }

import React, { useState, useEffect, useCallback } from 'react';

import {
  Box,
  Chip,
  List,
  Avatar,
  Switch,
  Popover,
  Divider,
  Tooltip,
  ListItem,
  TextField,
  Accordion,
  Typography,
  Autocomplete,
  ListItemText,
  InputAdornment,
  FormHelperText,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export default function InsertDataField() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [popoverPosition, setPopoverPosition] = useState('bottom');
  const [popoverMaxHeight, setPopoverMaxHeight] = useState(300);

  const adjustPopoverPosition = useCallback(() => {
    if (!anchorEl) return;

    const viewportHeight = window.innerHeight;
    const rect = anchorEl.getBoundingClientRect();

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow > spaceAbove) {
      setPopoverMaxHeight(Math.min(spaceBelow - 20, 400));
      setPopoverPosition('bottom');
    } else {
      setPopoverMaxHeight(Math.min(spaceAbove - 20, 400));
      setPopoverPosition('top');
    }
  }, [anchorEl]);

  useEffect(() => {
    if (anchorEl) {
      document.body.style.overflow = 'hidden';
      adjustPopoverPosition();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [anchorEl, adjustPopoverPosition]);

  const handleAddTag = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleSelectAccordionContent = (content) => {
    setTags(prevTags => {
      const customTags = prevTags.filter(tag => tag.type === 'custom');
      const newTags = prevTags.filter(tag => tag.type !== 'custom');
      newTags.push({ type: 'tag', value: content });
      return [...newTags, ...customTags];
    });
    handleClosePopover();
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      setTags(prevTags => [...prevTags, { type: 'custom', value: inputValue.trim() }]);
      setInputValue('');
      event.preventDefault();
    }
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" mr="6px" alignItems="center">
        <Typography fontSize={14} fontWeight={600} mb="8px" ml="13px">
          Email Address (Required)
        </Typography>
        <FormControlLabel
          control={<Switch name="small" size="small" />}
          label="Map"
          labelPlacement="start"
        />
      </Box>
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={tags}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={(event, newValue) => {
          const customTags = newValue.filter(tag => tag.type === 'custom');
          const otherTags = newValue.filter(tag => tag.type !== 'custom');
          setTags([...otherTags, ...customTags]);
        }}
        onKeyDown={handleKeyDown}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Tooltip key={index} title={option.value} arrow placement="top">
              <Chip
                variant="soft"
                color={option.type === 'custom' ? 'default' : 'info'}
                size="small"
                label={option.value}
                style={{ minWidth: 'auto', width: 'auto' }}
                {...getTagProps({ index })}
              />
            </Tooltip>
          ))
        }
        renderInput={(params) => (
          <TextField
            onClick={handleAddTag}
            {...params}
            variant="outlined"
            size="large"
            placeholder="+ Enter text or map data."
            InputProps={{
              ...params.InputProps,
              endAdornment: <InputAdornment position="Start" />,
            }}
            sx={{
              '& .MuiAutocomplete-inputRoot': {
                minHeight: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
              },
            }}
          />
        )}
      />
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: popoverPosition,
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: popoverPosition === 'bottom' ? 'top' : 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            width: anchorEl ? anchorEl.clientWidth : 'auto',
            maxHeight: popoverMaxHeight,
            overflowY: 'auto',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Insert Data from Previous Step
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search & Map Data..."
            variant="outlined"
          />
          <Accordion sx={{ mt: '10px' }}>
            <AccordionSummary
              expandIcon={<Iconify icon="jam:chevron-down" width={16} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  variant="circle"
                  src="https://d23j5fl26hha5c.cloudfront.net/images/1590489835035_1590663162-google-sheets-64.png"
                  sx={{
                    p: 1,
                    width: 36,
                    height: 36,
                    bgcolor: 'background.neutral',
                    border: '1px solid #D4E2FF',
                  }}
                />
                <Typography fontWeight={700}>
                  1. Webhook by Pabbly: Catch Webhook (Preferred)
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <Divider />
                <ListItem
                  button
                  onClick={() =>
                    handleSelectAccordionContent(
                      '1. Text : And we are going to dictate some text so I just met a person named as demo Pabbly he is a business owner of Xyz company and he has a email address at demo@xyzcompany.com now let me tell you his mobile number is 1122334455'
                    )
                  }
                >
                  <ListItemText primary="1. Text : And we are going to dictate some text so I just met a person named as demo Pabbly he is a business owner of Xyz company and he has a email address at demo@xyzcompany.com now let me tell you his mobile number is 1122334455" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => handleSelectAccordionContent('Option 2')}>
                  <ListItemText primary="Option 2" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => handleSelectAccordionContent('Option 3')}>
                  <ListItemText primary="Option 3" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<Iconify icon="jam:chevron-down" width={16} />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  variant="circle"
                  src="https://d23j5fl26hha5c.cloudfront.net/images/1642563579878_1663756758-OpenAI.png"
                  sx={{
                    p: 1,
                    width: 36,
                    height: 36,
                    bgcolor: 'background.neutral',
                    border: '1px solid #D4E2FF',
                  }}
                />
                <Typography fontWeight={700}>
                  2. OpenAI (ChatGPT, DALL-E, Whisper): ChatGPT
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <Divider />
                <ListItem
                  button
                  onClick={() =>
                    handleSelectAccordionContent(
                      '1. Text : And we are going to dictate some text so I just met a person named as demo Pabbly he is a business owner of Xyz company and he has a email address at demo@xyzcompany.com now let me tell you his mobile number is 1122334455'
                    )
                  }
                >
                  <ListItemText primary="1. Text : And we are going to dictate some text so I just met a person named as demo Pabbly he is a business owner of Xyz company and he has a email address at demo@xyzcompany.com now let me tell you his mobile number is 1122334455" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => handleSelectAccordionContent('Option 2')}>
                  <ListItemText primary="Option 2" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => handleSelectAccordionContent('Option 3')}>
                  <ListItemText primary="Option 3" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Popover>
      <FormHelperText sx={{ ml: '13px' }}>Enter the email address.</FormHelperText>
    </Box>
  );
}