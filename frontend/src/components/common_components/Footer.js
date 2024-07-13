import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer className="text-light text-center footer">
        <Row className="footer-row">
          <Col lg={2} xl={2}></Col>

          <Col sm={12} md={12} lg={2} xl={2} className="footer-logo">
            <h3>MATCH TOBI</h3>
            <p>Магазин одягу ...</p>
          </Col>

          <Col sm={12} md={12} lg={2} xl={2}>
            <p className="footer-title">СТОРІНКИ</p>

            <ul className="footer-pages">
              <li>
                <a to={"#"}>Оплата й доставка</a>
              </li>
              <li>
                <a to={"#"}>Контактна інформація</a>
              </li>
              <li>
                <a to={"#"}>Публічний договір</a>
              </li>
            </ul>
          </Col>

          <Col sm={12} md={12} lg={2} xl={2}>
            <p className="footer-title">КОНТАКТИ</p>

            <ul className="footer-pages">
              <li>shirts-store@gmail.com</li>
              <li>050 888 88 88</li>
              <li>м. Одеса, Україна</li>
            </ul>
          </Col>

          <Col sm={12} md={12} lg={2} xl={2}>
            <p className="footer-title">Соціальні мережі</p>

            <ul className="footer-pages">
              <li>
                <a to={"#"}>Instagram</a>
              </li>
              <li>
                <a to={"#"}>TikTok</a>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
      <footer className="text-light text-center small-footer">
        <div className="small-footer-container">
          <p>&copy; 2023 - Now. УСІ ПРАВА ЗАХИЩЕНІ</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
