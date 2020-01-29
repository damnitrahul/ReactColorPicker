import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
const styles = {
  root: {
    background: 'white',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover svg': {
      opacity: 1
    }
  },
  colors: {
    background: 'grey',
    width: '100%',
    height: '150px',
    display: 'grid',
    gridTemplateColumns: 'repeat(5,1fr)',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative'
  },
  emoji: {},
  miniColor: {},
  deleteIcon: {
    position: 'absolute',
    padding: '.35rem',
    backgroundColor: '#ea3d30',
    right: 0,
    top: 0,
    borderRadius: '0 0 0 4px',
    opacity: '0',
    transition: 'opacity 500ms ease',
    color: '#292f31'
  }
};

class MiniPalette extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }
  deletePalette = e => {
    e.stopPropagation();
    this.props.deletePalette(this.props.id);
  };

  render() {
    const { classes, paletteName, emoji, colors, handleClick, id } = this.props;
    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      ></div>
    ));
    return (
      <div className={classes.root} onClick={() => handleClick(id)}>
        <DeleteTwoToneIcon
          className={classes.deleteIcon}
          onClick={this.deletePalette}
        />
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
