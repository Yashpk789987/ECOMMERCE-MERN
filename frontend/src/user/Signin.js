import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LinearProgress from "@material-ui/core/LinearProgress";

import Layout from "../core/Layout";
import FormLeftContainer from "../core/FormLeftContainer";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const handleClose = () => {
    setValues({ ...values, error: false });
  };

  const signUpForm = () => (
    <Paper
      elevation={3}
      style={{ marginTop: "6%", marginRight: "20%", marginLeft: "20%" }}
    >
      {loading && showLoading()}
      <Grid container>
        <Grid item xs>
          <FormLeftContainer />
        </Grid>
        <Grid item xs style={{ padding: "5%" }}>
          <form>
            <TextField
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}
              value={email}
              onChange={handleChange("email")}
              type="email"
              label="Email"
            />

            <TextField
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}
              value={password}
              onChange={handleChange("password")}
              type="password"
              label="Password"
            />

            <Button
              style={{ marginTop: "5%", width: "100%" }}
              onClick={clickSubmit}
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
            >
              Login
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );

  const showError = () => (
    <Snackbar open={error} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} variant="filled" severity="error">
        {error}
      </MuiAlert>
    </Snackbar>
  );

  const showLoading = () =>
    true && (
      <LinearProgress variant="query" style={{ backgroundColor: "orange" }} />
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </>
  );
};

export default Signin;
