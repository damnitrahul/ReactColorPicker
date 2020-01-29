import React, { Component } from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import Footer from './Footer';
import './Palette.css';

//Component
export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500,
      format: 'hex'
    };
  }

  changeLevel = level => {
    this.setState({ level });
  };
  changeFormat = format => {
    this.setState({ format });
  };

  handleChange = val => {
    alert(val);
  };
  render() {
    let { level, format } = this.state;
    let { colors, paletteName, emoji, id } = this.props.palette;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        id={color.id}
        paletteId={id}
        showLink={true}
      />
    ));

    return (
      <div className="palette">
        <NavBar
          level={level}
          handleChange={this.changeFormat}
          changeLevel={this.changeLevel}
          showSlider={true}
        />
        <div className="palette-colors">{colorBoxes}</div>
        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
