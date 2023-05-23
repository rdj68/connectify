import { useState } from "react";
import {
  Box,
  TextField,
  useMediaQuery,
  Typography,
  Switch,
  Grid,
  Link,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import bg from "./sideBG.webp";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  userName: Yup.string().required("required"),
  email: Yup.string().email("Invalid email").required("required"),
  password: Yup.string().required("required"),
  location: Yup.string().required("required"),
  picture: Yup.string().required("required"),
  bio: Yup.string().required("required"),
  skills: Yup.string().required("required"),
  fieldOfIntrest: Yup.string().required("required"),

  isCompany: Yup.bool().required("required"),
});
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("required"),
  password: Yup.string().required("required"),
});

const initialValuesRegister = {
  userName: "",
  email: "",
  password: "",
  location: "",
  picture: "",
  bio: "",
  fieldOfIntrest: "",
  skills: "",
  isCompany: true,
};
const initialValueLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    formData.append("age", 18);
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("Form submit");
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValueLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>

                {isRegister && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h1" variant="h5">
                      Sign up
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      {/* input */}
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            label="Name*"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="userName"
                            value={values.userName}
                            error={
                              Boolean(touched.userName) &&
                              Boolean(errors.userName)
                            }
                            helperText={touched.userName && errors.userName}
                            autoComplete="given-name"
                            autoFocus
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Email address*"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="email"
                            value={values.email}
                            error={
                              Boolean(touched.email) && Boolean(errors.email)
                            }
                            helperText={touched.email && errors.email}
                            autoComplete="email"
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Password*"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="password"
                            value={values.password}
                            error={
                              Boolean(touched.password) &&
                              Boolean(errors.password)
                            }
                            helperText={touched.password && errors.password}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="location"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="location"
                            value={values.location}
                            error={
                              Boolean(touched.location) &&
                              Boolean(errors.location)
                            }
                            helperText={touched.location && errors.location}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="bio"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="bio"
                            value={values.bio}
                            helperText={touched.bio && errors.bio}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="fieldOfIntrest"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="fieldOfIntrest"
                            value={values.fieldOfIntrest}
                            helperText={
                              touched.fieldOfIntrest && errors.fieldOfIntrest
                            }
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="skills"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="skills"
                            value={values.skills}
                            helperText={touched.skills && errors.skills}
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Box
                            display={"flex"}
                            px={2}
                            py={1}
                            border={"1px solid grey"}
                          >
                            <Typography fontSize={20}>Company</Typography>
                            <Switch
                              label="isCompany"
                              name="isCompany"
                              checked={values.isCompany}
                              value={values.isCompany}
                              onChange={() => {
                                values.isCompany = !values.isCompany;
                                console.log(values.isCompany);
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} border={"2px solid "} mt={2} ml={2}>
                          <Dropzone
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) =>
                              setFieldValue("picture", acceptedFiles[0])
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <Box
                                mb={2}
                                mr={2}
                                {...getRootProps()}
                                border={"2px dashed blue"}
                                p="1rem"
                                sx={{ "&:hover": { cursor: "pointer" } }}
                              >
                                <input {...getInputProps()} />
                                {!values.picture ? (
                                  <Typography>Add picture here</Typography>
                                ) : (
                                  <Typography>
                                    {values.picture.name} <EditOutlinedIcon />
                                  </Typography>
                                )}
                              </Box>
                            )}
                          </Dropzone>
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                value="allowExtraEmails"
                                color="primary"
                              />
                            }
                            label="I want to receive inspiration, marketing promotions and updates via email."
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign Up
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Typography
                            onClick={() => {
                              setPageType(isLogin ? "register" : "login");
                              resetForm();
                            }}
                            variant="body2"
                          >
                            Don't have an account? Sign in
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}
                {isLogin && (
                  <>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        label="Email Address"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        autoComplete="email"
                        fullWidth
                      />
                      <TextField
                        margin="normal"
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        error={
                          Boolean(touched.password) && Boolean(errors.password)
                        }
                        helperText={touched.password && errors.password}
                        fullWidth
                      />
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                      />
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Sign In
                      </Button>
                      <Grid container>
                        <Grid item xs>
                          <Link href="#" variant="body2">
                            Forgot password?
                          </Link>
                        </Grid>
                        <Grid item>
                          <Typography
                            onClick={() => {
                              setPageType(isLogin ? "register" : "login");
                              resetForm();
                            }}
                            variant="body2"
                          >
                            {"Don't have an account? Sign Up"}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Copyright sx={{ mt: 5 }} />
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/home">
        Connectify
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default Form;
