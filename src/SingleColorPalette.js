import React, { Component } from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import Footer from './Footer';

import { Link } from 'react-router-dom';

export default class SingleColorPalette extends Component {
  constructor(props) {
    super(props);

    this.state = { format: 'hex' };
    this._shades = this.getShade(this.props.palette, this.props.colorId);
  }
  getShade(palette, colorToFilter) {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilter)
      );
    }
    return shades.slice(1);
  }

  changeFormat = format => {
    this.setState({ format });
  };
  render() {
    const { paletteName, emoji, id } = this.props.palette;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        background={color[this.state.format]}
        showLink={false}
      />
    ));
    return (
      <div className="palette">
        <NavBar handleChange={this.changeFormat} showSlider={false} />
        <div className="palette-colors">
          {colorBoxes}
          <Link to={`/palette/${id}`}>
            <div className="go-back-box">
              <div className="back-btn">Go Back</div>
            </div>
          </Link>
        </div>
        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
