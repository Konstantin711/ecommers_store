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
  const [price, setPrice] = useState([0, 500]);
  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
    "38-42",
    "42-46",
    "46-50",
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
        <Form.Label className="sidebar-price">Ціна</Form.Label>
        <Form.Group>
          <Form.Range
            value={price}
            onChange={(e) => setPrice([e.target.value, price[1]])}
            min={0}
            max={500}
          />
          <div className="d-flex justify-content-between price-text">
            <span>{price[0]} грн.</span>
            <span>{price[1]} грн.</span>
          </div>
        </Form.Group>

        <Form.Label className="sidebar-text">Категорія</Form.Label>
        <Form.Group className="category-checkboxes">
          <Form.Check type="checkbox" label="Оверсайз" />
          <Form.Check type="checkbox" label="Повсякденний" />
          <Form.Check type="checkbox" label="Фіт" />
        </Form.Group>

        <Form.Label className="sidebar-text">Розмір</Form.Label>
        <Form.Group>
          <ButtonGroup className="flex-wrap">
            {sizes.map((size) => (
              <ToggleButton
                className="sizes-button"
                key={size}
                id={`size-${size}`}
                type="checkbox"
                variant={selectedSizes.includes(size) ? 'secondary' : 'outline-secondary'}
                value={size}
                onClick={() => toggleSize(size)}
              >
                {size}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default Sidebar;
