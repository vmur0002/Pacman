import React from "react";
import PropTypes from "prop-types";
import classes from "./Pacman.css";
import pacmanImage from "./images/pacman.png";

const Pacman = props => {
  return (
    <img
      className={[classes.pacman, classes[props.direction]].join(" ")}
      src={pacmanImage}
      alt="pacman"
    />
  );
};

Pacman.propTypes = {
  direction: PropTypes.string.isRequired
};

export default Pacman;
