import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const isLinkActive = (history, path) => {
  if (history.location.pathname === path) {
    return true;
  } else {
    return false;
  }
};

const Menu = ({ history }) => (
  <AppBar style={{ background: "#047BD5" }} position="static">
    <Toolbar>
      <Link style={{ textDecoration: "none", paddingLeft: "3%" }} to="/">
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            borderBottom: isLinkActive(history, "/") ? "2px solid white" : "",
          }}
        >
          <div
            style={{
              paddingRight: "25%",
              paddingTop: "25%",
              paddingBottom: "25%",
            }}
          >
            Home
          </div>
        </div>
      </Link>

      <Link style={{ textDecoration: "none", paddingLeft: "3%" }} to="/shop">
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            borderBottom: isLinkActive(history, "/shop")
              ? "2px solid white"
              : "",
          }}
        >
          <div
            style={{
              paddingRight: "25%",
              paddingTop: "25%",
              paddingBottom: "25%",
            }}
          >
            Shop
          </div>
        </div>
      </Link>

      <Link style={{ textDecoration: "none", paddingLeft: "3%" }} to="/cart">
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            borderBottom: isLinkActive(history, "/cart")
              ? "2px solid white"
              : "",
          }}
        >
          <div
            style={{
              paddingRight: "25%",
              paddingTop: "25%",
              paddingBottom: "25%",
            }}
          >
            Cart
          </div>
        </div>
      </Link>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <Link
          style={{ textDecoration: "none", paddingLeft: "2.5%" }}
          to="/user/dashboard"
        >
          <div
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              borderBottom: isLinkActive(history, "/user/dashboard")
                ? "2px solid white"
                : "",
            }}
          >
            <div
              style={{
                paddingRight: "25%",
                paddingTop: "25%",
                paddingBottom: "25%",
              }}
            >
              Dashboard
            </div>
          </div>
        </Link>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <Link
          style={{ textDecoration: "none", paddingLeft: "3%" }}
          to="/admin/dashboard"
        >
          <div
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              borderBottom: isLinkActive(history, "/admin/dashboard")
                ? "2px solid white"
                : "",
            }}
          >
            <div
              style={{
                paddingRight: "25%",
                paddingTop: "25%",
                paddingBottom: "25%",
              }}
            >
              Dashboard
            </div>
          </div>
        </Link>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <Link
            style={{ textDecoration: "none", paddingLeft: "3%" }}
            to="/signin"
          >
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                borderBottom: isLinkActive(history, "/signin")
                  ? "2px solid white"
                  : "",
              }}
            >
              <div
                style={{
                  paddingRight: "25%",
                  paddingTop: "25%",
                  paddingBottom: "25%",
                }}
              >
                SignIn
              </div>
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none", paddingLeft: "3%" }}
            to="/signup"
          >
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                borderBottom: isLinkActive(history, "/signup")
                  ? "2px solid white"
                  : "",
              }}
            >
              <div
                style={{
                  paddingRight: "25%",
                  paddingTop: "25%",
                  paddingBottom: "25%",
                }}
              >
                SignUp
              </div>
            </div>
          </Link>
        </Fragment>
      )}

      {isAuthenticated() && (
        <div style={{ textDecoration: "none", paddingLeft: "3%" }}>
          <Button
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
            style={{
              color: "#047BD5",
              background: "white",
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </Toolbar>
  </AppBar>
);

const Menu2 = ({ history }) => (
  <AppBar style={{ background: "#047BD5" }} position="static">
    <Toolbar>
      <Link style={{ textDecoration: "none", paddingLeft: "3%" }} to="/">
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            borderBottom: isLinkActive(history, "/") ? "2px solid white" : "",
          }}
        >
          <div
            style={{
              paddingRight: "25%",
              paddingTop: "25%",
              paddingBottom: "25%",
            }}
          >
            Home
          </div>
        </div>
      </Link>

      <Link style={{ textDecoration: "none", paddingLeft: "3%" }} to="/shop">
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            borderBottom: isLinkActive(history, "/shop")
              ? "2px solid white"
              : "",
          }}
        >
          <div
            style={{
              paddingRight: "25%",
              paddingTop: "25%",
              paddingBottom: "25%",
            }}
          >
            Shop
          </div>
        </div>
      </Link>

      <Link style={{ textDecoration: "none", paddingLeft: "3%" }} to="/cart">
        <div
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            borderBottom: isLinkActive(history, "/cart")
              ? "2px solid white"
              : "",
          }}
        >
          <div
            style={{
              paddingRight: "25%",
              paddingTop: "25%",
              paddingBottom: "25%",
            }}
          >
            Cart
          </div>
        </div>
      </Link>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <Link
          style={{ textDecoration: "none", paddingLeft: "2.5%" }}
          to="/user/dashboard"
        >
          <div
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              borderBottom: isLinkActive(history, "/user/dashboard")
                ? "2px solid white"
                : "",
            }}
          >
            <div
              style={{
                paddingRight: "25%",
                paddingTop: "25%",
                paddingBottom: "25%",
              }}
            >
              Dashboard
            </div>
          </div>
        </Link>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <Link
          style={{ textDecoration: "none", paddingLeft: "3%" }}
          to="/admin/dashboard"
        >
          <div
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              borderBottom: isLinkActive(history, "/admin/dashboard")
                ? "2px solid white"
                : "",
            }}
          >
            <div
              style={{
                paddingRight: "25%",
                paddingTop: "25%",
                paddingBottom: "25%",
              }}
            >
              Dashboard
            </div>
          </div>
        </Link>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <Link
            style={{ textDecoration: "none", paddingLeft: "3%" }}
            to="/signin"
          >
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                borderBottom: isLinkActive(history, "/signin")
                  ? "2px solid white"
                  : "",
              }}
            >
              <div
                style={{
                  paddingRight: "25%",
                  paddingTop: "25%",
                  paddingBottom: "25%",
                }}
              >
                SignIn
              </div>
            </div>
          </Link>
          <Link
            style={{ textDecoration: "none", paddingLeft: "3%" }}
            to="/signup"
          >
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                borderBottom: isLinkActive(history, "/signup")
                  ? "2px solid white"
                  : "",
              }}
            >
              <div
                style={{
                  paddingRight: "25%",
                  paddingTop: "25%",
                  paddingBottom: "25%",
                }}
              >
                SignUp
              </div>
            </div>
          </Link>
        </Fragment>
      )}

      {isAuthenticated() && (
        <div style={{ textDecoration: "none", paddingLeft: "3%" }}>
          <Button
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
            style={{
              color: "#047BD5",
              background: "white",
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </Toolbar>
  </AppBar>
);

export default withRouter(Menu);
