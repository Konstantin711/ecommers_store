import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

import { getDetailedCatalogPageData } from '../../redux/actions/catalogPageActions'

const Sidebar = () => {
  const sizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ];

  const { slug, type } = useParams();
  const dispatch = useDispatch();

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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryChoiceHandler = (event) => {
    const { name, checked } = event.target;
  
    setSelectedCategories(prevState => {
      let updatedCategories;
      if (checked) {
        updatedCategories = [...prevState, name];
      } else {
        updatedCategories = prevState.filter(item => item !== name);
      }
      
      // Викликаємо dispatch тут, з використанням нового стану
      dispatch(getDetailedCatalogPageData(updatedCategories, slug, type));
  
      return updatedCategories;
    });
  };

  return (
    <Col>
      <Form className="slider-block">
        <Form.Label className="sidebar-text">Категорія</Form.Label>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Оверсайз"
            name="oversize"
            className="catalog-checkbox catalog-checkbox-label"
            onClick={categoryChoiceHandler}
          />

          <Form.Check
            type="checkbox"
            label="Повсякденний"
            name="casual"
            className="catalog-checkbox catalog-checkbox-label"
            onClick={categoryChoiceHandler}
          />
          <Form.Check
            type="checkbox"
            label="Фіт"
            name="fit"
            className="catalog-checkbox catalog-checkbox-label"
            onClick={categoryChoiceHandler}
          />
        </Form.Group>

        <Form.Label className="sidebar-text">Принт</Form.Label>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="street wear"
            name="street_wear"
            onClick={categoryChoiceHandler}
            className="catalog-checkbox catalog-checkbox-label"
          />
          <Form.Check
            type="checkbox"
            label="games"
            name="games"
            onClick={categoryChoiceHandler}
            className="catalog-checkbox catalog-checkbox-label"
          />
          <Form.Check
            type="checkbox"
            label="sphinx"
            name="sphinx"
            onClick={categoryChoiceHandler}
            className="catalog-checkbox catalog-checkbox-label"
          />
        </Form.Group>
        <div>
          <h4>Selected Categories:</h4>
          <ul>
            {selectedCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </div>
      </Form>
    </Col>
  );
};

export default Sidebar;
