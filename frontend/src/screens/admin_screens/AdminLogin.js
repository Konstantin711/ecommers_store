// src/components/Login.js
import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from 'react-bootstrap';


import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/accounts/login/",
        {
          username,
          password,
        }
      );
      if (response.data.message === "Login successful") {
        // Збереження даних користувача
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Редирект на адмінку
        window.location.href = "/admin";
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Введіть email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Введіть пароль" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Увійти
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
