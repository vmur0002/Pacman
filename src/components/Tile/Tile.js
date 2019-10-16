import React from "react";
import PropTypes from "prop-types";
import Pacman from "../Pacman/Pacman";
import classes from "./Tile.css";

const Tile = props => {
  return (
    <div
      id={props.id}
      className={[classes.tile, classes[props.type]].join(" ")}
    >
      {props.isPacmanHere ? <Pacman direction={props.pacmanDirection} /> : null}
    </div>
  );
};

Tile.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isPacmanHere: PropTypes.bool.isRequired,
  pacmanDirection: PropTypes.string
};

export default Tile;
