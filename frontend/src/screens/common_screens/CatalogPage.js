import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Card, Button, Badge, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Sidebar from "../../components/common_components/Sidebar";
import Loader from "../../components/common_components/Loader";
import Message from "../../components/common_components/Message";
import { getCatalogPageData } from "../../redux/actions/catalogPageActions";



function CatalogPage() {
  const dispatch = useDispatch();
  const catalogPageData = useSelector((state) => state.catalogPage);
  const { loading, error, data } = catalogPageData;

  const { slug, type } = useParams();


  useEffect(() => {
    dispatch(getCatalogPageData(slug, type));
  }, [dispatch]);

  return (
    <>
      <Container fluid>
        <Row>
          <Sidebar />
          <Col xs={10} id="page-content-wrapper">
            <Row>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error.message ? error.message : error}</Message>
              ) : (
                data && data.data && data.data.map((item, index) => (
                  <Col key={index}>
                    <Card style={{ width: "16rem", margin: "10px" }}>
                      {item.onSale && (
                        <Badge
                          bg="danger"
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                          }}
                        >
                          Sale
                        </Badge>
                      )}
                      <Card.Img variant="top" src={item.images} />
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>
                          {item.onSale && (
                            <span className="text-muted">
                              <del>{item.originalPrice} грн.</del>{" "}
                            </span>
                          )}
                          {item.price} грн.
                        </Card.Text>
                        <Button href={`/catalog/${item.slug}`} className="buy-button">Детальніше</Button>

                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CatalogPage;
