import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.title}
        style={{ objectFit: 'contain', height: '200px' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price.toFixed(2)}</Card.Text>
        <Link to={`/products/${product.id}`} className="btn btn-primary mt-auto">
          View Details
        </Link>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
