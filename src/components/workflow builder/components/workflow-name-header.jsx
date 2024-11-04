import React, { useRef, useState, useEffect } from 'react';

import {
  Box,
  Alert,
  Switch,
  Button,
  Tooltip,
  Divider,
  MenuList,
  MenuItem,
  Snackbar,
  useTheme,
  TextField,
  // Typography,
  useMediaQuery,
  FormControlLabel,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { RenamePopover } from 'src/sections/popovers/rename';
import { SharePopover } from 'src/sections/popovers/share-popover';
import { DeletePopover } from 'src/sections/popovers/delete-popover';
import { AddNotePopover } from 'src/sections/popovers/add-note-popover';
import { EditLogPopover } from 'src/sections/popovers/edit-log-popover';
import { MoveToFolderPopover } from 'src/sections/popovers/move-to-folder-popover';
import { AddTeamMembersPopover } from 'src/sections/popovers/add-team-members-popover';
import { AutoReExecutionSettingsPopover } from 'src/sections/popovers/auto-re-execution-popover';

export default function WorkflowNameHeader() {
  const [workflowName, setWorkflowName] = useState('Workflow Name');
  const [folderName, setFolderName] = useState('Facebook Ads Automation Folder');
  const [textFieldWidth, setTextFieldWidth] = useState(80);
  const textFieldRef = useRef(null);
  const hiddenTextRef = useRef(null);
  const popover = usePopover();
  const theme = useTheme();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setWorkflowName(newValue);
  };

  const displayValue =
    workflowName.length > 100 ? `${workflowName.slice(0, 100)}...` : workflowName;

  const truncateFolderName = (name, maxLength = 20) => {
    if (typeof name !== 'string') {
      return '';
    }
    return name.length > maxLength ? `${name.slice(0, maxLength - 3)}...` : name;
  };
  const displayFolderName = truncateFolderName(folderName);

  useEffect(() => {
    if (hiddenTextRef.current) {
      const textWidth = hiddenTextRef.current.offsetWidth;
      const newWidth = Math.min(Math.max(100, textWidth), 750);
      setTextFieldWidth(newWidth);
    }
  }, [workflowName]);

  const addNotePopover = useBoolean();
  const renamePopover = useBoolean();
  const sharePopover = useBoolean();
  const addTeamMembersPopover = useBoolean();
  const moveToFolderPopover = useBoolean();
  const deletePopover = useBoolean();
  const editLogPopover = useBoolean();
  const autoReExecutionPopover = useBoolean();

  const handleAddNote = () => addNotePopover.onTrue();
  const handleRename = () => renamePopover.onTrue();
  const handleShare = () => sharePopover.onTrue();
  const handleAddTeamMembers = () => addTeamMembersPopover.onTrue();
  const handleMoveToFolder = () => moveToFolderPopover.onTrue();
  const handleDelete = () => deletePopover.onTrue();
  const handleEditLog = () => editLogPopover.onTrue();
  const handleAutoReExecution = () => autoReExecutionPopover.onTrue();

  const handleClone = () => {
    setSnackbarMessage('Workflow cloned successfully!');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(max-width:800px)');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: '#FFFFFF',
        width: '300px',
        padding: '1px',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(84, 95, 111, .16), 0 0 1px rgba(37, 45, 91, .04)',
      }}
    >
      <Box
        sx={{
          width: '100%',

          // maxWidth: '1456px',
          display: 'flex',
          justifyContent: 'space-between',
          // padding: '10px 16px',
          padding: '0 16px',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
        }}
      >
        <Box
          sx={{
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            minWidth: 0,
            flexShrink: 1,
            // marginRight: 2,
            marginBottom: { xs: 2, md: 0 },
            width: '90%',
            justifyContent: isMobile ? 'space-between' : 'flex-start',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {!isMobile && (
              <>
                <Box alignItems="center" gap={1} sx={{ display: 'flex' }} alignContent="center">
                  <Iconify icon="material-symbols:folder" />
                  <Tooltip title={folderName} arrow placement="top">
                    <Typography fontWeight="600">{displayFolderName}</Typography>
                  </Tooltip>
                </Box>
                <Iconify icon="iconoir:slash" />
              </>
            )} */}

            <Tooltip
              title={workflowName}
              arrow
              placement="top"

              // PopperProps={{
              //   sx: {
              //     '& .MuiTooltip-tooltip': {
              //       maxWidth: 'none',
              //       whiteSpace: 'normal',
              //       wordBreak: 'break-word',
              //       overflowWrap: 'break-word',
              //       hyphens: 'auto',
              //       textAlign: 'center',
              //       padding: '8px 12px',
              //       fontSize: '12px',
              //       lineHeight: 1.4,
              //       fontWeight: '400',
              //     },
              //     '& .MuiTooltip-arrow': {
              //       left: '50% !important',
              //       transform: 'translateX(-50%) !important',
              //     },
              //   },
              // }}
            >
              <Box
                sx={{
                  width: 'auto',
                  maxWidth: isMobile ? 'calc(100% - 40px)' : '1000px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  position: 'relative',
                  textAlign: 'left',
                  paddingLeft: '0',
                  gap: 2,
                }}
              >
                <TextField
                  variant="standard"
                  required
                  value={displayValue}
                  onChange={handleChange}
                  InputProps={{
                    style: {
                      fontWeight: '600',
                      fontSize: '18px',
                      width: `${textFieldWidth}px`,
                      textAlign: 'left',
                      paddingLeft: '0',
                    },
                    inputRef: textFieldRef,
                  }}
                  sx={{
                    '& .MuiInput-input': {
                      width: '100%',
                      minWidth: '100px',
                      maxWidth: '970px',
                      textAlign: 'left',
                      paddingLeft: '0',
                    },
                    '& .MuiInput-root': {
                      '&:before, &:after': {
                        left: '0',
                        display: 'none',
                      },
                    },
                  }}
                />
                {/* <Iconify
                  icon="solar:pen-bold"
                  width={20}
                  color="#1C252E"
                  // style={{ marginLeft: '10px', flexShrink: 0 }}
                /> */}
                <span
                  ref={hiddenTextRef}
                  style={{
                    visibility: 'hidden',
                    position: 'absolute',
                    whiteSpace: 'pre',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  {displayValue}
                </span>
              </Box>
            </Tooltip>
          </Box>

          <CustomPopover
            open={popover.open}
            anchorEl={popover.anchorEl}
            onClose={popover.onClose}
            slotProps={{ arrow: { placement: 'left-top' } }}
          >
            <MenuList>
              <MenuItem onClick={handleAddNote}>
                <Iconify icon="gg:notes" />
                Add Note
              </MenuItem>
              <MenuItem onClick={handleRename}>
                <Iconify icon="solar:pen-bold" />
                Rename
              </MenuItem>
              <MenuItem onClick={handleClone}>
                <Iconify sx={{ height: '16.67px' }} icon="fa6-solid:clone" />
                Clone
              </MenuItem>
              <MenuItem onClick={handleShare}>
                <Iconify icon="solar:share-bold" />
                Share
              </MenuItem>
              <MenuItem onClick={() => window.open('https://connect.pabbly.com/team_members')}>
                <Iconify icon="solar:user-plus-bold" />
                Add Team Member
              </MenuItem>
              <MenuItem onClick={handleMoveToFolder}>
                <Iconify icon="material-symbols:drive-file-move" />
                Move To Folder
              </MenuItem>
              <MenuItem onClick={() => window.open('https://connect.pabbly.com/task/history')}>
                <Iconify icon="material-symbols:history" />
                Workflow History
              </MenuItem>
              <MenuItem onClick={handleEditLog}>
                <Iconify icon="flowbite:edit-outline" sx={{ width: '20px', height: '20px' }} />
                Edit Log
              </MenuItem>
              <MenuItem onClick={handleAutoReExecution}>
                <Iconify icon="solar:restart-bold" />
                Auto Re-Execution Settings
              </MenuItem>
              <Divider style={{ borderStyle: 'dashed' }} />
              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <Iconify icon="solar:trash-bin-trash-bold" />
                Delete Workflow
              </MenuItem>
            </MenuList>
          </CustomPopover>
          <AddNotePopover
            open={addNotePopover.value}
            onClose={addNotePopover.onFalse}
            action={
              <Button variant="contained" color="primary">
                Add
              </Button>
            }
          />
          <RenamePopover open={renamePopover.value} onClose={renamePopover.onFalse} />
          <SharePopover open={sharePopover.value} onClose={sharePopover.onFalse} />
          <AddTeamMembersPopover
            open={addTeamMembersPopover.value}
            onClose={addTeamMembersPopover.onFalse}
          />
          <MoveToFolderPopover
            open={moveToFolderPopover.value}
            onClose={moveToFolderPopover.onFalse}
          />
          <DeletePopover
            open={deletePopover.value}
            onClose={deletePopover.onFalse}
            title="Do you really want to delete it ?"
            content="Workflow once deleted will be moved to trash folder"
            action={
              <Button variant="contained" color="error">
                Yes, delete it!
              </Button>
            }
          />
          <EditLogPopover
            open={editLogPopover.value}
            onClose={editLogPopover.onFalse}
            title="Workflow Edit Log"
            content="View workflow edit log for last 30 days."
            action={
              <Button variant="contained" color="primary">
                CLOSE
              </Button>
            }
          />
          <AutoReExecutionSettingsPopover
            open={autoReExecutionPopover.value}
            onClose={autoReExecutionPopover.onFalse}
          />
        </Box>
        <Box
          sx={{
            // bgcolor:'red',
            pl: 3,
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            gap: 2,
            alignSelf: { xs: 'flex-start', md: 'auto' },
          }}
        >
          <Tooltip title="Click to see options" arrow placement="top" disableInteractive>
            <Iconify
              width={20}
              color={popover.open ? 'inherit' : 'default'}
              onClick={popover.onOpen}
              icon="charm:menu-kebab"
              sx={{
                // width: 40,
                // height: 20,
                cursor: 'pointer',
                color: popover.open ? 'inherit' : 'inherit',
                '&:hover': {
                  color: '#1C252E',
                },
              }}
            />
          </Tooltip>
          <Tooltip title="Add Note" arrow placement="top" disableInteractive>
            <Iconify
              width={20}
              color={popover.open ? 'inherit' : 'default'}
              // onClick={popover.onOpen}
              icon="gg:notes"
              sx={{
                // width: 40,
                // height: 20,
                cursor: 'pointer',
                color: popover.open ? 'inherit' : 'inherit',
                '&:hover': {
                  color: '#1C252E',
                },
              }}
            />
          </Tooltip>
          <Tooltip title="Toggle workflow active or inactive" arrow placement="top" disableInteractive>
            <FormControlLabel control={<Switch name="normal" />} />
          </Tooltip>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          '& .MuiPaper-root': {
            boxShadow: '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
          },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
