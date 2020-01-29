import React, { Component } from 'react';
import Slider from 'rc-slider';
import { Select, MenuItem, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';

//CSS
import 'rc-slider/assets/index.css';
import './NavBar.css';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: 'hex',
      open: false
    };
  }

  handleFormatChange = e => {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  };

  closeSnack = () => {
    this.setState({ open: false });
  };

  render() {
    const { level, changeLevel, showSlider } = this.props;
    const { format } = this.state;

    return (
      <nav className="navbar">
        <div className="logo">
          <Link to="/">ColorPicker</Link>
        </div>
        {showSlider && (
          <div className="slider">
            <p>Darkness: {level}</p>
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
          </div>
        )}
        <div className="select-container">
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #000</MenuItem>
            <MenuItem value="rgb">RGB - RGB(0,0,0)</MenuItem>
            <MenuItem value="rgba">RGBA - RGBA(0,0,0,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={this.state.open}
          autoHideDuration={2000}
          message={
            <span id="message-id">
              Color Mode Changed To {format.toUpperCase()}
            </span>
          }
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          onClose={this.closeSnack}
          action={[
            <IconButton
              onClick={this.closeSnack}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon color="inherit"></CloseIcon>
            </IconButton>
          ]}
        />
      </nav>
    );
  }
}
