import { Avatar, Box, Grid, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

function ConnectionsDisplay(params) {
  const { connections, id } = params;

  return (
    <Grid item xs={12} md={2}>
      <Box boxShadow={3} borderRadius={2} minHeight="50vh" pt={2} px={3}>
        <Typography variant="h5" fontStyle={"Georgia"} fontWeight={600}>
          Connections
          <Box m={1}>
            {connections.map((connection) => (
              <Box my={2} key={connection.userName}>
                <Link reloadDocument to={`/user/${connection._id}/`}>
                  <Avatar
                    src={`http://localhost:3001/assets/${connection.picturePath}`}
                  ></Avatar>
                  <Typography>{connection.userName}</Typography>
                </Link>
                <Typography fontWeight={100}>
                  {" "}
                  <LocationOnIcon fontSize="" />
                  {connection.location}
                </Typography>
              </Box>
            ))}
          </Box>
        </Typography>
      </Box>
    </Grid>
  );
}
export default ConnectionsDisplay;
