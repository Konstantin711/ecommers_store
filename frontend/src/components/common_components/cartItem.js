import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartItem = ({ item }) => {
  return (
    <Card className="mb-3">
      <Row noGutters>
        <Col md={4}>
          <Card.Img variant="top" src={item.image} />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>
              <strong>Розмір: </strong> {item.size.toUpperCase()} <br />
              <strong>Колір: </strong> <span style={{ backgroundColor: item.color, padding: '0 10px' }}>{item.color}</span><br />
              <strong>Вартість: </strong> {item.price} <br />
            </Card.Text>
            <Button variant="danger">Видалити</Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
