import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


import Sidebar from "../../components/common_components/Sidebar";
import Loader from "../../components/common_components/Loader";
import Message from "../../components/common_components/Message";
import { getCatalogPageData } from "../../redux/actions/catalogPageActions";


const product = {
  name: "Nike Dunk Low Retro",
  price: "6290",
  originalPrice: "6990",
  imageUrl: "/images/item_img_4.webp",
  onSale: true,
};

function CatalogPage() {

  const dispatch = useDispatch();
  const catalogPageData = useSelector((state) => state.catalogPage);
  const { loading, error, data } = catalogPageData;

  useEffect(() => {
    dispatch(getCatalogPageData());
  }, [dispatch]);


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
