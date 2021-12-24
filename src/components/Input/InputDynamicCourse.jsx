import React, { useState } from "react";
import { useField } from "formik";
import { Button, Col, Row } from "react-bootstrap";

import InputGroup from "./InputGroup";
import InputCheckboxGroup from "./InputCheckboxGroup";
import InputFileGroup from "./InputFileGroup";

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
                    <InputGroup
                      controlId={`moduleName-${index}`}
                      label="Nama Modul"
                      name={`modules.${index}.moduleName`}
                      placeholder="Nama modul"
                    />

                    <InputGroup
                      controlId={`desc-${index}`}
                      as="textarea"
                      label="Deskripsi"
                      name={`modules.${index}.desc`}
                      placeholder="Deskripsi"
                    />

                    <InputFileGroup
                      fileKey={index}
                      controlId={`formFile-${index}`}
                      name={`modules.${index}.fileUrl`}
                      label="File Modul"
                      onUploadFile={onUploadFile}
                      isUploading={fileUrls[index].isUploading}
                      progress={fileUrls[index].progress}
                      status={fileUrls[index].done}
                    />

                    <InputCheckboxGroup
                      controlId={`isQuiz-${index}`}
                      name={`modules.${index}.isQuiz`}
                      label="Tambahkan Quiz"
                    />
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
