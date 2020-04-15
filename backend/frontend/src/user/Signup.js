import React, { useState } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Layout from "../core/Layout";
import FormLeftContainer from "../core/FormLeftContainer";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleClose = () => {
    setValues({ ...values, error: false });
  };

  const handleCloseSuccess = () => {
    setValues({ ...values, success: false });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <Paper
      elevation={3}
      style={{ marginTop: "6%", marginRight: "20%", marginLeft: "20%" }}
    >
      <Grid container>
        <Grid item xs>
          <FormLeftContainer />
        </Grid>
        <Grid item xs style={{ padding: "5%" }}>
          <form>
            <TextField
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%" }}
              onChange={handleChange("name")}
              label="Name"
              value={name}
            />

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
            >
              Submit
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

  const showSuccess = () => (
    <Snackbar open={success} autoHideDuration={10000} onClose={handleClose}>
      <MuiAlert
        onClose={handleCloseSuccess}
        variant="filled"
        severity="success"
      >
        {"New account is created.       "}
        {`Please`}
        <Link to="/signin">
          <u style={{ color: "white" }}>Signin</u>
        </Link>
      </MuiAlert>
    </Snackbar>
  );

  return (
    <>
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </>
  );
};

export default Signup;
