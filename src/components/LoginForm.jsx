import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import useAuth from "src/hooks/useAuth";
import usePopup from "src/hooks/usePopup";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [showPopup] = usePopup();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await login(form);

      navigate("/", { replace: true });
    } catch (err) {
      showPopup({
        show: true,
        bg: "warning",
        message: error,
      });
    }
  };

  return (
    <>
      <Form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            name="email"
            value={form.email}
            onChange={(e) => handleChange(e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={form.password}
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {!loading ? "Submit" : "Loading..."}
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
