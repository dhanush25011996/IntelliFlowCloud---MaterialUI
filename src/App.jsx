import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

//import pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import WorkFlow from "./pages/WorkFlow";

const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workflow" element={<WorkFlow />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
