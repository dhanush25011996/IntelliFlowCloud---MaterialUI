import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  InputAdornment,
  Select,
  LinearProgress,
  CircularProgress,
  FormControlLabel,
  Switch,
  CssBaseline,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import CustomDrawer from "../components/CustomDrawer";
import { ThemeProvider } from "@emotion/react";
import { lightTheme, darkTheme } from "../theme";

const Workflow = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [workflows, setWorkflows] = useState([
    {
      name: "Workflow1",
      created: "2024/05/09 02:57:00 PM",
      lastRun: "2024/05/09 03:15:00 PM",
      nextRun: "2024/05/09 03:30:00 PM",
      deployed: true,
      activity: 65,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newWorkflowName, setNewWorkflowName] = useState("");
  const [newWorkflowDescription, setNewWorkflowDescription] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [darkMode, setDarkMode] = useState(false);

  const handleCreateOpen = () => setOpenCreateDialog(true);
  const handleCreateClose = () => setOpenCreateDialog(false);
  const handleDeleteOpen = () => setOpenDeleteDialog(true);
  const handleDeleteClose = () => setOpenDeleteDialog(false);

  const handleMenuOpen = (event, workflow) => {
    setAnchorEl(event.currentTarget);
    setSelectedWorkflow(workflow);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleCreateWorkflow = () => {
    if (newWorkflowName && newWorkflowDescription) {
      setWorkflows([
        ...workflows,
        {
          name: newWorkflowName,
          created: new Date().toISOString(),
          lastRun: "N/A",
          nextRun: "N/A",
          deployed: false,
          activity: 0,
        },
      ]);
      setNewWorkflowName("");
      setNewWorkflowDescription("");
      setSnackbarMessage("Workflow created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      handleCreateClose();
    } else {
      setSnackbarMessage("Please provide a valid name and description");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeleteWorkflow = () => {
    setWorkflows(workflows.filter((workflow) => workflow !== selectedWorkflow));
    setSnackbarMessage("Workflow deleted successfully");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    handleDeleteClose();
    handleMenuClose();
  };

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDarkModeToggle = (event) => {
    setDarkMode(event.target.checked);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box display="flex">
        <CustomDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="xl">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h4">Workflows</Typography>
              <Box display="flex" alignItems="center">
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={handleDarkModeToggle}
                    />
                  }
                  label="Dark Mode"
                />
                <IconButton onClick={handleCreateOpen}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <TextField
                variant="outlined"
                placeholder="Search Workflows"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Select defaultValue="All">
                  <MenuItem value="All">All Tags</MenuItem>
                </Select>
                <Select defaultValue="Created">
                  <MenuItem value="Created">Created</MenuItem>
                </Select>
              </Box>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{backgroundColor:"lightgray"}}>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "18px", fontWeight: "600" }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "18px", fontWeight: "600" }}
                    >
                      Last Run
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "18px", fontWeight: "600" }}
                    >
                      Next Run
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "18px", fontWeight: "600" }}
                    >
                      Deployed
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "18px", fontWeight: "600" }}
                    >
                      Activity
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "18px", fontWeight: "600" }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredWorkflows.map((workflow, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{workflow.name}</TableCell>
                      <TableCell align="center">{workflow.lastRun}</TableCell>
                      <TableCell align="center">{workflow.nextRun}</TableCell>
                      <TableCell align="center">
                        <CircleIcon
                          style={{ color: workflow.deployed ? "green" : "red" }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LinearProgress
                            variant="determinate"
                            value={workflow.activity}
                            sx={{ flexGrow: 1, mr: 1 }}
                          />
                          <Typography variant="body2">{`${workflow.activity}%`}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, workflow)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={() => alert("Edit")}>
                            Edit
                          </MenuItem>
                          <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
                          <MenuItem onClick={() => alert("Run")}>Run</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
        <Dialog open={openCreateDialog} onClose={handleCreateClose}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Welcome to Intelli Flow Cloud
            </Typography>
            <Typography align="center" gutterBottom>
              Start by naming your project - each account may contain multiple
              projects. You can use projects to organize your Tasks and
              Workflows.
            </Typography>
            <DialogTitle>Create New Workflow</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Workflow Name"
                fullWidth
                value={newWorkflowName}
                onChange={(e) => setNewWorkflowName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Workflow Description"
                fullWidth
                value={newWorkflowDescription}
                onChange={(e) => setNewWorkflowDescription(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleCreateWorkflow} color="primary">
                Create
              </Button>
            </DialogActions>
          </Box>
        </Dialog>

        <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
          <DialogTitle>Delete Workflow</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteWorkflow} color="primary">
              Yes
            </Button>
            <Button onClick={handleDeleteClose} color="secondary">
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default Workflow;
