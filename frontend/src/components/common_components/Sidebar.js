import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Col,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { getDetailedCatalogPageData } from "../../redux/actions/catalogPageActions";

const Sidebar = () => {
  const { slug, type } = useParams();
  const dispatch = useDispatch();

  const [selectedSizes, setSelectedSizes] = useState([]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryChoiceHandler = (event) => {
    const { name, checked } = event.target;

    setSelectedCategories((prevState) => {
      let updatedCategories;
      if (checked) {
        updatedCategories = [...prevState, name];
      } else {
        updatedCategories = prevState.filter((item) => item !== name);
      }

      // Викликаємо dispatch тут, з використанням нового стану
      dispatch(getDetailedCatalogPageData(updatedCategories, slug, type));

      return updatedCategories;
    });
  };

  return (
    <Col>
      <Form className="slider-block mt-2">
        <Form.Label className="sidebar-text">Категорія</Form.Label>
        <Form.Group className="catalog-sidebar-navigation">
          <Form.Check
            id="oversize"
            type="checkbox"
            label="Оверсайз"
            name="oversize"
            className="catalog-checkbox catalog-checkbox-label"
            onClick={categoryChoiceHandler}
          />

          <Form.Check
            id="checkbox"
            type="checkbox"
            label="Повсякденний"
            name="casual"
            className="catalog-checkbox catalog-checkbox-label"
            onClick={categoryChoiceHandler}
          />
          <Form.Check
            id="fit"
            type="checkbox"
            label="Фіт"
            name="fit"
            className="catalog-checkbox catalog-checkbox-label"
            onClick={categoryChoiceHandler}
          />
        </Form.Group>

        <Form.Label className="sidebar-text">Принт</Form.Label>
        <Form.Group className="catalog-sidebar-navigation">
          <Form.Check
            id="street_wear"
            type="checkbox"
            label="street wear"
            name="street_wear"
            onClick={categoryChoiceHandler}
            className="catalog-checkbox catalog-checkbox-label"
          />
          <Form.Check
            id="games"
            type="checkbox"
            label="games"
            name="games"
            onClick={categoryChoiceHandler}
            className="catalog-checkbox catalog-checkbox-label"
          />
          <Form.Check
            id="sphinx"
            type="checkbox"
            label="sphinx"
            name="sphinx"
            onClick={categoryChoiceHandler}
            className="catalog-checkbox catalog-checkbox-label"
          />
        </Form.Group>
      </Form>
    </Col>
  );
};

export default Sidebar;
