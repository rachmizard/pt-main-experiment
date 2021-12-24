import React from "react";
import { useField } from "formik";
import { Form, ProgressBar } from "react-bootstrap";

const InputFileGroup = ({
  controlId,
  label,
  name,
  onUploadFile,
  status,
  fileKey,
  isUploading,
  progress,
}) => {
  const [input, meta] = useField(name);

  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        name={name}
        onBlur={input.onBlur}
        isInvalid={!!meta.error && meta.touched}
        isValid={input.value && status}
        onChange={async (e) => {
          input.onChange(e);
          await onUploadFile(fileKey, e);
        }}
        accept="video/*,image/*"
      />

      <Form.Control.Feedback type="valid">
        File was upload at <a href={input.value}>Click to See.</a>
      </Form.Control.Feedback>

      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>

      {isUploading && (
        <ProgressBar
          className="mt-3 mb-3"
          label={`${progress}%`}
          animated
          now={progress}
          striped
        />
      )}
    </Form.Group>
  );
};

export default InputFileGroup;
