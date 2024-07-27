import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function Header() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <img src={logo} alt="Logo" id="toolbar-logo" />
        <Typography
          variant="h4"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
          onClick={() => {
            navigate("/cafes");
          }}
          style={{ cursor: "pointer" }}
        >
          Fresh Cafe Management Portal
        </Typography>
        <nav>
          <Link
            variant="button"
            color="rgb(255,255,255)"
            href="/cafes"
            sx={{ my: 1, mx: 1.5 }}
          >
            Cafes
          </Link>
          <Link
            variant="button"
            color="rgb(255,255,255)"
            href="/employees"
            sx={{ my: 1, mx: 1.5 }}
          >
            Employees
          </Link>
          <Link
            variant="button"
            color="rgb(255,255,255)"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            To Be Added
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
