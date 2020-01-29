import React, { Component } from 'react';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import styles from './styles/NewPaletteFormStyles';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { Typography } from '@material-ui/core';
import seedColor from './seedColor';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      colors: seedColor[0].colors
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = newColor => {
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ''
    });
  };

  handleColorNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSavePalette = (newName, emoji) => {
    const newPalette = {
      paletteName: newName,
      emoji: emoji,
      id: newName.replace(/ /g, '-').toLocaleLowerCase(),
      colors: this.state.colors
    };
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  };

  deleteColor = colorName => {
    console.log('delete');
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };
  clearColors = () => {
    this.setState({ colors: [] });
  };
  addRandomColor = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    var rand = Math.floor(Math.random() * allColors.length);
    var randomColor = allColors[rand];
    var color = this.state.colors.every(
      color => color.color !== randomColor.color
    );
    if (color) this.setState({ colors: [...this.state.colors, randomColor] });
    else this.addRandomColor();
  };
  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    var paletteFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          classes={classes}
          open={open}
          palettes={palettes}
          handleSavePalette={this.handleSavePalette}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.sideBar}>
            <Typography varient="h3">Add A Color</Typography>
            <Button
              variant="outlined"
              color="Disabled"
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={colors.length >= maxColors}
              onClick={this.addRandomColor}
            >
              Random Color
            </Button>
            <Divider />
            <ColorPickerForm
              paletteFull={paletteFull}
              addNewColor={this.addNewColor}
              colors={this.state.colors}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <div className={classes.colorBoxArea}>
            <DraggableColorList
              colors={this.state.colors}
              deleteColor={this.deleteColor}
              axis="xy"
              onSortEnd={this.onSortEnd}
              distance={1}
            />
          </div>
        </main>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);
