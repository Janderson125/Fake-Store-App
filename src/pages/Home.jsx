import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="text-center mt-5">
      <h1>Welcome to the Fake Store 🛒</h1>
      <p className="lead">Browse products and explore details.</p>
      <Button variant="primary" onClick={() => navigate('/products')}>
        View Products
      </Button>
    </div>
  )
}

export default Home
