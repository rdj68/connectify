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

const MessagePage = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const connections = useSelector((state) => state.connections);
  const { id, connectionId } = useParams();

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
  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/user/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
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
        <ChatUsers connections={connections} id={id} />
        <MessagesDisplay
          columns={7}
          id={id}
          token={token}
          connectionId={connectionId}
        />
        <ProfileDisplay user={user} _id={id} columns={2} />
      </Grid>
    </>
  );
};

export default MessagePage;
