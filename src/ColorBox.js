import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

//CSS
import './ColorBox.css';

//Markup

const styles = {
  darkText: {
    color: props =>
      chroma(props.background).luminance() >= 0.7 ? 'black' : 'white !important'
  },
  lightText: {
    color: props =>
      chroma(props.background).luminance() >= 0.09 ? 'white' : 'black'
  }
};

class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  render() {
    const { name, background, paletteId, id, showLink, classes } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className="color-box">
          <div
            style={{ background }}
            className={`copy-overlay ${copied && 'show'}`}
          ></div>
          <div className={`copy-msg ${copied && 'show'}`}>
            <h1 className={classes.darkText}>COPIED!</h1>
            <p className={classes.darkText}>{background}</p>
          </div>
          <div className="copy-container">
            <div className={`copy-btn ${classes.darkText}`}>Copy</div>
            <div className={`box-content ${classes.darkText}`}>{name}</div>
            {showLink && (
              <Link
                className="see-more-link"
                to={`/palette/${paletteId}/${id}`}
                onClick={e => e.stopPropagation}
              >
                <div className={`see-more ${classes.darkText}`}>More ➜</div>
              </Link>
            )}
          </div>
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
