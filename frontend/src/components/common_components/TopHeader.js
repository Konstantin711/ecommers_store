import React from "react";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Container,
  Nav
} from "react-bootstrap";

function TopHeader() {

  // const dispatch = useDispatch()
  const headerInfo = useSelector((state) => state.headerReducer)
  const { loading, error, userInfo } = headerInfo
  
  const logoutHandler = (e) => {
    e.preventDefault()
    // dispatch(logout())
  }

  const [user, setUser] = useState(userInfo);
  useEffect(() => {
     setUser(userInfo);
   }, [userInfo]);

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

      {user && user.name ? (
        <>
          <div className="d-flex align-items-center ">
            <NavDropdown title={user.email} className="user-email login-menu">
              <NavDropdown.Item>Кабінет</NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => logoutHandler(e)}>
                Вийти
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </>
      ) : (
        <div className="justify-content-end">
          <Link to="/login">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
            </svg>
            {/* <span className="login-text">Увійти</span> */}
          </Link>
        </div>
      )}
    </Container>
  </Navbar>
</>

  );
}

export default TopHeader;
