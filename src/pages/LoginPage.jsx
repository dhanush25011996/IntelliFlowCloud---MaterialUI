import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import LogoImage from "../assets/logo.png";

const LoginPage = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleCreate = () => {
    const nameRegex = /^[a-zA-Z0-9]+$/;
    const descriptionRegex = /^[a-zA-Z0-9 ]+$/;

    if (!nameRegex.test(projectName) || !descriptionRegex.test(description)) {
      setError(true);
      setOpen(true);
    } else {
      setError(false);
      setOpen(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box display="flex" minHeight="100vh" overflow="hidden">
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 200, boxSizing: "border-box", height: '100vh' },
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" p={2}>
          <img src={LogoImage} alt="Logo" style={{ width: 150, height: 60, marginBottom: 20 }} />
          <List sx={{ marginTop: '450px' }}>
            <ListItem button>
              <ListItemText primary="Help" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Welcome to Intelli Flow Cloud
          </Typography>
          <Typography align="center" gutterBottom>
            Start by naming your project - each account may contain multiple
            projects. You can use projects to organize your Tasks and Workflows.
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              sx={{ width: "20%" }}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {error ? "Error creating project" : "Project created successfully."}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default LoginPage;
