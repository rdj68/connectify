import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Navbar from "scenes/navbar";
import collab1 from "./collab1.jpg";
import collab2 from "./collab2.jpg";
import Footer from "scenes/footer";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { Instagram } from "@mui/icons-material";
import { FormControl, MenuItem, Select } from "@mui/material";
import userEvent from "@testing-library/user-event";

const socialMedia = [
  {
    name: "Instagram",
    logo: Instagram,
  },
];

const HomePage = () => {
  return (
    <>
      <Box
        sx={{
          // bgcolor: "#85FFBD",
          // backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
          background: "#0f0c29",
          background:
            "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)",
          background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",

          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontFamily: "sans-serif",
              fontWeight: 500,
              mt: 5,
            }}
          >
            Find Influencers from all over
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#d32f2f",
              fontFamily: "sans-serif",
              fontWeight: 600,
              mt: 5,
              ml: 2,
            }}
          >
            India
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <FormControl
            variant="standard"
            sx={{ bgcolor: "white" }}
            value={userEvent}
          >
            <Select
              value={socialMedia[0].name}
              sx={{
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3 rem",
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={socialMedia[0].name}>
                <Typography>{socialMedia[0].name}</Typography>
              </MenuItem>
            </Select>
          </FormControl>

          <CustomizedInputBase />
        </Box>

        {/* <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            mt: 5,
          }}
        >
          <img src={collab1}></img>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            p: 3,
            mt: 5,
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Typography variant="h2" color={"white"} fontFamily={"sans-serif"}>
            Let's
            <br />
            Connect
            <br />
            And
            <br />
            Create
          </Typography>
          <img src={collab2}></img>
        </Box> */}
      </Box>
      <Footer />
    </>
  );
};

function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        borderRadius: 0,
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
      />
    </Paper>
  );
}
export default HomePage;
