import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CafeList from "./pages/CafeList/CafeList";
import CafeEdit from "./pages/CafeEdit/CafeEdit";
import EmployeeList from "./pages/EmployeeList/EmployeeList";
import EmployeeEdit from "./pages/EmployeeEdit/EmployeeEdit";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import theme from "./custom_theme/customTheme";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <GlobalStyles
            styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
          />
          <CssBaseline />
          <div className="main">
            <Header />
            <div>
              <Routes>
                <Route path="/" element={<Navigate replace to="/cafes" />} />
                <Route path="/cafes" element={<CafeList />} />
                <Route path="/edit-cafe" element={<CafeEdit />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/edit-employee" element={<EmployeeEdit />} />
                <Route path="*" element={<NotFound/>} />
              </Routes>
            </div>

            <Footer />
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
