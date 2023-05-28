import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  Typography,
  Avatar,
  InputBase,
  Paper,
  Chip,
  ThemeProvider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";
import Footer from "scenes/footer";
import { createTheme, responsiveFontSizes } from "@mui/material";

const HomePage = () => {
  // states to handle search and result. The searchkey is for when user enters data to be searched, and the result var is for storing the result
  const [searchKey, setSearchKey] = useState("");
  const [result, setResult] = useState([]);

  // Theme is to customise elements as per requirement, here it is used for making the text responsive
  var theme = createTheme();
  theme = responsiveFontSizes(theme);

  //The search function which is called when user clicks the search button, a request is sent to server to get the results from the database
  // so for eg if food is searched then all food blogging related influencers are fetched
  const search = async () => {
    var result = await fetch(`http://localhost:3001/user/search`, {
      method: "GET",
      headers: { Search: searchKey },
    });
    result = await result.json();
    setResult(result);
  };

  //the function return statement consists of all the UI code
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: "#0f0c29",
          background:
            "-webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29)",
          background: "linear-gradient(to right, #24243e, #302b63, #0f0c29)",

          minHeight: "100vh",
        }}
      >
        {/* Navbar component */}
        <Navbar />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
          mt={10}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontFamily: "sans-serif",
              fontWeight: 500,
              display: "inline-flex",
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
            }}
            ml={1}
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
            mx: 1,
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            columns={{ xs: 12 }}
          >
            <Grid item md={8}>
              <Paper
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  search();
                }}
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                  borderRadius: 5,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(event) => setSearchKey(event.target.value)}
                />

                <Button onClick={search}>Search</Button>
              </Paper>
            </Grid>
            <SearchResult data={result} />
          </Grid>
        </Box>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

// The search result function is for displaying all the results returned from the server end in form of blocks, clicking on these blocks leads
//to profile of that influencer
function SearchResult({ data }) {
  const navigate = useNavigate();
  return data.map((user) => (
    <Grid item md={4} mt={2}>
      <Box
        boxShadow={3}
        borderRadius={2}
        mx={2}
        bgcolor="white"
        overflow={"hidden"}
      >
        <Box>
          <Box p={2}>
            <Box display="inline-flex">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                }}
                src={`http://localhost:3001/assets/${user.picturePath}`}
              ></Avatar>
              <Box mt={2}>
                <Typography variant="h4" fontWeight={400}>
                  {user.userName}
                </Typography>
                <Typography fontWeight={100}>
                  {"   "}
                  <LocationOnIcon fontSize="" />
                  {user.location}
                </Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography fontWeight={600}>Bio: </Typography>
              <Typography>{user.bio}</Typography>

              <Box fontWeight={600}>
                Skills:{"  "}
                {user.skills.map((skill, key) => (
                  <Chip
                    sx={{ mx: "15px" }}
                    key={key}
                    label={skill}
                    variant="outlined"
                  />
                ))}
              </Box>
              <Box fontWeight={600}>
                Intrest:{"  "}
                {user.fieldOfIntrest.map((intrest, key) => (
                  <Chip
                    sx={{ mx: "15px" }}
                    key={key}
                    label={intrest}
                    variant="outlined"
                  />
                ))}
              </Box>
              <Box mt={2}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    const influencerId = user._id;
                    navigate(`/user/${influencerId}`);
                  }}
                >
                  Visit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  ));
}

export default HomePage;
