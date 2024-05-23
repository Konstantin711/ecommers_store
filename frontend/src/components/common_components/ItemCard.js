import React from "react";


const product = {
    name: 'Nike Dunk Low Retro',
    price: '6290 грн.',
    originalPrice: '6990 грн.',
    imageUrl: 'path/to/nike-dunk-low-retro.jpg',
    onSale: true
  };
  

function ItemCard() {
  return (
    <>
      <Card style={{ width: "18rem", margin: "10px" }}>
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
          <Button variant="primary">Buy Now</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default ItemCard;
