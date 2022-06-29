import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './Footer.css'

class Footer extends React.Component {
  render() {
    return (
      
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Scottie &amp; Brentice </Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
