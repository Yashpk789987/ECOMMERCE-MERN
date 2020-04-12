// import React from "react";

// import Drawer from "@material-ui/core/Drawer";
// import Paper from "@material-ui/core/Paper";
// import List from "@material-ui/core/List";
// import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";
// import { makeStyles } from "@material-ui/core/styles";
// import { AddBox, BorderColor, List as ListIcon } from "@material-ui/icons";
// import AddShoppingCartTwoToneIcon from "@material-ui/icons/AddShoppingCartTwoTone";
// import { Link } from "react-router-dom";

// import AdminAppBar from "./AdminAppBar";
// import { isAuthenticated } from "../auth";

// const AdminDashboard = ({ children, props }) => {
//   const classes = useStyles();
//   const {
//     user: { _id, name, email, role },
//   } = isAuthenticated();

//   const adminLinks = () => {
//     return (
//       <Drawer
//         className={classes.drawer}
//         variant="permanent"
//         classes={{
//           paper: classes.drawerPaper,
//         }}
//         anchor="left"
//       >
//         <List>
//           <ListItem
//             style={{
//               paddingTop: "7%",
//               display: "flex",
//               justifyContent: "space-around",
//             }}
//             button
//           >
//             <AddBox />
//             <Link
//               style={{ textDecoration: "none", color: "inherit" }}
//               to="/create/category"
//             >
//               <ListItemText primary={"  Create Category"} />
//             </Link>
//           </ListItem>
//           <Divider />
//           <ListItem
//             style={{
//               paddingTop: "3%",
//               display: "flex",
//               justifyContent: "space-around",
//             }}
//             button
//           >
//             <AddBox />
//             <Link
//               style={{ textDecoration: "none", color: "inherit" }}
//               to="/create/category"
//             >
//               <ListItemText primary={"  Create Category"} />
//             </Link>
//           </ListItem>
//           <Divider />
//           <ListItem
//             style={{
//               paddingTop: "3%",
//               display: "flex",
//               justifyContent: "space-around",
//             }}
//           >
//             <AddShoppingCartTwoToneIcon />
//             <Link
//               style={{ textDecoration: "none", color: "inherit" }}
//               to="/create/product"
//             >
//               <ListItemText primary={" Create Product"} />
//             </Link>
//           </ListItem>
//           <Divider />
//           <ListItem
//             style={{
//               paddingTop: "3%",
//               display: "flex",
//               justifyContent: "space-around",
//             }}
//           >
//             <BorderColor />

//             <Link
//               style={{ textDecoration: "none", color: "inherit" }}
//               to="/admin/orders"
//             >
//               <ListItemText primary={"View Orders"} />
//             </Link>
//           </ListItem>
//           <Divider />
//           <ListItem
//             style={{
//               paddingTop: "3%",
//               display: "flex",
//               justifyContent: "space-around",
//             }}
//           >
//             <ListIcon />
//             <Link
//               style={{ textDecoration: "none", color: "inherit" }}
//               to="/admin/products"
//             >
//               <ListItemText primary={"Manage Products"} />
//             </Link>
//           </ListItem>
//           <Divider />
//         </List>
//       </Drawer>
//     );
//   };

//   const adminInfo = () => {
//     return (
//       <div className="card mb-5">
//         <h3 className="card-header">User Information</h3>
//         <ul className="list-group">
//           <li className="list-group-item">{name}</li>
//           <li className="list-group-item">{email}</li>
//           <li className="list-group-item">
//             {role === 1 ? "Admin" : "Registered User"}
//           </li>
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <AdminAppBar>
//       <main className={classes.content}>
//         <div>{adminLinks()}</div>
//         {/* <div style={{ marginLeft: "23%", marginTop: "4%" }}>{adminInfo()}</div> */}
//         <div style={{ marginLeft: "23%", marginTop: "4%" }}>{children}</div>
//       </main>
//     </AdminAppBar>
//   );
// };

// export default AdminDashboard;

// const drawerWidth = 300;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   // necessary for content to be below app bar
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing(3),
//   },
// }));

import React from "react";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import IconButton from "@material-ui/core/IconButton";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddBox from "@material-ui/icons/AddBox";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import ListIcon from "@material-ui/icons/List";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import AccountCircle from "@material-ui/icons/AccountCircle";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { signout } from "../auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function AdminDashboard(props) {
  const { container, children, history } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem
          onClick={() => history.push("/admin/dashboard")}
          button
          key={"admin-name-admin"}
        >
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary={"Admin Name"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          onClick={() => history.push("/create/category")}
          button
          key={"add-category-admin"}
        >
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary={"Add Category"} />
        </ListItem>
        <ListItem
          onClick={() => history.push("/create/product")}
          button
          key={"add-product"}
        >
          <ListItemIcon>
            <AddShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary={"Add Product"} />
        </ListItem>
        <ListItem
          onClick={() => history.push("/admin/products")}
          button
          key={"manage-products-admin"}
        >
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary={"Manage Products"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          onClick={() => history.push("/admin/orders")}
          button
          key={"view-orders-admin"}
        >
          <ListItemIcon>
            <BorderColorIcon />
          </ListItemIcon>
          <ListItemText primary={"View Orders"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Admin Dashboard</Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    props.history.push("/admin/dashboard");
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    signout(() => {
                      props.history.push("/");
                    })
                  }
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

AdminDashboard.propTypes = {
  container: PropTypes.any,
};

export default withRouter(AdminDashboard);
