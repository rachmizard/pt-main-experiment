import { FormikProvider, useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Button, Card, Container, Form, Spinner } from "react-bootstrap";

import { InputDynamicCourse, InputGroup } from "./Input";

import useAuth from "src/hooks/useAuth";
import useCourse from "src/hooks/useCourse";
import usePopup from "src/hooks/usePopup";

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

const CreateCourseForm = () => {
  const { handleCreateCourse, loading, error } = useCourse();
  const [showPopup] = usePopup();
  const { auth } = useAuth();

  const formRef = useRef(null);

  const form = useFormik({
    initialValues,
    validationSchema: createCourseSchema,
    onSubmit: async (values) => {
      try {
        await handleCreateCourse(values);

        form.resetForm();
        formRef.current?.reset();

        showPopup({
          show: true,
          bg: "success",
          message: "Berhasil menambahkan pelatihan baru!",
        });
      } catch (err) {
        showPopup({
          show: true,
          bg: "warning",
          message: error,
        });
      }
    },
  });

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
                  <Form ref={formRef} onSubmit={form.handleSubmit}>
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
        </>
      )}
    </>
  );
};

export default CreateCourseForm;
