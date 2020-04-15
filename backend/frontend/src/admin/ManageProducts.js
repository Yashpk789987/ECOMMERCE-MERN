import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Backdrop from "@material-ui/core/Backdrop";

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

import AdminDashboard from "../user/AdminDashboard";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./apiAdmin";
import { API } from "../config";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const ManageProducts = ({ history }) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    setLoading(true);
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  };

  const destroy = (productId) => {
    return new Promise(function (resolve, reject) {
      deleteProduct(productId, user._id, token).then((data) => {
        if (data.error) {
          console.log(data.error);
          resolve();
        } else {
          loadProducts();
          resolve();
        }
      });
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showLoading = () => (
    <Backdrop open={loading} className={classes.backdrop}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  const showTable = () => (
    <MaterialTable
      style={{ padding: "3%" }}
      title="All Products"
      options={{ pageSize: 3 }}
      columns={[
        {
          title: "Picture",
          field: "photo",
          render: (p) => (
            <img
              style={{ height: 100, width: 175 }}
              src={`${API}/product/photo/${p._id}`}
            />
          ),
        },
        { title: "Name", field: "name" },
        { title: "Price", field: "price", type: "numeric" },
        { title: "Quantity", field: "quantity", type: "numeric" },
      ]}
      data={products}
      editable={{
        onRowDelete: (p) => destroy(p._id),
      }}
      actions={[
        {
          icon: "edit",
          tooltip: "Update",
          onClick: (event, p) => {
            history.push(`/admin/product/update/${p._id}`);
          },
        },
      ]}
    />
  );

  return (
    <AdminDashboard>
      {showTable()}
      {showLoading()}
    </AdminDashboard>
  );
};

export default ManageProducts;
