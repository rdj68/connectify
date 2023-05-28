import { Box, Grid, Paper, InputBase, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";

// The messages widget is used is used to display all the chats of user when requested by the chat user widget
function MessagesDisplay(params) {
  const { columns, id, token, connectionId } = params;
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(null);

  const getMessages = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${id}/${connectionId}/getMessage`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { messages } = await response.json();
    setChat(messages);
  };

  const sendMessage = async (params) => {
    const { id, connectionId, message, token } = params;
    if (!message) {
      return;
    }
    const response = await fetch(
      `http://localhost:3001/user/${id}/${connectionId}/sendMessage`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, Message: message },
      }
    );
    const messages = await response.json();
    setChat(messages);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <Grid item xs={columns}>
      <Box
        sx={{
          border: 1,
          pt: 2,
          px: 3,
          height: "80vh",
          overflowY: "scroll",
          scrollbarWidth: "thin",
        }}
      >
        {chat &&
          chat.map((chat, key) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                justifyContent: chat.id == id ? "end" : "start",
              }}
            >
              <Typography sx={{ borderRadius: 2, boxShadow: 2, p: 1 }}>
                {chat.message}
              </Typography>
            </Box>
          ))}
      </Box>
      {connectionId && (
        <Box border={1}>
          <Paper
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage({
                id,
                connectionId,
                message,
                token,
              });
              setMessage("");
            }}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Message"
              value={message}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />

            <Button type="submit">Send</Button>
          </Paper>
        </Box>
      )}
    </Grid>
  );
}

export default MessagesDisplay;
