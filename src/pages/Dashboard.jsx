import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CustomDrawer from "../components/CustomDrawer";
import { lightTheme, darkTheme } from "../theme";

const Dashboard = () => {
  const [darkMode, setDarkMode] = React.useState(false);

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
              <Typography variant="h4">Dashboard</Typography>
              <FormControlLabel
                control={
                  <Switch checked={darkMode} onChange={handleDarkModeToggle} />
                }
                label="Dark Mode"
              />
            </Box>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      Welcome to Intelli Flow!
                    </Typography>
                    <Typography variant="body1">
                      Execute your first Automation in 5 easy steps.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary">
                      Get Started
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs={12} md={8}>
                <Paper sx={{ p: 2, height: "405px", width: "750px" }}>
                  <Typography variant="h6">Workflow Runs</Typography>
                  {/* Add content here */}
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, mb: 3, height: "190px", width: "400px" }}>
                  <Typography variant="h6">Task Runs</Typography>
                  {/* Add content here */}
                </Paper>
                <Paper sx={{ p: 2, height: "190px", width: "400px" }}>
                  <Typography variant="h6">Upcoming Runs</Typography>
                  {/* Add content here */}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
