import React from "react";
import Tile from "../../../components/Tile/Tile";
import classes from "../Grid.css";

// Assign constant for grid dimension
// Grid is responsive to different sizes of row and columns
const GRID_DIMENSIONS = { row: 5, column: 5 };

// All tile coordinates will go into this array
let TILE_COORDINATES = [];

// Render method for grid
export const renderSurface = pacmanPlace => {
  // Dimensions and tile types
  const { row, column } = GRID_DIMENSIONS;
  const tileTypes = {
    0: "edge",
    1: "ground"
  };

  // Essential rows
  let edge = Array(row + 2).fill(tileTypes[0]);
  let ground = Array(row).fill(tileTypes[1]);

  // Single edge tile for surface rows
  const edgeTile = place => (
    <Tile
      key={`tile_edge_${place}`}
      id={`tile_edge_${place}`}
      type={tileTypes[0]}
      isPacmanHere={false}
    />
  );

  // Edge row
  const edgeRow = edge.map((tileType, index) => {
    return (
      <Tile
        key={`tile_edge${index}`}
        id={`tile_edge${index}`}
        type={tileType}
        isPacmanHere={false}
      />
    );
  });

  /* eslint-disable no-loop-func */
  let surfaceRows = [];
  TILE_COORDINATES = [];

  // Creating ground tiles which pacman roams around: groundRows
  // Assign coordinates to each tile
  for (let y = 0; y < column; y++) {
    const groundRow = ground.map((tileType, index) => {
      const tileCoordinates = `tile_x${index}y${y}`;
      const pacmanCoordinates = `tile_x${pacmanPlace.x}y${pacmanPlace.y}`;

      // Save tile coordinates
      TILE_COORDINATES.push(tileCoordinates);

      // Determine is pacman on this tile
      let isPacmanHere = false;
      pacmanCoordinates === tileCoordinates
        ? (isPacmanHere = true)
        : (isPacmanHere = false);

      return (
        <Tile
          id={`tile_x${index}y${y}`}
          key={`tile_x${index}y${y}`}
          type={tileType}
          isPacmanHere={isPacmanHere}
          pacmanDirection={pacmanPlace.f}
        />
      );
    });

    const surfaceRow = [edgeTile("start"), ...groundRow, edgeTile("finish")];
    surfaceRows.push(surfaceRow);
  }

  // Creating the grid
  const grid = [edgeRow, ...surfaceRows, edgeRow];

  // JSX output for grid named as surface
  const surface = grid.map((row, index) => (
    <div key={`surfaceRow_${index}`} className={classes.row}>
      {row}
    </div>
  ));

  return surface;
};

// Return new place or update current place of pacman
export const place = (x, y, f) => {
  let pacman = {
    initialized: true,
    isOnGrid: true,
    place: {
      x: x,
      y: y,
      f: f
    }
  };

  return pacman;
};

// Take any move command and process
// Replace pacman if it is allowed
export const move = pacman => {
  // Deep clone for replaced pacman
  const movedPacman = {
    ...pacman,
    place: {
      ...pacman.place
    }
  };

  const direction = pacman.place.f;

  // Move one unit in the direction which pacman faces
  switch (direction) {
    case "EAST":
      movedPacman.place.x++;
      break;
    case "WEST":
      movedPacman.place.x--;
      break;
    case "NORTH":
      movedPacman.place.y++;
      break;
    case "SOUTH":
      movedPacman.place.y--;
      break;
    default:
      return pacman;
  }

  // Calculate next tile coordinates
  const nextTileCoordinates = `tile_x${movedPacman.place.x}y${
    movedPacman.place.y
  }`;

  // Check next tile coordinates is in tiles coordinates array
  // if it is not command is invalid
  if (TILE_COORDINATES.includes(nextTileCoordinates)) {
    return movedPacman;
  } else {
    return pacman;
  }
};

// Turn pacman to left
export const left = pacman => {
  const direction = pacman.place.f;

  switch (direction) {
    case "NORTH":
      pacman.place.f = "WEST";
      break;
    case "WEST":
      pacman.place.f = "SOUTH";
      break;
    case "SOUTH":
      pacman.place.f = "EAST";
      break;
    case "EAST":
      pacman.place.f = "NORTH";
      break;
    default:
      return pacman;
  }

  return pacman;
};

// Turn pacman to right
export const right = pacman => {
  const direction = pacman.place.f;

  switch (direction) {
    case "NORTH":
      pacman.place.f = "EAST";
      break;
    case "EAST":
      pacman.place.f = "SOUTH";
      break;
    case "SOUTH":
      pacman.place.f = "WEST";
      break;
    case "WEST":
      pacman.place.f = "NORTH";
      break;
    default:
      return pacman;
  }

  return pacman;
};

// Report the location of pacman
// returns an array for display to user
export const report = pacman => [
  pacman.place.x,
  pacman.place.y,
  pacman.place.f
];
