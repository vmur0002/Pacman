import React from "react";
import classes from "./Header.css";

const Header = props => (
  <header className={classes.container}>
    <h1 className={classes.h1}>Welcome to Pacman Simulator!</h1>
    <ul className={classes.ul}>
      <li>Please Enter the commands below to access the Pacman</li>
      <li>MOVE - Pacman move forward</li>
      <li>LEFT - pacman turns left</li>
      <li>RIGHT - pacman turns right</li>
      <li>PLACE - Pacman goes to default position</li>
      <li>REPORT - Shows the coordinates of the pacman's location</li>
    </ul>
  </header>
);

export default Header;
