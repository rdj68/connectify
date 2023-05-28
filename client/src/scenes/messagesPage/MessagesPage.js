import * as React from "react";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setConnections } from "state";
import Navbar from "scenes/navbar";
import { useParams } from "react-router-dom";
import ProfileDisplay from "scenes/widgets/Profile";
import MessagesDisplay from "scenes/widgets/Messages";
import ChatUsers from "scenes/widgets/ChatUsers";

// The messagePage is used to display chats of users and allow them to have convo with each other about payments and collabs
const MessagePage = () => {
  const dispatch = useDispatch();
  //The user state variable containig info about current user
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const connections = useSelector((state) => state.connections);
  const { id, connectionId } = useParams();

  // The getConnections is used to request all the friends of the current user
  const getConnections = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${id}/connections`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setConnections({ connections: data }));
  };
  //The get user function is used to request user data from the server

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/user/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  // Use effect is a react hook, the code inside use effect only runs when web page is loaded or refreshed
  useEffect(() => {
    getUser();
    getConnections();
  }, []);

  if (!user) {
    console.log("user not verified");
    return null;
  }

  return (
    <>
      <Navbar />
      <Grid container mt={2} columnSpacing={2} justifyContent="center">
        {/* The chat user is a widget which displays all the connections with whom the user has had a   chat history */}
        <ChatUsers connections={connections} id={id} />
        {/* The message display is used to display the chat history and new messages of the user */}
        <MessagesDisplay
          columns={7}
          id={id}
          token={token}
          connectionId={connectionId}
        />
        {/* The profile display widget is for displaying info about the user */}
        <ProfileDisplay user={user} _id={id} columns={2} />
      </Grid>
    </>
  );
};

export default MessagePage;
