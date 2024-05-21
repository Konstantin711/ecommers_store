import React from "react";
import Slider from "../components/Slider";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Slider />

      {/* <hr class="uk-divider-small"></hr> */}
      <h2 className="text-center mt-5 mb-5 new-items">Нові надходження</h2>

      <Row className="mb-5 main-row">
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_1.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_1.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_1.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
      </Row>

      <Row className="main-row ">
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_1.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_1.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_1.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
      </Row>

      {/* Акційні товари */}
      <h2 className="text-center mt-5 mb-5 new-items">Акційні товари</h2>
      <Row className="main-row mb-5">
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_4.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_4.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_4.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
      </Row>

      <Row className="main-row">
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_4.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_4.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
        <Col>
        <Link to="#">
          <Card style={{ width: "25rem", height: "25rem" }}>
            <Card.Body className="category-card">
              <Card.Img
                className="category-img"
                variant="bottom"
                src="images/item_img_4.webp"
              />
              <span className="category-card-text">
                <Card.Text>Крута біла футболка</Card.Text>
              </span>
            </Card.Body>
          </Card>
        </Link>
        </Col>
      </Row>

      {/* Акційні товари */}
    </>
  );
}

export default HomePage;
