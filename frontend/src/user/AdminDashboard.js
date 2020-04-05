import React from "react";

import Drawer from "@material-ui/core/Drawer";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { AddBox, BorderColor, List as ListIcon } from "@material-ui/icons";
import AddShoppingCartTwoToneIcon from "@material-ui/icons/AddShoppingCartTwoTone";
import { Link } from "react-router-dom";

import AdminAppBar from "./AdminAppBar";
import { isAuthenticated } from "../auth";

const AdminDashboard = ({ children, props }) => {
  const classes = useStyles();
  const {
    user: { _id, name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <ListItem
            style={{
              paddingTop: "7%",
              display: "flex",
              justifyContent: "space-around",
            }}
            button
          >
            <AddBox />
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/create/category"
            >
              <ListItemText primary={"  Create Category"} />
            </Link>
          </ListItem>
          <Divider />
          <ListItem
            style={{
              paddingTop: "3%",
              display: "flex",
              justifyContent: "space-around",
            }}
            button
          >
            <AddBox />
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/create/category"
            >
              <ListItemText primary={"  Create Category"} />
            </Link>
          </ListItem>
          <Divider />
          <ListItem
            style={{
              paddingTop: "3%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <AddShoppingCartTwoToneIcon />
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/create/product"
            >
              <ListItemText primary={" Create Product"} />
            </Link>
          </ListItem>
          <Divider />
          <ListItem
            style={{
              paddingTop: "3%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <BorderColor />

            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/admin/orders"
            >
              <ListItemText primary={"View Orders"} />
            </Link>
          </ListItem>
          <Divider />
          <ListItem
            style={{
              paddingTop: "3%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <ListIcon />
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/admin/products"
            >
              <ListItemText primary={"Manage Products"} />
            </Link>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <AdminAppBar>
      <main className={classes.content}>
        <div>{adminLinks()}</div>
        {/* <div style={{ marginLeft: "23%", marginTop: "4%" }}>{adminInfo()}</div> */}
        <div style={{ marginLeft: "23%", marginTop: "4%" }}>{children}</div>
      </main>
    </AdminAppBar>
  );
};

export default AdminDashboard;

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));
