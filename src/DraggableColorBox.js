import React from 'react';
import { withStyles } from '@material-ui/styles';
import chroma from 'chroma-js';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { SortableElement } from 'react-sortable-hoc';

const styles = {
  root: {
    width: '100%',
    height: 'calc(25vh - 16px)',
    display: 'flex',
    flexDirection: 'column'
  },
  nameBox: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto 5px 0 5px',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    color: props => (chroma(props.color).luminance() >= 0.7 ? 'black' : 'white')
  },
  DeleteTwoToneIcon: {
    cursor: 'pointer',
    '&:hover svg': {
      transition: 'transform 300s ease-in-out'
    }
  }
};

const DraggableColorBox = SortableElement(props => {
  const { color, name, handleClick, classes } = props;
  return (
    <div style={{ backgroundColor: color }} className={classes.root}>
      <div className={classes.nameBox}>
        <span>{name}</span>
        <span className={classes.DeleteTwoToneIcon}>
          <DeleteTwoToneIcon onClick={handleClick} />
        </span>
      </div>
    </div>
  );
});
export default withStyles(styles)(DraggableColorBox);
