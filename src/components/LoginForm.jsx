import React, { useState } from "react";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showToast, setShowToast] = useState(false);

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
      setShowToast(true);
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
      <ToastContainer position="top-center" className="p-3">
        <Toast
          show={showToast}
          animation
          autoHide
          bg="warning"
          onClose={() => setShowToast(false)}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Alert</strong>
          </Toast.Header>
          <Toast.Body>
            <p className="fw-bold text-white">{error}</p>
          </Toast.Body>
        </Toast>
      </ToastContainer>{" "}
    </>
  );
};

export default LoginForm;
