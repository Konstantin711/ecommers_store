import React from 'react'
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <>
      <footer className="text-light text-center footer">
        <Row>
          <Col lg={2} xl={2}></Col>
          <Col sm={12} md={12} lg={2} xl={2} className='footer-logo'>
            <h3>T-SHIRTS STORE</h3>
            <p className='footer-sell-text'>
              Здійсніть замовлення на суму від 1000 грн. <br />При оформленні замовлення введіть промокод “t-shirt” та отримайте
              -10% на всі товари у кошику.
            </p>
          </Col>
        
          <Col sm={12} md={12} lg={2} xl={2}> 
            <p>СТОРІНКИ</p>

            <Link to={'#'} >Оплата й доставка</Link>
            <br/>
            <Link to={'#'}>Контактна інформація</Link>
            <br/>
            <Link to={'#'}>Публічний договір</Link>
          </Col>
          <Col sm={12} md={12} lg={2} xl={2}>
            <p>КОНТАКТИ</p>
            <p>м. Одеса, Україна <br />
            050 888 88 88 <br />
            shirts-store@gmail.com</p>
          </Col>
          <Col sm={12} md={12} lg={2} xl={2}>
            <p>Соціальні мережі</p>
            <p>Instagram</p>
            <p>TikTok</p>
          </Col>
          <Col lg={2} xl={2}></Col>
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

export default Footer