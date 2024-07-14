import React from "react";
import { useDispatch } from "react-redux";

import { Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import {  deleteItemFromCart } from '../../redux/actions/cartPageActions'

const CartItem = ({ item, index }) => {

  const dispatch = useDispatch();

  const deleteItemHandler = (id) => {
    dispatch(deleteItemFromCart(id));
  };

  return (
    <Card className="mb-3">
      <Row noGutters>
        <Col md={4}>
          <Card.Img variant="top" src={item.image} />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Row>
              <Col md={10}>
                <Card.Title className="cart-item-title mb-3">{item.title}</Card.Title>
              </Col>
              <Col md={2} className="icon-col">
                <i
                  className="bi bi-x icon-position"
                  style={{ fontSize: "25px" }}
                  onClick={() => deleteItemHandler(index)}
                ></i>
              </Col>
            </Row>
            <Card.Text>
              <span className="cart-item-attributes">Розмір : </span> {item.size.toUpperCase()} <br />
              <span className="cart-item-attributes">Колір : </span>{" "}
              <span style={{ backgroundColor: item.color, padding: "0 10px", borderRadius: "10px"}}>
              </span>
              <br />
              <span className="cart-item-attributes">Вартість : </span> {item.price} грн <br />
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
