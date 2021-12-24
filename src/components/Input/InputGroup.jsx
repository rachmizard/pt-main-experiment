import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

const InputGroup = ({
  controlId,
  label,
  name,
  as = "input",
  type = "text",
  placeholder,
  ...props
}) => {
  const [input, meta] = useField(name);

  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as={as}
        name={name}
        value={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        isInvalid={!!meta.error && meta.touched}
        type={type}
        placeholder={placeholder}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputGroup;
