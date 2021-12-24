import { FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";

import { InputDynamicCourse, InputGroup } from "./Input";

import useAuth from "src/hooks/useAuth";
import useCourse from "src/hooks/useCourse";

import { createCourseSchema } from "src/validations/course.validation";

const initialValues = {
  courseTitle: "",
  courseDesc: "",
  coursePic:
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Frandomimagesbr&psig=AOvVaw1f7nX8isHaOlXHP8Y_BZ_4&ust=1640384921800000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOiwrZb8-vQCFQAAAAAdAAAAABAI",
  price: 0,
  estHour: 8,
  modules: [
    {
      fileUrl: "",
      moduleName: "",
      desc: "",
      isQuiz: false,
    },
  ],
};

const FileUploader = () => {
  const { handleCreateCourse, loading, error } = useCourse();
  const { auth } = useAuth();

  const form = useFormik({
    initialValues,
    validationSchema: createCourseSchema,
    onSubmit: async (values) => {
      try {
        await handleCreateCourse(values);

        form.resetForm();
      } catch (error) {
        alert(error.message);
      }
    },
  });

  const [isError, setIsError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <>
      {auth.auth && (
        <>
          <Container>
            <Card>
              <Card.Header>Create Course</Card.Header>
              <Card.Body>
                <FormikProvider value={form}>
                  <Form onSubmit={form.handleSubmit}>
                    <InputGroup
                      controlId="courseTitle"
                      name="courseTitle"
                      label="Nama pelatihan"
                      placeholder="Masukan nama pelatihan.."
                    />

                    <InputGroup
                      as="textarea"
                      controlId="courseDesc"
                      name="courseDesc"
                      label="Deskripsi"
                      placeholder="Masukan nama deskripsi.."
                    />

                    <InputGroup
                      controlId="price"
                      name="price"
                      label="Harga Kursus"
                      placeholder="Masukan nama harga.."
                      type="number"
                    />

                    <InputDynamicCourse
                      name="modules"
                      onUpload={(value) => setIsUploading(value)}
                    />

                    <Form.Group>
                      <Button
                        size="sm"
                        type="submit"
                        disabled={isUploading || loading}
                      >
                        {isUploading || loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Uploading...
                          </>
                        ) : (
                          "Create Course"
                        )}
                      </Button>
                    </Form.Group>
                  </Form>
                </FormikProvider>
              </Card.Body>
            </Card>
          </Container>

          <ToastContainer position="top-center" className="p-3">
            <Toast
              show={isError || !!error}
              animation
              autohide
              bg="warning"
              onClose={() => setIsError(false)}
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
                <p className="text-white fw-bold text-center">{error}</p>
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </>
      )}
    </>
  );
};

export default FileUploader;
