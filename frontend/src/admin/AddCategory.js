import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import AdminDashboard from "../user/AdminDashboard";
import FormLeftContainer from "../core/FormLeftContainer";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName("");
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <Paper elevation={3} style={{ marginTop: "5%" }}>
      <Grid container>
        <Grid item xs>
          <FormLeftContainer />
        </Grid>
        <Grid item xs style={{ padding: "5%" }}>
          <form>
            <TextField
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%" }}
              onChange={handleChange}
              value={name}
              autoFocus
              required
              label="Name"
            />

            <Button
              style={{ marginTop: "5%", width: "100%" }}
              onClick={clickSubmit}
              variant="contained"
              color="primary"
              size="large"
            >
              Create Category
            </Button>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );

  const showSuccess = () => {
    if (success) {
      return (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={() => setSuccess(false)}
        >
          <MuiAlert
            onClose={() => setSuccess(false)}
            variant="filled"
            severity="success"
          >
            category {name} is created.
          </MuiAlert>
        </Snackbar>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={() => setError(false)}
        >
          <MuiAlert
            onClose={() => setError(false)}
            variant="filled"
            severity="error"
          >
            category should be unique
          </MuiAlert>
        </Snackbar>
      );
    }
  };

  return (
    <AdminDashboard>
      {showSuccess()}
      {showError()}
      {newCategoryForm()}
    </AdminDashboard>
  );
};

export default AddCategory;
