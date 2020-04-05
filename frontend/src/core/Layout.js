import React from "react";
import Menu from "./Menu";

const Layout = ({ children }) => (
  <>
    <Menu />
    <div>{children}</div>
  </>
);

export default Layout;
