import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import wiggle from './img/wiggle.svg';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { blue, red } from '@material-ui/core/colors';

const styles = {
  root: {
    background: `#394bad url(${wiggle})`,
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#f4f4f4',
    '& a': {
      color: '#f4f4f4',
      fontSize: '18px',
      marginLeft: '2rem'
    }
  },
  palettes: {
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gap: '5%',
    width: '100%'
  },
  '@media (max-width: 780px)': {
    palettes: {
      gridTemplateColumns: '1fr 1fr',
      gap: '5%'
    },
    container: {
      width: '80%',
      maxWidth: '440px'
    },
    nav: {
      flexDirection: 'column',
      padding: '1rem 0'
    }
  },
  '@media (max-width: 500px)': {
    palettes: {
      gridTemplateColumns: '1fr',
      gap: '1%'
    }
  },
  '@global': {
    '.fade-exit': {
      opacity: 1,
      transition: 'opacity 480ms ease'
    },
    '.fade-exit-active': {
      opacity: 0
    }
  }
};

class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDeleteDialog: false,
      deletingPaletteId: ''
    };
  }
  openDialog = id => {
    this.setState({ openDeleteDialog: true, deletingPaletteId: id });
  };
  closeDialog = () => {
    this.setState({ openDeleteDialog: false });
  };
  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };
  handleDeletePalette = () => {
    this.props.deletePalette(this.state.deletingPaletteId);
    this.closeDialog();
  };
  resetApp = () => {
    if (window.confirm('You Sure You Want To Reset?')) {
      window.localStorage.clear();
      window.location.reload();
    }
  };
  render() {
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Color Picker</h1>
            <div>
              <Link to="" onClick={this.resetApp}>
                Reset App
              </Link>
              <Link to="/palette/new">Create New Palette ➜</Link>
            </div>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map(pal => (
              <CSSTransition key={pal.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...pal}
                  handleClick={this.goToPalette}
                  deletePalette={this.openDialog}
                  key={pal.id}
                  id={pal.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog open={this.state.openDeleteDialog} onClose={this.closeDialog}>
          <DialogTitle>Delete This Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDeletePalette}>
              <ListItemAvatar>
                <Avatar
                  style={{
                    backgroundColor: red[100],
                    color: red[600]
                  }}
                >
                  <CheckIcon></CheckIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete">Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar
                  style={{
                    backgroundColor: blue[100],
                    color: blue[600]
                  }}
                >
                  <CloseIcon></CloseIcon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel">Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
