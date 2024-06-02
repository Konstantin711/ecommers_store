import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CirclePicker } from "react-color";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ToggleButton,
} from "react-bootstrap";

import Loader from '../../components/common_components/Loader'
import Message from '../../components/common_components/Message'
import ImageUpload from '../../components/admin_components/ImageUpload'
import { getItemPageData } from '../../redux/actions/newItemPageActions'

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
    parent_type: { title: "", slug: "" },
    category: { title: "", slug: "" },
    item_sizes: [{ title: "", value: "" },],
    item_colors: [{ title: "", value: "", color_hash: "" },],
  });

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["#ffffff", "#000000"];

  const [color, setColor] = useState("#ffffff");

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
    setFormData((prevFormData) => ({
      ...prevFormData,
      item_sizes: { sizes: newSelectedSizes },
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const newValues = checked
        ? [...formData[name]['sizes'], value]
        : formData[name]['sizes'].filter((v) => v !== value);
      setFormData({ ...formData, ['sizes']: newValues });
    } 
      else if (name === "parent_type") {
        const selectedOption = e.target.selectedOptions[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          parent_type: { slug: value, title: selectedOption.text },
      }));
    } else if (name === "category") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: { category: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = (acceptedFiles) => {
    setFormData({ ...formData, image: acceptedFiles[0] });
  };

  const handleColorChangeComplete = (color) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      item_colors: {
        colors: [...prevFormData.item_colors.colors, color.hex],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const data = {
      title: formData.title,
      slug: formData.slug,
      qty: formData.qty,
      price: formData.price,
      fake_price: formData.fake_price,
      description: formData.description,
      parent_type: formData.parent_type,
      category: formData.category,
      item_sizes: formData.item_sizes,
      item_colors: formData.item_colors,
      image: formData.image, 
      // Пряме додавання зображення може не працювати з JSON
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/add/new-item/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
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
      ): error ? (
        <Message variant="danger">{error}</Message>
      ): (
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
                    {data && data.types && data.types.map((types, index) => (
                      <option key={index} value={types.slug}>
                        {types.title}
                      </option>
                    ))}
                    
                   
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="category" className="mt-2">
                  <Form.Label className="form-title-admin">Категорії</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={formData.category.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Виберіть категорію</option>
                    {data && data.categories && data.categories.map((category, index) => (
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
                  {data && data.sizes && data.sizes.map((size) => (
                    <ToggleButton
                      className="item-sizes-button"
                      key={size}
                      id={`size-${size.slug}`}
                      name="item_sizes"
                      type="checkbox"
                      variant={
                        selectedSizes.includes(size.title)
                          ? "secondary"
                          : "outline-secondary"
                      }
                      value={size}
                      onChange={handleChange}
                      onClick={() => toggleSize(size.title)}
                    >
                      {size.title.toUpperCase()}
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
                Завантажити зображення
              </Form.Label>
              <ImageUpload onImageUpload={handleImageUpload} />
              {formData.image && <p>{formData.image.name}</p>}
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
