import React from "react";
import classes from "./Layout.css";

const Layout = props => (
  <section className={classes.section}>{props.children}</section>
);

export default Layout;
