import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Spinner, Alert } from 'react-bootstrap'
import ProductCard from '../components/ProductCard.jsx'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">Error: {error}</Alert>

  return (
    <div>
      <h2>All Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ProductList
