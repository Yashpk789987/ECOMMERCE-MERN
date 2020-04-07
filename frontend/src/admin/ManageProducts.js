import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";

import AdminDashboard from "../user/AdminDashboard";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./apiAdmin";
import { API } from "../config";

const ManageProducts = ({ history }) => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setProducts(data);
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

  return (
    <AdminDashboard>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          {/* <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  onClick={() => destroy(p._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul> */}
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
          <br />
        </div>
      </div>
    </AdminDashboard>
  );
};

export default ManageProducts;
