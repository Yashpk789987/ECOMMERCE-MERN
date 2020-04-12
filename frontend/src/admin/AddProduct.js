import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import { DropzoneArea } from "material-ui-dropzone";

import AdminDashboard from "../user/AdminDashboard";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AddProduct = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  // load categories and set form data
  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleImage = (name) => (file) => {
    const value = file[0];
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const newProductForm = () => {
    return (
      <Paper elevation={3}>
        <Grid container>
          <Grid
            item
            xs
            style={{ padding: "3%", paddingTop: "1%", paddingBottom: "1%" }}
          >
            <TextField
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}
              value={name}
              onChange={handleChange("name")}
              type="text"
              label="Name"
            />
            <TextField
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}
              value={price}
              onChange={handleChange("price")}
              type="number"
              label="Price"
            />
            <FormControl
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={category}
                onChange={handleChange("category")}
                label="Category"
              >
                <MenuItem disabled={true}>Select Category</MenuItem>
                {categories &&
                  categories.map((c, i) => (
                    <MenuItem key={i} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Shipping
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={shipping}
                onChange={handleChange("shipping")}
                label="Category"
              >
                <MenuItem disabled={true}>Shipping</MenuItem>

                <MenuItem value="0">No</MenuItem>
                <MenuItem value="1">Yes</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}
              value={quantity}
              onChange={handleChange("quantity")}
              type="number"
              label="Quantity"
            />
          </Grid>
          <Grid
            item
            xs
            style={{ padding: "3%", paddingTop: "1%", paddingBottom: "1%" }}
          >
            {photo === "" ? (
              <div
                style={{
                  width: "100%",
                  marginBottom: "5%",
                  marginTop: "5%",
                }}
              >
                <DropzoneArea
                  getFileRemovedMessage={(fileName) => {
                    setValues({ ...values, photo: "" });
                    return `File ${fileName} removed.`;
                  }}
                  filesLimit={1}
                  acceptedFiles={["image/*"]}
                  onChange={handleImage("photo")}
                />
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <IconButton
                  onClick={() => setValues({ ...values, photo: "" })}
                  aria-label="delete"
                  style={{
                    background: "red",
                    color: "white",
                    position: "absolute",
                    top: "-1%",
                    right: "-5%",
                    zIndex: 5,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <img
                  style={{
                    width: "100%",
                    height: 250,
                    marginBottom: "5%",
                    marginTop: "5%",
                    opacity: 1,
                  }}
                  src={URL.createObjectURL(photo)}
                  alt={"Product Image"}
                />
              </div>
            )}

            <TextField
              style={{ width: "100%", marginBottom: "1%", marginTop: "1%" }}
              id="outlined-textarea"
              label="Description"
              placeholder="Description"
              type="text"
              multiline={true}
              variant="outlined"
              rows="4"
              value={description}
              onChange={handleChange("description")}
            />

            <Button
              style={{ marginTop: "5%", width: "100%" }}
              onClick={clickSubmit}
              variant="contained"
              color="primary"
              size="large"
            >
              Create Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const showError = () => {
    if (error !== "") {
      return (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={true}
          autoHideDuration={5000}
          onClose={() => setValues({ ...values, error: "" })}
        >
          <MuiAlert
            onClose={() => setValues({ ...values, error: "" })}
            variant="filled"
            severity="error"
          >
            {error}
          </MuiAlert>
        </Snackbar>
      );
    }
  };

  const showSuccess = () => {
    if (createdProduct) {
      return (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={true}
          autoHideDuration={5000}
          onClose={() => setValues({ ...values, createdProduct: "" })}
        >
          <MuiAlert
            onClose={() => setValues({ ...values, createdProduct: "" })}
            variant="filled"
            severity="success"
          >
            {`${createdProduct}`} is created!
          </MuiAlert>
        </Snackbar>
      );
    }
  };

  const showLoading = () => (
    <Backdrop open={loading} className={classes.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return (
    <AdminDashboard>
      {showLoading()}
      {showSuccess()}
      {showError()}
      {newProductForm()}
    </AdminDashboard>
  );
};

export default AddProduct;
