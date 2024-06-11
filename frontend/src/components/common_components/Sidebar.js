import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  ButtonGroup,
  Button,
  ToggleButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const sizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ];

  const [selectedSizes, setSelectedSizes] = useState([]);


  const toggleSize = (size) => {
    const currentIndex = selectedSizes.indexOf(size);
    const newSelectedSizes = [...selectedSizes];

    if (currentIndex === -1) {
      newSelectedSizes.push(size);
    } else {
      newSelectedSizes.splice(currentIndex, 1);
    }

    setSelectedSizes(newSelectedSizes);
  };

  return (
    <Col>
      <Form className="slider-block">
        <Form.Label className="sidebar-text">Категорія</Form.Label>
        <Form.Group className="">
          <Form.Check type="checkbox" label="Оверсайз" className="catalog-checkbox catalog-checkbox-label"/>
          <Form.Check type="checkbox" label="Повсякденний" className="catalog-checkbox catalog-checkbox-label"/>
          <Form.Check type="checkbox" label="Фіт" className="catalog-checkbox catalog-checkbox-label"/>
        </Form.Group>

        <Form.Label className="sidebar-text">Принт</Form.Label>
        <Form.Group className="">
          <Form.Check type="checkbox" label="street wear" className="catalog-checkbox catalog-checkbox-label"/>
          <Form.Check type="checkbox" label="games" className="catalog-checkbox catalog-checkbox-label"/>
          <Form.Check type="checkbox" label="sphinx" className="catalog-checkbox catalog-checkbox-label"/>
        </Form.Group>

      </Form>
    </Col>
  );
};

export default Sidebar;
