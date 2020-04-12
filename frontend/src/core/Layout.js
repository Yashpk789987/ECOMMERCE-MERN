import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import Home from "./Home";
import Signin from "../user/Signin";
import Signup from "../user/Signup";
import Shop from "./Shop";

import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const tab = 0;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Home" {...a11yProps(tab)} />
          <Tab label="Shop" {...a11yProps(tab + 1)} />
          <Tab label="Cart" {...a11yProps(tab + 2)} />
          {!isAuthenticated() && [
            <Tab label="Login" {...a11yProps(tab + 3)} />,
            <Tab label="Register" {...a11yProps(tab + 4)} />,
          ]}
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
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
                    props.history.push("/user/dashboard");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    signout(() => {
                      props.history.push("/");
                    });
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={tab} dir={theme.direction}>
        <Home />
      </TabPanel>
      <TabPanel value={value} index={tab + 1} dir={theme.direction}>
        <Shop />
      </TabPanel>
      <TabPanel value={value} index={tab + 2} dir={theme.direction}>
        Item Three
      </TabPanel>
      {!isAuthenticated() && (
        <TabPanel value={value} index={tab + 3} dir={theme.direction}>
          <Signin />
        </TabPanel>
      )}
      {!isAuthenticated() && (
        <TabPanel value={value} index={tab + 4} dir={theme.direction}>
          <Signup />
        </TabPanel>
      )}
    </div>
  );
}
