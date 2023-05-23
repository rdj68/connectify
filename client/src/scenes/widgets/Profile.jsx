import { Avatar, Box, Grid, Typography, Chip, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ProfileDisplay(props) {
  const { user, _id, token, columns } = props;
  const isCompany = user.isCompany;
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const addInfluencer = async (params) => {
    const { userId, influencerId, token } = params;
    const response = await fetch(
      `http://localhost:3001/user/${userId}/${influencerId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const res = await response.json();
  };
  const messageInfluencer = async (params) => {
    const { userId, influencerId } = params;
    navigate(`/user/${userId}/${influencerId}/messages`);
  };

  return (
    <Grid item md={columns}>
      <Box boxShadow={3} borderRadius={2} overflow={"hidden"}>
        <Box
          sx={{
            height: "25vh",
            background: "#FFEEEE",
            background: "-webkit-linear-gradient(to right, #DDEFBB, #FFEEEE)",
            background: "linear-gradient(to right, #DDEFBB, #FFEEEE)",
          }}
        />
        <Box>
          <Box mt={-18} p={5}>
            <Avatar
              sx={{
                width: 200,
                height: 200,
                border: 5,
                borderColor: "white",
              }}
              src={`http://localhost:3001/assets/${user.picturePath}`}
            ></Avatar>
            <Box mt={2}>
              <Typography variant="h4" fontWeight={600}>
                {user.userName}
              </Typography>
              <Typography fontWeight={100}>
                {" "}
                <LocationOnIcon fontSize="" />
                {user.location}
              </Typography>
              <Typography>
                Bio: <br />
                {user.bio}
              </Typography>
            </Box>
            <Box mt={2}>
              {user._id !== _id && (
                <>
                  <Button
                    sx={{ mr: 2 }}
                    size="small"
                    variant="contained"
                    onClick={() => {
                      messageInfluencer({
                        userId: _id,
                        influencerId: user._id,
                      });
                    }}
                  >
                    Message
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    disabled={buttonDisabled}
                    onClick={() => {
                      setButtonDisabled(true);
                      addInfluencer({
                        userId: _id,
                        influencerId: user._id,
                        token,
                      });
                    }}
                  >
                    {buttonDisabled ? "Following" : "Follow"}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box boxShadow={3} borderRadius={2} mt={2} columnGap={5} p={3} px={5}>
        {!isCompany && (
          <Typography variant="h6" fontWeight={700}>
            Skills: <br />{" "}
            {user.skills.map((skill) => (
              <Chip
                sx={{ mx: "20px" }}
                key={skill}
                label={skill}
                variant="outlined"
              />
            ))}
          </Typography>
        )}
        <Typography variant="h6" fontWeight={700}>
          Intrest: <br />{" "}
          {user.fieldOfIntrest.map((intrest) => (
            <Chip
              sx={{ mx: "20px" }}
              key={intrest}
              label={intrest}
              variant="outlined"
            />
          ))}
        </Typography>
      </Box>
    </Grid>
  );
}

export default ProfileDisplay;
