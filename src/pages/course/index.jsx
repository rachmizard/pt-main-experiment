import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Datatable from "src/components/Datatable";
import useCourse from "src/hooks/useCourse";
import usePopup from "src/hooks/usePopup";

const CoursePage = () => {
  const course = useCourse();
  const [showPopup] = usePopup();
  const defaultQuery = {
    page: 1,
    limit: 8,
  };

  useEffect(() => {
    (async () => {
      try {
        await course.queryCourse(defaultQuery);
      } catch (error) {
        showPopup({ show: true, bg: "warning", message: error.message });
      }
    })();
  }, []);

  const onSubmitFilter = async (values) => {
    try {
      await course.queryCourse(values);
    } catch (error) {
      showPopup({ show: true, bg: "warning", message: error.message });
    }
  };

  return (
    <>
      <Datatable
        loading={course.loading}
        defaultQuery={defaultQuery}
        columns={[
          {
            label: "ID",
            index: "id",
            render: (record, data, index) => {
              return data;
            },
          },
          {
            label: "Course",
            index: "courseTitle",
            sort: false,
            render: (record, data, index) => {
              return data;
            },
          },
          {
            label: "Total Modules",
            render: (record, data, index) => {
              return record.courseModules.length;
            },
          },
          {
            label: "Price",
            index: "price",
            sort: true,
            render: (record, data, index) => {
              return data;
            },
          },
          {
            label: "Total Member",
            index: "totalUserJoin",
            render: (record, data, index) => {
              return data;
            },
          },
        ]}
        sourceData={course.courses?.results}
        onSubmitFilter={onSubmitFilter}
        withSearch={true}
        customPanel={
          <div className="d-flex flex-row justify-content-end">
            <Button as={Link} to="/courses/create" variant="primary">
              Add Course
            </Button>
          </div>
        }
      />
    </>
  );
};

export default CoursePage;
