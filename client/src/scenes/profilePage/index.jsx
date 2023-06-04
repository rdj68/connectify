import * as React from "react";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setConnections } from "state";
import Navbar from "scenes/navbar";
import ConnectionsDisplay from "scenes/widgets/Connections";
import ProfileDisplay from "scenes/widgets/Profile";

const ProfilePage = () => {
  const dispatch = useDispatch();
  //The user state variable containig info about current user
  const [user, setUser] = useState(null);

  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const connections = useSelector((state) => state.connections);
  const { id } = useParams();

  console.log(id);
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
        {/* The profile display widget is for displaying info about the user */}
        <ProfileDisplay user={user} _id={_id} token={token} columns={7} />
        {/* The Connections display widget is used to display all the connections ie friends of the user  */}
        <ConnectionsDisplay connections={connections} id={id} />
      </Grid>
    </>
  );
};

export default ProfilePage;
