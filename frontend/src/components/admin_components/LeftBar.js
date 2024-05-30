import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Link } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

function LeftBar() {
  return (
    <Col sm={2} className="leftBar">
      <ListGroup>
        <ListGroup.Item>
          Замовлення
          <ul className="uk-list uk-list-disc mt-2">
            <li>
              <a href="/current-orders">Поточні замовлення</a>
            </li>
          </ul>
        </ListGroup.Item>
        <ListGroup.Item>
          Статистика
          <ul className="uk-list uk-list-disc mt-2">
            <li>
              <a href="/finished-orders">Успішні замовлення</a>
            </li>
            <li>
              <a href="/failed-orders">Втрачені замовлення</a>
            </li>
          </ul>
        </ListGroup.Item>
        <ListGroup.Item>
          Керування товарами
          <ul className="uk-list uk-list-disc mt-2">
            <li>
              <a href="/admin/add_new_item">Додати новий товар</a>
            </li>
            <li>
              <a href="/admin/change_item">Змінити товар</a>
            </li>
          </ul>
        </ListGroup.Item>
        <ListGroup.Item as={Link} to="/admin-price-wather">
          Монітор цін
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}

export default LeftBar;