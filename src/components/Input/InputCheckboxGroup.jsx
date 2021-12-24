import React from "react";
import { useField } from "formik";
import { Form } from "react-bootstrap";

const InputCheckboxGroup = ({ controlId, label, name }) => {
  const [input, meta] = useField(name);

  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Check
        name={name}
        value={input.value}
        onChange={input.onChange}
        type="checkbox"
        label={label}
      />
      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputCheckboxGroup;
