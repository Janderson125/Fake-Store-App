import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById, updateProduct } from '../api.js'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'

function EditProduct() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProductById(id)
      .then((res) => {
        const data = res.data
        setTitle(data.title)
        setPrice(data.price)
        setDescription(data.description)
        setCategory(data.category)
        setError(null)
      })
      .catch(() => setError('Failed to load product.'))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaving(true)
    updateProduct(id, { title, price: Number(price), description, category })
      .then(() => {
        setSuccess('Product updated successfully!')
        setError(null)
      })
      .catch(() => {
        setError('Failed to update product.')
        setSuccess(null)
      })
      .finally(() => setSaving(false))
  }

  if (loading) return <Spinner animation="border" />

  return (
    <>
      <h2>Edit Product</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Update Product'}
        </Button>
      </Form>
    </>
  )
}

export default EditProduct
