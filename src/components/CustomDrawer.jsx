import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Collapse,
  Popper,
  Paper,
  ClickAwayListener,
  Switch,
  FormControlLabel,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoImage from "../assets/logo.png";
import { ThemeContext } from "../theme";

const CustomDrawer = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "3px",
            backgroundColor: "#fff",
          }}
        >
          <img src={LogoImage} alt="Logo" style={{ width: 150 }} />
        </Box>
        <Select defaultValue="Project Name">
          <MenuItem value="Project Name">
             <Typography><span style={{fontSize:"20px", fontWeight:"500"}}>Business Name</span> <br /> Project Name</Typography>
          </MenuItem>
        </Select>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List>
          <ListItem button onClick={() => handleNavigation("/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation("/workflow")}>
            <ListItemText primary="Workflows" />
          </ListItem>
          {[
            "Executions",
            "Ad hoc Execution",
            "Schedules",
            "Reports",
            "Vault",
            "Devices",
          ].map((text) => (
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
              {["General", "Account Settings", "On-Prem Executor"].map(
                (text) => (
                  <ListItem button key={text} sx={{ pl: 4 }}>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
          </Collapse>
        </List>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
          <Typography variant="body1">Help</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ClickAwayListener onClickAway={handleProfileMenuClose}>
            <Box>
              <Box
                sx={{ cursor: "pointer", display: "flex" }}
                gap={2}
                onClick={handleProfileMenuOpen}
              >
                <Box>
                  <Avatar alt="Ramanan AR" src="/static/images/avatar/1.jpg" />
                </Box>
                <Box>
                  <Typography variant="body2">Ramanan AR</Typography>
                  <Typography variant="body2">ramanan@gmail.com</Typography>
                </Box>
              </Box>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="right-end"
                style={{ zIndex: 1201 }}
              >
                <Paper sx={{ mt: 1, p: 2 }}>
                  <Box
                    sx={{
                      p: 3,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "3px",
                    }}
                  >
                    <LightModeIcon />
                    <FormControlLabel
                      control={
                        <Switch checked={darkMode} onChange={toggleDarkMode} />
                      }
                    />
                    <DarkModeIcon />
                  </Box>
                  <Divider />
                  <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleProfileMenuClose}>API Keys</MenuItem>
                  <MenuItem onClick={handleProfileMenuClose}>
                    Preferences
                  </MenuItem>
                  <MenuItem onClick={handleProfileMenuClose}>
                    Feature previews
                  </MenuItem>
                  <MenuItem onClick={handleProfileMenuClose}>Security</MenuItem>
                  <MenuItem onClick={handleProfileMenuClose}>Sign out</MenuItem>
                </Paper>
              </Popper>
            </Box>
          </ClickAwayListener>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
