import React from 'react';

export default function Footer(props) {
  return (
    <div>
      <footer className="footer-palette">
        {props.paletteName}
        <span className="footer-emoji"> {props.emoji}</span>
      </footer>
    </div>
  );
}
