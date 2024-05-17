import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, Box, Typography, Select, MenuItem, IconButton, Avatar, Collapse } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoImage from "../assets/logo.png"

const CustomDrawer = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };
 

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <img src={LogoImage} alt="Logo" style={{ width: 150, marginBottom: 20 }} />
        <Select defaultValue="Project Name">
          <MenuItem value="Project Name">Project Name</MenuItem>
        </Select>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <List>
          <ListItem button onClick={() => handleNavigation('/dashboard')}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/workflow')}>
            <ListItemText primary="Workflows" />
          </ListItem>
          {['Executions', 'Ad hoc Execution', 'Schedules', 'Reports', 'Vault', 'Devices'].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem button onClick={handleSettingsClick}>
            <ListItemText primary="Settings" />
            {settingsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {['General', 'Account Settings', 'On-Prem Executor'].map((text) => (
                <ListItem button key={text} sx={{ pl: 4 }}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
          <Typography variant="body1">Help</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="Ramanan AR" src="/static/images/avatar/1.jpg" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2">Ramanan AR</Typography>
            <Typography variant="body2">ramanan@gmail.com</Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
