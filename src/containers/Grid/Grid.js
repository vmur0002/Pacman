import React, { Component } from "react";
import {
  renderSurface,
  place,
  move,
  left,
  right,
  report
} from "./Structure/Structure";
import classes from "./Grid.css";
//import App from '../../App';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    const commands = ['PLACE','MOVE','LEFT','RIGHT','REPORT'];
    if (commands.includes(this.state.value)) {
      const { pacman } = this.state;
      const { initialized, isOnGrid } = pacman;

      const pacmanWillBeUpdated = {
        ...pacman,
        place: {
          ...pacman.place
        }
      };

      if (initialized && isOnGrid) {
        let updatedPacman = {};
        if (this.state.value === 'PLACE') {
          //pacman will place in position
          updatedPacman = place(0, 0, "EAST");
        }
        else if (this.state.value === 'REPORT') {
          //pacman will show its location
          const pacmanPlace = report(pacman);
          window.alert(`Pacman place (X,Y and F) is: ${pacmanPlace}`);
          updatedPacman = pacmanWillBeUpdated;
        }
        else if (this.state.value === 'MOVE') {
          //pacman will move forward
          updatedPacman = move(pacmanWillBeUpdated);
        }
        else if (this.state.value === 'LEFT') {
          //pacman will turn left
          updatedPacman = left(pacmanWillBeUpdated);
        }
        else if (this.state.value === 'RIGHT') {
          //pacman will turn right
          updatedPacman = right(pacmanWillBeUpdated);
        }
        const updatedSurface = renderSurface(updatedPacman.place);
        this.setState({ pacman: updatedPacman, surface: updatedSurface });
      }
      else{
         // Pacman has not initialized
         if (!initialized || (!initialized && !isOnGrid)) {
          if (this.state.value === 'PLACE') {
            // Pacman places again
            const pacman = place(0, 0, "NORTH");
            this.setState({ pacman: pacman });
          } else {
            window.alert(
              "Pacman has not been initialized, yet. Please press 'P' to initialize his."
            );
          }
        } else if (!isOnGrid) {
          if (this.state.value === 'PLACE') {
            // Pacman will be placed again
            const pacman = place(0, 0, "NORTH");
            this.setState({ pacman: pacman });
          } else {
            window.alert(
              "Pacman is not on the grid. He is uncomfortable to move or report."
            );
          }
        }
      }
    }
    event.preventDefault();
  }
  state = {
    pacman: {
      initialized: false,
      isOnGrid: false,
      place: {
        x: 0,
        y: 0,
        f: "SOUTH"
      }
    },
    surface: [],
    loading: true
  };

  componentDidMount() {
    const pacman = place(2, 2, "EAST");
    const surface = renderSurface(pacman.place);
    this.setState({ pacman: pacman, surface: surface, loading: false });
    this.main.focus();
  }

  render() {
    return (
      <main
        className={classes.grid}
        onKeyDown={this.handleKeyDown}
        tabIndex="0"
        ref={main => {
          this.main = main;
        }}
      >
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter Command:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
        {this.state.loading ? (
          <p className={classes.loading}>Loading...</p>
        ) : (
          this.state.surface
        )}
      </main>
    );
  }
}

export default Grid;
