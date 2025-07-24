import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com/products'

export const fetchProducts = () => axios.get(BASE_URL)

export const fetchProductById = (id) => axios.get(`${BASE_URL}/${id}`)

export const addProduct = (productData) => axios.post(BASE_URL, productData)

export const updateProduct = (id, productData) => axios.put(`${BASE_URL}/${id}`, productData)

export const deleteProduct = (id) => axios.delete(`${BASE_URL}/${id}`)
