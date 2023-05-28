import { Typography, Box, TextField, Grid, Link, Button } from "@mui/material";
import Navbar from "scenes/navbar";

const ContactUsPage = () => {
  return (
    // This is the Contact us Page code it returns a form for the user to contact the devlopment team
    <>
      {/* navbar component */}
      <Navbar />
      {/* The form code to generate all thee text boxes and submit button */}
      <Box
        sx={{
          display: "grid",
          justifyItems: "center",
        }}
      >
        <Box>
          <Typography></Typography>
        </Box>

        <Box
          component="form"
          noValidate
          sx={{
            boxShadow: 3,
            borderRadius: 1,
            p: 3,
            m: 3,
          }}
        >
          <Box sx={{ display: "grid", mb: 3 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 300, justifySelf: "center" }}
            >
              Talk with our team
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone no"
                label="phone no"
                type="phone no"
                id="phone no"
                autoComplete="new-phone no"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="message"
                label="message"
                type="message"
                id="message"
                autoComplete="new-message"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ContactUsPage;
