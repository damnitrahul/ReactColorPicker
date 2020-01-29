import React, { Component } from 'react';
import PaletteMetaForm from './PaletteMetaForm';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import CssBaseLine from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import QueueIcon from '@material-ui/icons/Queue';
import Button from '@material-ui/core/Button';

export default class PaletteFormNav extends Component {
  render() {
    const { classes, open, palettes, handleSavePalette } = this.props;
    return (
      <div>
        <CssBaseLine />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <ToolBar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <QueueIcon />
            </IconButton>
            <div className={classes.ToolBar}>
              <Typography variant="h5" color="inherit" noWrap>
                Create Your Palette
              </Typography>

              <div className={classes.ToolBarInner}>
                <Link to="/">
                  <Button color="primary">Go Back</Button>
                </Link>

                <PaletteMetaForm
                  handleSavePalette={handleSavePalette}
                  palettes={palettes}
                />
              </div>
            </div>
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}
