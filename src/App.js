import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColor from './seedColor';
import { generatePalette } from './colorHelpers';
import PalleteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

// CSS
import './App.css';

// Component

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = { palettes: savedPalettes || seedColor };
  }

  findPalette = id => {
    return this.state.palettes.find(palette => palette.id === id);
  };
  savePalette = newPalette => {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  };
  syncLocalStorage = () => {
    window.localStorage.setItem(
      'palettes',
      JSON.stringify(this.state.palettes)
    );
  };
  deletePalette = id => {
    this.setState(
      st => ({
        palettes: st.palettes.filter(palette => palette.id !== id)
      }),
      this.syncLocalStorage
    );
  };
  render() {
    const { palettes } = this.state;
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <PalleteList
              palettes={palettes}
              {...routeProps}
              deletePalette={this.deletePalette}
            />
          )}
        />
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPaletteForm
              {...routeProps}
              savePalette={this.savePalette}
              palettes={this.state.palettes}
            />
          )}
        />

        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id.toLowerCase())
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(
                  routeProps.match.params.paletteId.toLowerCase()
                )
              )}
            />
          )}
        />
        <Route
          exact
          render={routeProps => (
            <PalleteList
              palettes={palettes}
              {...routeProps}
              deletePalette={this.deletePalette}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
