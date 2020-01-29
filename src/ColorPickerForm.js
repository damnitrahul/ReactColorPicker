import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

// import styles from './styles/NewPaletteFormStyles';
// import seedColors from './seedColor';

import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class ColorPickerForm extends Component {
  constructor(props) {
    super(props);

    this.state = { currentColor: 'mint', newColorName: '' };
  }
  updateCurrentColor = color => {
    console.log(color.hex);
    this.setState({ currentColor: color.hex });
  };
  handleColorNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: '' });
  };
  componentDidMount() {
    ValidatorForm.addValidationRule('isNameUnique', value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }
  render() {
    const { paletteFull } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <SketchPicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            onChange={this.handleColorNameChange}
            validators={['required', 'isColorUnique', 'isNameUnique']}
            placeholder="Enter Color Name..."
            errorMessages={[
              'Enter a Name',
              'Color Already Exist',
              'Color Name Already Exist'
            ]}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            disabled={paletteFull}
            style={{ background: currentColor }}
          >
            {paletteFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
