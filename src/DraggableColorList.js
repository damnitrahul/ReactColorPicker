import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  colorBoxArea: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5,1fr)',
    justifyContent: 'flex-start',
    width: '100%',
    '@media (max-width: 980px)': {
      gridTemplateColumns: 'repeat(2,1fr)'
    }
  }
};
const DraggableColorList = SortableContainer(
  ({ colors, deleteColor, classes }) => {
    return (
      <div className={classes.colorBoxArea}>
        {colors.map((color, i) => (
          <DraggableColorBox
            color={color.color}
            name={color.name}
            key={color.name}
            index={i}
            handleClick={() => deleteColor(color.name)}
          />
        ))}
      </div>
    );
  }
);
export default withStyles(styles)(DraggableColorList);
