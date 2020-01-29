import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
export default class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false, newPaletteName: '', emoji: '' };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleEmoji = emoji => {
    this.setState({ emoji: emoji.native });
  };
  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLocaleLowerCase() !== value.toLocaleLowerCase()
      )
    );
  }

  handleColorNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    this.props.handleSavePalette(this.state.newPaletteName, this.state.emoji);
    this.handleClose();
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          color="Secondary"
          onClick={this.handleClickOpen}
        >
          Save Palette
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Save Your Palette</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose A Name and Emoji For Your Palette and Save
            </DialogContentText>
            <Picker darkMode={false} onSelect={this.handleEmoji} />
            <ValidatorForm onSubmit={this.handleSubmit}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextValidator
                  label="Palette Name"
                  name="newPaletteName"
                  value={this.state.newPaletteName}
                  onChange={this.handleColorNameChange}
                  validators={['required', 'isPaletteNameUnique']}
                  errorMessages={['Enter a Name', 'Palette Name Already Exist']}
                  fullWidth
                  margin="normal"
                >
                  Rahul
                </TextValidator>
                <span style={{ fontSize: '24px' }}>{this.state.emoji}</span>
              </div>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button color="secondary" type="submit">
                  Save Palette
                </Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
