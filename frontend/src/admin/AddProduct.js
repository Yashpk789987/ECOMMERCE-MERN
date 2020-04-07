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

import AdminDashboard from "../user/AdminDashboard";
import { isAuthenticated } from "../auth";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
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
      <Paper style={{ marginLeft: "-25%", width: "150%" }} elevation={3}>
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
                <MenuItem>Select Category</MenuItem>
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
                <MenuItem>Select Category</MenuItem>

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
            <TextField
              style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}
              id="outlined-textarea"
              label="Photo"
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
              variant="outlined"
            />

            <TextField
              style={{ width: "100%", marginBottom: "5%", marginTop: "5%" }}
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

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange("shipping")} className="form-control">
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>

      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const showError = () => {
    if (error !== "") {
      return (
        <Snackbar
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <AdminDashboard>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newProductForm()}
          {/* {newPostForm()} */}
        </div>
      </div>
    </AdminDashboard>
  );
};

export default AddProduct;
