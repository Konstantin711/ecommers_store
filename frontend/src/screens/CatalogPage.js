import React from "react";
import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Sidebar from "../components/Sidebar";

const product = {
  name: "Nike Dunk Low Retro",
  price: "6290",
  originalPrice: "6990",
  imageUrl: "/images/item_img_4.webp",
  onSale: true,
};

function CatalogPage() {
  return (
    <>
        <Container fluid>
      <Row>
        <Sidebar />
        <Col xs={10} id="page-content-wrapper">
          <Row>
            <Col>
              <Card style={{ width: "16rem", margin: "10px" }}>
                {product.onSale && (
                  <Badge
                    bg="danger"
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  >
                    Sale
                  </Badge>
                )}
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.onSale && (
                      <span className="text-muted">
                        <del>{product.originalPrice} грн.</del>{" "}
                      </span>
                    )}
                    {product.price} грн.
                  </Card.Text>
                  <Button className="buy-button">Купити</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: "16rem", margin: "10px" }}>
                {product.onSale && (
                  <Badge
                    bg="danger"
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  >
                    Sale
                  </Badge>
                )}
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.onSale && (
                      <span className="text-muted">
                        <del>{product.originalPrice} грн.</del>{" "}
                      </span>
                    )}
                    {product.price} грн.
                  </Card.Text>
                  <Button className="buy-button">Купити</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: "16rem", margin: "10px" }}>
                {product.onSale && (
                  <Badge
                    bg="danger"
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  >
                    Sale
                  </Badge>
                )}
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.onSale && (
                      <span className="text-muted">
                        <del>{product.originalPrice} грн.</del>{" "}
                      </span>
                    )}
                    {product.price} грн.
                  </Card.Text>
                  <Button className="buy-button">Купити</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: "16rem", margin: "10px" }}>
                {product.onSale && (
                  <Badge
                    bg="danger"
                    style={{ position: "absolute", top: "10px", right: "10px" }}
                  >
                    Sale
                  </Badge>
                )}
                <Card.Img variant="top" src={product.imageUrl} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.onSale && (
                      <span className="text-muted">
                        <del>{product.originalPrice} грн.</del>{" "}
                      </span>
                    )}
                    {product.price} грн.
                  </Card.Text>
                  <Button className="buy-button">Купити</Button>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Col>
      </Row>
      </Container>
    </>
  );
}

export default CatalogPage;
