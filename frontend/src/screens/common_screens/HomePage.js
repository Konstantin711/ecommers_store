import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Slider from "../../components/common_components/Slider";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import Loader from "../../components/common_components/Loader";
import Message from "../../components/common_components/Message";

import { getHomePageData } from "../../redux/actions/homePageActions";

function HomePage() {
  const dispatch = useDispatch();
  const homePageData = useSelector((state) => state.homeReducer);
  const { loading, error, data } = homePageData;

  useEffect(() => {
    dispatch(getHomePageData());
  }, [dispatch]);

  return (
    <>
      <Slider />

      <h2 className="text-center mt-5 mb-5 new-items">Нові надходження</h2>

      <Row className="mb-5 main-row">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error.message ? error.message : error}
          </Message>
        ) : (
          
          data &&
          data.data &&
          data.data.new_items.map((item, index) => (
            <Col key={index} className="mb-3">
              <Link to={`/catalog/${item.slug}`}>
                <Card style={{ width: "25rem", height: "25rem" }}>
                  <Card.Body className="category-card">
                    <Card.Img
                      className="category-img"
                      variant="bottom"
                      src={item.images}
                    />
                    <span className="category-card-text">
                      <Card.Text className="mb-0">{item.title}</Card.Text>
                      <p>{item.price} грн</p>
                    </span>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        )}

      <h2 className="text-center mt-5 mb-5 new-items">Акційні товари</h2>
        
      {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error.message ? error.message : error}
          </Message>
        ) : (
          
          data &&
          data.data &&
          data.data.sale_items.map((item, index) => (
            <Col key={index} className="mb-3">
              <Link to={`/catalog/${item.slug}`}>
                <Card style={{ width: "25rem", height: "25rem" }}>
                  <Card.Body className="category-card">
                    <Card.Img
                      className="category-img"
                      variant="bottom"
                      src={item.images}
                    />
                    <span className="category-card-text">
                      <Card.Text className="mb-0">{item.title}</Card.Text>
                      <p>{item.price} грн</p>
                    </span>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        )}

      </Row>
    </>
  );
}

export default HomePage;
