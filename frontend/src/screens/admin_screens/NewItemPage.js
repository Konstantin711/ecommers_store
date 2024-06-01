import React, { useState, useCallback } from "react";
import { CirclePicker } from "react-color";
import { useDropzone } from "react-dropzone";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ToggleButton,
} from "react-bootstrap";

import axios from "axios";

const ImageUpload = ({ onImageUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onImageUpload(acceptedFiles);
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Перетягніть зображення сюди ...</p>
      ) : (
        <p>Перетягніть зображення сюди, або натисніть для вибору файлу</p>
      )}
    </div>
  );
};

function NewItemPage({ categories, parentTypes }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    qty: 0,
    price: 0.0,
    fake_price: 0.0,
    description: "",
    parent_type: "",
    category: [],
    item_sizes: [],
    item_colors: [],
  });

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
  ];
  const [color, setColor] = useState("#f44336");
  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newValues = checked
        ? [...formData[name], value]
        : formData[name].filter((v) => v !== value);
      setFormData({ ...formData, [name]: newValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (acceptedFiles) => {
    setFormData({ ...formData, image: acceptedFiles[0] });
  };
  const handleColorChangeComplete = (color) => {
    setFormData({ ...formData, item_colors: [...formData.item_colors, color.hex] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // const data = new FormData();
    // data.append('title', formData.title);
    // data.append('slug', formData.slug);
    // data.append('qty', formData.qty);
    // data.append('price', formData.price);
    // data.append('fake_price', formData.fake_price);
    // data.append('description', formData.description);
    // data.append('parent_type', formData.parent_type);
    // formData.category.forEach(cat => data.append('category', cat));
    // formData.item_sizes.forEach(size => data.append('item_sizes', size));
    // formData.item_colors.forEach(color => data.append('item_colors', color));
    // if (formData.image) {
    // data.append('image', formData.image);
    // }

    // try {
    // const response = await axios.post('/api/products/', data, {
    //     headers: {
    //     'Content-Type': 'multipart/form-data',
    //     },
    // });
    // console.log('Товар успішно додано:', response.data);
    // } catch (error) {
    // console.error('Помилка при додаванні товару:', error);
    // }
  };

  return (
    <Container>
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
                Slug - ідентифікатор товара</Form.Label>
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
                    Кількість</Form.Label>
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
                  <Form.Label className="form-title-admin">
                    Ціна</Form.Label>
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
                    Фейкова ціна</Form.Label>
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
                    Стать товара / жіночі-чоловічі</Form.Label>
                  <Form.Control
                    as="select"
                    name="parent_type"
                    value={formData.parent_type}
                    onChange={handleChange}
                    required
                    className="custom-option"
                  >
                    <option value="">Виберіть стать</option>
                    <option key="1" value="men">
                      чоловічі
                    </option>
                    <option key="2" value="women">
                      жіночі
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="category" className="mt-2">
                  <Form.Label className="form-title-admin">
                    Категорії</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Виберіть категорію</option>
                    <option key="1" value="tshirts">
                      футболки
                    </option>
                    <option key="2" value="hudi">
                      худі
                    </option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="item_sizes" className="mt-2">
                  <p className="form-title-admin">Розмір: </p>
                  {sizes.map((size) => (
                    <ToggleButton
                      className="item-sizes-button"
                      key={size}
                      id={`size-${size}`}
                      name="item_sizes"
                      type="checkbox"
                      variant={
                        selectedSizes.includes(size)
                          ? "secondary"
                          : "outline-secondary"
                      }
                      value={size}
                      onChange={handleChange}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </ToggleButton>
                  ))}
                </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId="item_colors" className="mt-2">
              <Form.Label className="form-title-admin">Кольори</Form.Label>
              <CirclePicker
                name="item_colors"
                colors={colors}
                onChangeComplete={handleColorChangeComplete}
              />
            </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label className="form-title-admin">
                Завантажити зображення</Form.Label>
              <ImageUpload onImageUpload={handleImageUpload} />
              {formData.image && <p>{formData.image.name}</p>}
            </Form.Group>

            <Button variant="primary" type="submit">
              Додати товар
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default NewItemPage;
