import React from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";


function MainHeader() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">THIRTS SHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Футболки" id="basic-nav-dropdown" className="dark-dropdown-menu">
              <div className="d-flex">
                <div className="flex-fill">
                  <NavDropdown.Item href="/catalog/men/all" className='men-tshirts'>Чоловічі футболки</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.1" className='menu-item'>Базові</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" className='menu-item'>Оверсайз</NavDropdown.Item>
                </div>
                <div className="flex-fill">
                  <NavDropdown.Item href="/catalog/women/all" className='men-tshirts'>Жіночі футболки</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.1" className='menu-item'>Базові</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2" className='menu-item'>Оверсайз</NavDropdown.Item>
                </div>
              </div>
            </NavDropdown>
          </Nav>
          <div>
            <i className="bi bi-cart"></i>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainHeader;
