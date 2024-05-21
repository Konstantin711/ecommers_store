import React, { useState } from "react";
import { CirclePicker } from 'react-color';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRuler } from '@fortawesome/free-solid-svg-icons';

import { Container, Row, Col, Image, Form, Button, ToggleButton, ButtonGroup, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



function ItemPage() {

  const [color, setColor] = useState("#f44336");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50'];


  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ];

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

  return (
    <Container>
      <>
        <Row>
          <Col sm={12} md={12} lg={6} xl={6} className="me-5 mt-2">
            <div uk-slider="true">
              <div
                className="uk-position-relative uk-visible-toggle uk-dark"
                tabIndex="-1"
              >
                <ul className="uk-slider-items uk-grid">
                  <li key="1" className="uk-width-4-5">
                    <div className="uk-panel">
                      <img
                        src="../images/item_img_1.webp"
                        width="550"
                        max_width="650"
                        height="400"
                        alt=""
                      />
                      <div className="uk-position-bottom uk-text-center"></div>
                    </div>
                  </li>

                  <li key="1" className="uk-width-4-5">
                    <div className="uk-panel">
                      <img
                        src="../images/item_img_4.webp"
                        width="550"
                        max_width="650"
                        height="400"
                        alt=""
                      />
                      <div className="uk-position-bottom uk-text-center"></div>
                    </div>
                  </li>
                </ul>
                <a
                  className="uk-position-center-left uk-position-small"
                  href="true"
                  uk-slidenav-previous="true"
                  uk-slider-item="previous"
                ></a>
                <a
                  className="uk-position-center-right uk-position-small uk-emphasis"
                  href="true"
                  uk-slidenav-next="true"
                  uk-slider-item="next"
                ></a>
              </div>
              <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
            </div>
          </Col>

          <Col lg={5}>
            <h3 className="mt-2 uk-text-lead uk-text-bold item-title">
              <span className="item-sub-title">Футболка</span> Nice light beige
              skate oversize
            </h3>
            <div>
              <div className="mt-3 item-description">
                Oversize футболка дозволить рухатися абсолютно вільно і вдало
                доповнить будь-який образ. Ще трохи опису про товар.
              </div>

              <Row className="mt-3">
                <Col className="mt-3 item-composition">
                  {/* <p className="size-title">Склад: </p> */}
                  - 10% еластан <br />
                  - 90% бавовна <br />- 180 gm
                </Col>

                <Col>
                  <span className="item-price">
                    {" "}
                    <span className="price-title"> Вартість: </span> 495 грн{" "}
                  </span>
                  <div className="uk-text-right buy-block">
                    <Button className="mt-2 buy-button-item-page">
                      Купити
                    </Button>
                  </div>
                </Col>
              </Row>

              <div className="mt-4 mb-2 item-price-block">
                <p className="size-title">Розмір: </p>

                {sizes.map((size) => (
                  <ToggleButton
                    className="item-sizes-button"
                    key={size}
                    id={`size-${size}`}
                    type="checkbox"
                    variant={
                      selectedSizes.includes(size)
                        ? "secondary"
                        : "outline-secondary"
                    }
                    value={size}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </ToggleButton>
                ))}
              </div>

              <div className="mt-3">
                <p className="mb-2 size-title">Кольори: </p>

                <CirclePicker
                  color={color}
                  colors={colors}
                  onChangeComplete={handleChangeComplete}
                />
              </div>

                <div className="mt-4">
                  <a onClick={handleShow} className="sizes-table-link">
                  <FontAwesomeIcon icon={faRuler} size="1x" className="me-2"/>
                    Таблиця розмірів
                  </a>
                </div>
            

              <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                  <Modal.Title>Таблиця розмірів:</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                  <Image src="../images/tshirt_example.jpeg" className="size-img" rounded />
                  <table cellpadding="15" className="size-table">
                    <tbody>
                      <tr><th></th><th>XS</th><th>S</th><th>M</th><th>L</th><th>XL</th><th>XXL</th></tr>
                      <tr><th>Довжина, см</th><td>71</td><td>72</td><td>73</td><td>73</td><td>74</td><td>74</td></tr>
                      <tr><th>Рукав, см</th><td>26</td><td>26</td><td>26</td><td>28</td><td>28</td><td>28</td></tr>
                      <tr><th>Груди, см</th><td>53</td><td>55</td><td>57</td><td>59</td><td>61</td><td>63</td></tr>
                      <tr><th>Плечі, см</th><td>48</td><td>49</td><td>50</td><td>51</td><td>52</td><td>53</td></tr>
                    </tbody>
                  </table>
                </Modal.Body>
              </Modal>


            </div>
          </Col>
        </Row>
      </>
    </Container>
  );
}

export default ItemPage;
