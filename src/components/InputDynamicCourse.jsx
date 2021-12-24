import React, { useState } from "react";
import { useField } from "formik";
import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import FileService from "src/services/file.service";

const InputDynamicCourse = ({ name, onUpload }) => {
  const fileService = new FileService();

  const [input, meta, helpers] = useField(name);
  const [fileUrls, setFileUrls] = useState([
    {
      url: null,
      progress: 0,
      isUploading: false,
      done: false,
    },
  ]);

  const addField = () => {
    const value = {
      fileUrl: "",
      moduleName: "",
      desc: "",
      isQuiz: false,
    };

    const fileUrl = {
      url: null,
      progress: 0,
      isUploading: false,
      done: false,
    };

    helpers.setValue([...input.value, value], false);
    setFileUrls((state) => [...state, fileUrl]);
  };

  const removeField = (index) => {
    const values = input.value;

    if (values.length > 1) {
      values.splice(index, 1);
      fileUrls.splice(index, 1);

      helpers.setValue([...values], false);
      setFileUrls([...fileUrls]);
    }
  };

  const setProgressUploading = (index, data) => {
    setFileUrls((state) => {
      state[index].progress = Math.round((100 * data.loaded) / data.total);
      return [...state];
    });
  };

  const setUrlUpload = (index, url) => {
    const values = input.value;
    values[index].fileUrl = url;

    helpers.setValue([...values], false);
    setFileUrls((state) => {
      state[index].url = url;
      return [...state];
    });
  };

  const onUploadFile = async (index, event) => {
    if (event.target.files[0]) {
      try {
        setFileUrls((state) => {
          state[index].isUploading = true;
          return [...state];
        });

        onUpload(true);

        const config = {
          onUploadProgress: (data) => setProgressUploading(index, data),
          cancelToken: fileService.cancelTokenSource.token,
        };
        const { data } = await fileService.uploadFile(
          event.target.files[0],
          config
        );

        setUrlUpload(index, data.url);
      } catch (error) {
      } finally {
        setFileUrls((state) => {
          state[index].isUploading = false;
          state[index].done = true;

          return [...state];
        });
        onUpload(false);
      }
    }
  };

  const getModuleErrors = (name, index) => {
    if (meta.error && meta.error[index]) {
      return meta.error[index][name];
    }
  };

  return (
    <>
      <Row>
        <Col className="offset-md-1 my-5">
          {input.value.length > 0 &&
            input.value.map((field, index) => {
              return (
                <Row
                  key={`row-${index}`}
                  className="align-items-start gap-2 my-5"
                >
                  <Col lg={10}>
                    <Form.Group
                      controlId={`moduleName-${index}`}
                      className="mb-3"
                    >
                      <Form.Label>Nama Modul</Form.Label>
                      <Form.Control
                        name={`modules.${index}.moduleName`}
                        value={input.value[index].moduleName}
                        onChange={input.onChange}
                        onBlur={input.onBlur}
                        isInvalid={!!getModuleErrors("moduleName", index)}
                        type="text"
                        placeholder="Nama Module"
                      />
                      <Form.Control.Feedback type="invalid">
                        {getModuleErrors("moduleName", index)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="desc" className="mb-3">
                      <Form.Label>Deskripsi Modul</Form.Label>
                      <Form.Control
                        name={`modules.${index}.desc`}
                        value={input.value[index].desc}
                        onChange={input.onChange}
                        onBlur={input.onBlur}
                        isInvalid={!!getModuleErrors("desc", index)}
                        as="textarea"
                        placeholder="Deskripsi Pembelajaran"
                      />
                      <Form.Control.Feedback type="invalid">
                        {getModuleErrors("desc", index)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      controlId={`formFile-${index}`}
                      className="mb-3 position-relative"
                    >
                      <Form.Label>File Modul</Form.Label>
                      <Form.Control
                        type="file"
                        name={`modules.${index}.fileUrl`}
                        onBlur={input.onBlur}
                        isInvalid={!!getModuleErrors("fileUrl", index)}
                        isValid={
                          input.value[index].fileUrl && fileUrls[index].done
                        }
                        onChange={async (e) => {
                          input.onChange(e);
                          await onUploadFile(index, e);
                        }}
                        accept="video/mp4,image/*"
                      />

                      <Form.Control.Feedback type="valid">
                        File was upload at{" "}
                        <a href={input.value[index].fileUrl}>Click to See.</a>
                      </Form.Control.Feedback>

                      <Form.Control.Feedback type="invalid">
                        {getModuleErrors("fileUrl", index)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {fileUrls[index].isUploading && (
                      <>
                        <ProgressBar
                          className="mt-3 mb-3"
                          label={`${fileUrls[index].progress}%`}
                          animated
                          now={fileUrls[index].progress}
                          striped
                        />
                      </>
                    )}

                    <Form.Group controlId={`isQuiz-${index}`} className="mb-3">
                      <Form.Check
                        name={`modules.${index}.isQuiz`}
                        value={input.value[index].isQuiz}
                        onChange={input.onChange}
                        type="checkbox"
                        label="Tambahkan Quiz"
                      />
                      <Form.Control.Feedback type="invalid">
                        {getModuleErrors("isQuiz", index)}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <div className="d-flex flex-row gap-2">
                      <Button
                        hidden={!field.isUploading}
                        size="sm"
                        variant="warning"
                        className="text-white"
                      >
                        Cancel
                      </Button>

                      <Button
                        hidden={meta.value.length === 1}
                        disabled={fileUrls[index].isUploading}
                        onClick={() => removeField(index)}
                        size="sm"
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </Col>
                </Row>
              );
            })}
          <Button
            size="sm"
            variant="warning"
            className="text-white"
            onClick={addField}
          >
            Add Field
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default InputDynamicCourse;
