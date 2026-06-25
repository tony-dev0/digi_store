import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent | any) => {
    e.preventDefault();
    if (inputValue.trim().length <= 2) {
      toast.error("input a correct value");
    } else {
      navigate(`/products/search/${inputValue}`);
    }
  };
  return (
    <Form className="d-flex" id="form" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search a product"
        className="me-2"
        aria-label="Search"
        onChange={handleInputChange}
        value={inputValue}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
}
