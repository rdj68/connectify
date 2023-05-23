import { Avatar, Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ChatUsers(params) {
  const { connections, id } = params;

  return (
    <Grid item xs={12} md={2}>
      <Box boxShadow={3} borderRadius={2} minHeight="50vh" pt={2}>
        <Typography variant="h5" px={1} fontStyle={"Georgia"} fontWeight={600}>
          Chats
          <Box>
            {connections.map((connection, key) => (
              <Link
                key={key}
                reloadDocument
                to={`/user/${id}/${connection._id}/messages`}
              >
                <Box
                  p={1}
                  key={connection.userName}
                  sx={{ display: "inline-flex", width: "100%", border: 1 }}
                >
                  <Avatar
                    src={`http://localhost:3001/assets/${connection.picturePath}`}
                  ></Avatar>
                  <Typography mt={1} ml={1}>
                    {connection.userName}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
        </Typography>
      </Box>
    </Grid>
  );
}
export default ChatUsers;
