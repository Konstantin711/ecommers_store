import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

import "bootstrap/dist/css/bootstrap.min.css";

import CartItem from "../../components/common_components/cartItem";
import { getNovaPostCities,getNovaPostDepartments, getCartPageData }
 from '../../redux/actions/cartPageActions'



function Cart() {

  const dispatch = useDispatch();

  // CHOSEN ITEMS

  const cartPageInformation = useSelector((state) => state.cartPage);
  const { cart_loading, cart_error, cartPageItems } = cartPageInformation;

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
    console.log(dataFromLocalStorage)
    dispatch(getCartPageData(dataFromLocalStorage));

  }, [dispatch]);

















  // CHOSEN ITEMS
  // ORDER CONFIRMATION BLOCK
  
  const { loading, error, novaPostData } = useSelector(
    (state) => state.confirmationReducer
  );

  const orderFromLocalStorage = localStorage.getItem("cartItems");

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [newOrder, setnewOrder] = useState("");

  useEffect(() => {
    dispatch(getNovaPostCities("Київ"));
  }, [dispatch]);

  const handleDepartments = async (selectedCity) => {
    dispatch(getNovaPostDepartments(selectedCity));
  };

  const cities = [];
  for (let i = 0; i < novaPostData.cities.length; i++) {
    cities.push({
      value: novaPostData.cities[i].region,
      label: novaPostData.cities[i].region,
      ref: novaPostData.cities[i].delivery_city,
    });
  }

  const departments = [];
  for (let i = 0; i < novaPostData.departments.length; i++) {
    departments.push({
      value: novaPostData.departments[i].region,
      label: novaPostData.departments[i].region,
    });
  }

  // асінхронно підвантажую міста за пошуком
  const loadCityOptions = async (search) => {
    try {
      dispatch(getNovaPostCities(search));

      const userCities = [];
      for (let i = 0; i < novaPostData.cities.length; i++) {
        userCities.push({
          value: novaPostData.cities[i].region,
          label: novaPostData.cities[i].region,
        });
      }

      return {
        options: cities,
      };
    } catch (error) {
      console.error("Error loading city options", error);
      return { options: [], hasMore: false };
    }
  };
  // асінхронно підвантажую міста за пошуком

  useEffect(() => {
    handleDepartments(selectedCity.ref);
  }, [selectedCity]);

  const [cardPay, setCardPay] = useState("");

  const handlePayTypeChange = (e) => {
    setCardPay(e.target.value);
  };

  // ORDER CONFIRMATION BLOCK

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h3>Обрані товари</h3>
          {cartPageItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </Col>
        <Col md={6}>
          <h3>Контакти замовника</h3>
          <Form>
            <Form.Group>
              <Form.Label>Місто*</Form.Label>
              <AsyncPaginate
                required
                id="city"
                value={selectedCity}
                loadOptions={loadCityOptions}
                onChange={(selectedOption) => {
                  setSelectedCity(selectedOption);
                }}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Відділення*</Form.Label>
              <Select
                required
                id="department"
                value={selectedDepartment}
                options={departments}
                isSearchable
                onChange={(selectedOption) => {
                  setSelectedDepartment(selectedOption);
                }}
                isDisabled={!selectedCity.label}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Спосіб оплати*</Form.Label>
              <Form.Select
                required
                id="pay_type"
                onChange={handlePayTypeChange}
                value={cardPay}
              >
                <option key={1} value={"Оплата при отриманні"}>
                  {" "}
                  Оплата при отриманні
                </option>
                <option key={2} value={"Оплата карткою"}>
                  Оплата карткою
                </option>
              </Form.Select>
            </Form.Group>

            {cardPay === "Оплата карткою" && (
              <p>Менеджер звʼяжеться з вами для уточнення деталей</p>
            )}

            <Form.Group className="mt-3">
              <Form.Label>Ім'я*</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Введіть ім'я"
                id="name"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Прізвище*</Form.Label>
              <Form.Control
                required
                type="surname"
                placeholder="Введіть прізвище"
                id="surname"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Телефон*</Form.Label>
              <Form.Control
                required
                type="phone"
                placeholder="Введіть телефон"
                id="phone"
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Пошта*</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Введіть пошту"
                id="email"
              />
            </Form.Group>

            <Button
              className="mt-3"
              type="submit"
              // onClick={(e) => confirmOrderHandler(e)}
            >
              Оформити
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
