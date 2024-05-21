import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";

function TopHeader() {
  return (
    <>
      <Navbar className="top-header">
        <Container className="d-flex justify-content-between align-items-center">
          <Nav>
            <Nav.Link href="#" className="th-link">
              Про нас
            </Nav.Link>
            <span className="vertical-divider divider">|</span>
            <Nav.Link href="#" className="th-link">
              Оплата та Доставка
            </Nav.Link>
          </Nav>
          <a href="tel:+380000000000" className="h-phone">
            +38 (000) 000-00-00
          </a>
          <div className="d-flex align-items-center">
            <i className="fab fa-instagram me-3 fa-xs instagram"></i>
            <i className="fab fa-tiktok me-3 fa-xs tiktok"></i>
          </div>
          <div>
            <i className="fas fa-user-plus fa-xs login"></i>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default TopHeader;
