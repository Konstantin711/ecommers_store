import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ToggleButton,
} from "react-bootstrap";

import Loader from "../../components/common_components/Loader";
import Message from "../../components/common_components/Message";
import ImageUpload from "../../components/admin_components/ImageUpload";
import { getItemPageData } from "../../redux/actions/newItemPageActions";

import axios from "axios";

function NewItemPage() {
  const dispatch = useDispatch();
  const itemPageData = useSelector((state) => state.itemPage);
  const { loading, error, data } = itemPageData;

  useEffect(() => {
    dispatch(getItemPageData());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    qty: 0,
    price: 0.0,
    fake_price: 0.0,
    description: "",
    images: [],
    parent_type: { title: "", slug: "" },
    category: [{ title: "", slug: "" }],
    item_sizes: [{ title: "", value: "" }],
    item_colors: [{ title: "", value: "", color_hex: "" }],
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [currentColor, setCurrentColor] = useState([]);

  const toggleSize = (size) => {
    const currentIndex = selectedSizes.indexOf(size);
    const newSelectedSizes = [...selectedSizes];

    if (currentIndex === -1) {
      newSelectedSizes.push(size);
    } else {
      newSelectedSizes.splice(currentIndex, 1);
    }

    setSelectedSizes(newSelectedSizes);
    setFormData((prevFormData) => ({
      ...prevFormData,
      item_sizes: newSelectedSizes.map((s) => ({ title: s, value: s })),
    }));
  };

  const toggleColor = (color) => {
    const currentIndex = currentColor.indexOf(color);
    const newSelectedColors = [...currentColor];

    if (currentIndex === -1) {
      newSelectedColors.push(color);
    } else {
      newSelectedColors.splice(currentIndex, 1);
    }

    setCurrentColor(newSelectedColors);
    setFormData((prevFormData) => ({
      ...prevFormData,
      item_colors: newSelectedColors.map((s) => ({ title: s, value: s })),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "parent_type") {
      const selectedOption = e.target.selectedOptions[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        parent_type: { slug: value, title: selectedOption.text },
      }));
    } else if (name === "category") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: [{ title: value, slug: value }],
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (acceptedFiles) => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        images: acceptedFiles,
    }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug', formData.slug);
    data.append('qty', formData.qty);
    data.append('price', formData.price);
    data.append('fake_price', formData.fake_price);
    data.append('description', formData.description);

    data.append('parent_type', JSON.stringify(formData.parent_type));
    data.append('category', JSON.stringify(formData.category));
    data.append('item_sizes', JSON.stringify(formData.item_sizes));
    data.append('item_colors', JSON.stringify(formData.item_colors));

    formData.images.forEach((file, index) => {
      data.append(`images[${index}]`, file);
  });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add/new-item/",
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("Товар успішно додано:", response.data);
    } catch (error) {
      console.error("Помилка при додаванні товару:", error);
    }
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <h2 className="admin-h1">Додати товар</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title" className="mb-2">
                <Form.Label className="form-title-admin">
                  Назва товару / Item title - не більше 160 символів
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="slug" className="mb-2">
                <Form.Label className="form-title-admin">
                  Slug - ідентифікатор товара
                </Form.Label>
                <Form.Control
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="qty" className="mt-2">
                    <Form.Label className="form-title-admin">
                      Кількість
                    </Form.Label>
                    <Form.Control
                      style={{ width: "100%" }}
                      type="number"
                      name="qty"
                      value={formData.qty}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="price" className="mt-2">
                    <Form.Label className="form-title-admin">Ціна</Form.Label>
                    <Form.Control
                      style={{ width: "100%" }}
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="fake_price" className="mt-2">
                    <Form.Label className="form-title-admin">
                      Фейкова ціна
                    </Form.Label>
                    <Form.Control
                      style={{ width: "100%" }}
                      type="number"
                      step="0.01"
                      name="fake_price"
                      value={formData.fake_price}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="description" className="mt-2">
                <Form.Label className="form-title-admin">Опис</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group controlId="parent_type" className="mt-2">
                    <Form.Label className="form-title-admin">
                      Стать товара / жіночі-чоловічі
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="parent_type"
                      value={formData.parent_type.slug}
                      onChange={handleChange}
                      required
                      className="custom-option"
                    >
                      <option value="">Виберіть стать</option>
                      {data &&
                        data.types &&
                        data.types.map((types, index) => (
                          <option key={index} value={types.slug}>
                            {types.title}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="category" className="mt-2">
                    <Form.Label className="form-title-admin">
                      Категорії
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="category"
                      value={formData.category.slug}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Виберіть категорію</option>
                      {data &&
                        data.categories &&
                        data.categories.map((category, index) => (
                          <option key={index} value={category.slug}>
                            {category.title}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="item_sizes" className="mt-2">
                    <p className="form-title-admin">Розмір: </p>
                    {data &&
                      data.sizes &&
                      data.sizes.map((size, index) => (
                        <ToggleButton
                          className="item-sizes-button"
                          key={index}
                          id={`size-${index}`}
                          name="item_sizes"
                          type="checkbox"
                          variant={
                            selectedSizes.includes(size.title)
                              ? "secondary"
                              : "outline-secondary"
                          }
                          value={size.title}
                          onClick={() => toggleSize(size.title)}
                        >
                          {size.title.toUpperCase()}
                        </ToggleButton>
                      ))}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="item_colors" className="mt-2">
                  <p className="form-title-admin">Кольори: </p>

                    {data &&
                      data.colors &&
                      data.colors.map((color, index) => (
                        <ToggleButton
                          className="item-colors-button"
                          // style={{ background: color.color_hex }}
                          key={index}
                          id={`color-${color}`}
                          name="item_colors"
                          type="checkbox"
                          variant={
                            currentColor.includes(color.title)
                              ? "secondary"
                              : "outline-secondary"
                          }
                          value={color.slug}
                          onClick={() => toggleColor(color.title)}
                        >
                          {color.title.toUpperCase()}
                        </ToggleButton>
                      ))}
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="image" className="mb-3 mt-2">
                <Form.Label className="form-title-admin">
                  Завантажити зображення
                </Form.Label>
                <ImageUpload onImageUpload={handleImageUpload} />
                {formData.images && <p>{formData.images.name}</p>}
              </Form.Group>

              <Button variant="primary" type="submit">
                Додати товар
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default NewItemPage;
