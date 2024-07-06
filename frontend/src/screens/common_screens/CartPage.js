import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Form, Button, Container } from "react-bootstrap";
import Select from "react-select";
import { AsyncPaginate } from "react-select-async-paginate";

import "bootstrap/dist/css/bootstrap.min.css";

import CartItem from "../../components/common_components/cartItem";
import { getNovaPostCities,getNovaPostDepartments, getCartPageData, createNewOrder }
 from '../../redux/actions/cartPageActions'

import axios from 'axios'



function Cart() {

  const dispatch = useDispatch();

  // CHOSEN ITEMS

  const cartPageInformation = useSelector((state) => state.cartPage);
  const { cart_loading, cart_error, cartPageItems } = cartPageInformation;

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
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

  // Sending handler
  const [formData, setFormData] = useState({
    city: "",
    department: "",
    payment_type: "",
    customer_name: "",
    customer_surname: "",
    customer_phone: "",
    customer_post: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "payment_type") {
      const selectedOption = e.target.selectedOptions[0];
      console.log(selectedOption.label, 'from pay type')
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedOption.label,
      }));
    } 
    else {
      console.log(value)
      setFormData({ ...formData, [name]: value });
    }
  };


const cityHandler = async (selectedOption) => {
  console.log(selectedOption.value)
      setFormData((prevFormData) => ({
        ...prevFormData,
        "city": selectedOption.value,
      }));
}

const departmentHandler = async (selectedOption) => {
  console.log(selectedOption.value)
      setFormData((prevFormData) => ({
        ...prevFormData,
        "department": selectedOption.value,
      }));
}

const handleSubmit = async (e) => {
  e.preventDefault()
  console.log(formData)

  const data = new FormData();
  data.append('city', formData.city);
  data.append('department', formData.department);
  data.append('payment_type', formData.payment_type);
  data.append('customer_name', formData.customer_name);
  data.append('customer_surname', formData.customer_surname);
  data.append('customer_phone', formData.customer_phone);
  data.append('customer_post', formData.customer_post);

  data.append('ordered_items', JSON.stringify(cartPageItems))

  dispatch(createNewOrder(data))

  };



  return (
    <Container>
    <Row>
      {Object.keys(cartPageItems).length === 0 ? (
        <p>Кошик пустий</p>
      ) : (
        <>
          <Col md={6}>
            <h3>Обрані товари</h3>
            {Object.keys(cartPageItems).map((key, index) => (
              <CartItem key={index} item={cartPageItems[key]} />
            ))}
          </Col>
          <Col md={6}>
            <h3>Контакти замовника</h3>
            <Form>
              <Form.Group>
                <Form.Label>Місто*</Form.Label>
                <AsyncPaginate
                  required
                  name="delivery_city"
                  value={selectedCity}
                  loadOptions={loadCityOptions}
                  onChange={(selectedOption) => {
                    setSelectedCity(selectedOption);
                    cityHandler(selectedOption);
                  }}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Відділення*</Form.Label>
                <Select
                  required
                  name="post_department"
                  value={selectedDepartment}
                  options={departments}
                  isSearchable
                  onChange={(selectedOption) => {
                    setSelectedDepartment(selectedOption);
                    departmentHandler(selectedOption);
                  }}
                  isDisabled={!selectedCity.label}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Спосіб оплати*</Form.Label>
                <Form.Select
                  required
                  name="payment_type"
                  onChange={(event) => {
                    handlePayTypeChange(event);
                    handleChange(event);
                  }}
                  value={cardPay}
                >
                  <option key={1} value={"Оплата при отриманні"}>
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
                  type="input"
                  placeholder="Введіть ім'я"
                  onChange={handleChange}
                  name="customer_name"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Прізвище*</Form.Label>
                <Form.Control
                  required
                  type="input"
                  placeholder="Введіть прізвище"
                  name="customer_surname"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Телефон*</Form.Label>
                <Form.Control
                  required
                  type="input"
                  placeholder="Введіть телефон"
                  name="customer_phone"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Пошта*</Form.Label>
                <Form.Control
                  required
                  type="input"
                  placeholder="Введіть пошту"
                  name="customer_post"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                className="mt-3"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                Оформити
              </Button>
            </Form>
          </Col>
        </>
      )}
    </Row>
  </Container>
  
  );
}

export default Cart;
