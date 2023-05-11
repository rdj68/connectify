import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import {
  FormControl,
  InputBase,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const drawerWidth = 240;
const navItems = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "Contact Us", url: "/contactUs" },
  { name: "Login", url: "/login" },
  { name: "Sign Up", url: "/signup" },
];
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const userName = "Yash Shinde";

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography fontFamily={"san serif"} variant="h6" sx={{ my: 2 }}>
        <ConnectWithoutContactIcon /> Connectify
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton href={item.url} sx={{ textAlign: "center" }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            background: "#0f0c29",
            background:
              "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)",
            background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",

            pt: 2,
          }}
          elevation={0}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "end", md: "center" },
              }}
              flexGrow={1}
            >
              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                <ConnectWithoutContactIcon fontSize="large" />
                <Typography variant="h6" component="div" sx={{ mr: 30, mt: 1 }}>
                  {" "}
                  Connectify
                </Typography>
              </Box>

              <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                {navItems.map((item) => (
                  <Button
                    href={item.url}
                    key={item.name}
                    sx={{ color: "#fff" }}
                    size="large"
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
              <FormControl variant="standard" value={userEvent}>
                <Select
                  value={userName}
                  sx={{
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3 rem",
                      color: "#fff",
                    },
                    color: "#fff",
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={userName}>
                    <Typography>{userName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
        <Offset />
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
