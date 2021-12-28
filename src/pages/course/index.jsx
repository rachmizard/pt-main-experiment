/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Datatable from "src/components/Datatable";
import useCart from "src/hooks/useCart";
import useCourse from "src/hooks/useCourse";
import usePopup from "src/hooks/usePopup";

const CoursePage = () => {
     const course = useCourse();
     const { carts, addCart, removeCart, isLoading, error } = useCart();
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
                    showPopup({
                         show: true,
                         bg: "warning",
                         message: error.message,
                    });
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

     const handleAddCart = async (record, data) => {
          try {
               await addCart(data);
          } catch (err) {
               showPopup({
                    bg: "warning",
                    message: error,
               });
          } finally {
               showPopup({
                    show: true,
                    bg: "success",
                    message: `${record.courseTitle} successfully added to your cart`,
               });
          }
     };

     const handleRemoveCart = async (record, data) => {
          try {
               const cartIsTaken = carts.find((cart) => cart === data);

               if (cartIsTaken) {
                    await removeCart(data);
               }
          } catch (err) {
               showPopup({
                    show: true,
                    bg: "warning",
                    message: error,
               });
          } finally {
               showPopup({
                    show: true,
                    bg: "success",
                    message: `${record.courseTitle} successfully removed from your cart`,
               });
          }
     };

     const { page, totalResults, results } = course.courses;

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
                         {
                              label: "Action",
                              index: "id",
                              render: (record, data, index) => {
                                   const cartIsTaken = carts.find(
                                        (cart) => cart === data
                                   );

                                   const Icon = cartIsTaken
                                        ? FaTrash
                                        : FaCartPlus;

                                   const words = cartIsTaken
                                        ? "Remove cart"
                                        : "Add to Cart";

                                   return (
                                        <div className="d-flex justify-content-center gap-2">
                                             <Button
                                                  as={Link}
                                                  size="sm"
                                                  varian="success"
                                                  to={`/courses/${data}`}
                                             >
                                                  Detail Course
                                             </Button>
                                             <Button
                                                  size="sm"
                                                  variant={
                                                       cartIsTaken
                                                            ? "danger"
                                                            : "warning"
                                                  }
                                                  type="button"
                                                  className="text-white"
                                                  disabled={isLoading}
                                                  onClick={async () => {
                                                       if (cartIsTaken) {
                                                            return await handleRemoveCart(
                                                                 record,
                                                                 data
                                                            );
                                                       }

                                                       return await handleAddCart(
                                                            record,
                                                            data
                                                       );
                                                  }}
                                             >
                                                  <Icon /> <span>{words}</span>
                                             </Button>
                                        </div>
                                   );
                              },
                         },
                    ]}
                    sourceData={results}
                    paginate={{
                         totalCount: totalResults,
                         siblingCount: 1,
                         currentPage: page,
                    }}
                    onSubmitFilter={onSubmitFilter}
                    withSearch={true}
                    customPanel={
                         <div className="d-flex flex-row justify-content-end">
                              <Button
                                   as={Link}
                                   to="/courses/create"
                                   variant="primary"
                              >
                                   Add Course
                              </Button>
                         </div>
                    }
               />
          </>
     );
};

export default CoursePage;
