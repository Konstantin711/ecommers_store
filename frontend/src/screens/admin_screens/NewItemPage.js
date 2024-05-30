import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function NewItemPage({ categories, sizes, colors, parentTypes }) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        qty: 0,
        price: 0.0,
        fake_price: 0.0,
        description: '',
        parent_type: '',
        category: [],
        item_sizes: [],
        item_colors: []
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
          const newValues = checked
            ? [...formData[name], value]
            : formData[name].filter((v) => v !== value);
          setFormData({ ...formData, [name]: newValues });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Додайте логіку для відправки форми
      };


  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1>Додати товар</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Назва товару</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="slug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="qty">
              <Form.Label>Кількість</Form.Label>
              <Form.Control
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Ціна</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="fake_price">
              <Form.Label>Фейкова ціна</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="fake_price"
                value={formData.fake_price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Опис</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="parent_type">
              <Form.Label>Тип батька</Form.Label>
              <Form.Control
                as="select"
                name="parent_type"
                value={formData.parent_type}
                onChange={handleChange}
                required
              >
                {/* <option value="">Виберіть тип батька</option>
                {parentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.title}
                  </option>
                ))} */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Категорії</Form.Label>
              {/* {categories.map((cat) => (
                <Form.Check
                  key={cat.id}
                  type="checkbox"
                  label={cat.title}
                  name="category"
                  value={cat.id}
                  onChange={handleChange}
                  checked={formData.category.includes(cat.id)}
                />
              ))} */}
            </Form.Group>

            <Form.Group controlId="item_sizes">
              <Form.Label>Розміри</Form.Label>
              {/* {sizes.map((size) => (
                <Form.Check
                  key={size.id}
                  type="checkbox"
                  label={size.title}
                  name="item_sizes"
                  value={size.id}
                  onChange={handleChange}
                  checked={formData.item_sizes.includes(size.id)}
                />
              ))} */}
            </Form.Group>

            <Form.Group controlId="item_colors">
              <Form.Label>Кольори</Form.Label>
              {/* {colors.map((color) => (
                <Form.Check
                  key={color.id}
                  type="checkbox"
                  label={color.title}
                  name="item_colors"
                  value={color.id}
                  onChange={handleChange}
                  checked={formData.item_colors.includes(color.id)}
                />
              ))} */}
            </Form.Group>

            <Button variant="primary" type="submit">
              Додати товар
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default NewItemPage