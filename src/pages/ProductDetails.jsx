import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchProductById, deleteProduct } from '../api.js'
import { Card, Button, Spinner, Alert } from 'react-bootstrap'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.jsx'

function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchProductById(id)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false))
  }, [id])

  const handleDelete = () => {
    deleteProduct(id)
      .then(() => {
        setShowModal(false)
        navigate('/products')
      })
      .catch(() => setError('Failed to delete product'))
  }

  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!product) return null

  return (
    <>
      <h2>Product Details</h2>
      <Card>
        <Card.Img variant="top" src={product.image} alt={product.title} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>
            <strong>Category:</strong> {product.category}
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> ${product.price}
          </Card.Text>
          <Button as={Link} to={`/edit-product/${id}`} variant="primary" className="me-2">
            Edit
          </Button>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            Delete
          </Button>
        </Card.Body>
      </Card>

      <ConfirmDeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleDelete}
      />
    </>
  )
}

export default ProductDetails
