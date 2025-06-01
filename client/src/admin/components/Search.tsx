import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const navigate = useNavigate()
  const [inputValue, setinputValue] = useState('')
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent | any) => {
    e.preventDefault()
    if (inputValue.trim().length <= 2) {
      toast.error('input a correct value')
    } else {
      navigate(`/admin/orders/search/${inputValue}`)
    }
  }
  return (
    <Form className="d-flex" id="form" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search by user id"
        className="me-2 py-2"
        aria-label="Search"
        onChange={handleInputChange}
        value={inputValue}
      />
      <button className="btn btn-customx" type="submit">
        Search
      </button>
    </Form>
  )
}
