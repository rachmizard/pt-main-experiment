import React, { useEffect, useState } from "react";
import { Badge, Form } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import Datatable from "src/components/Datatable";
import { ORDER_STATUS } from "src/constants/order";
import usePopup from "src/hooks/usePopup";
import OrderService from "src/services/order.service";
import { convertDateFormat, convertIDR } from "src/utils";

const OrderPage = () => {
     const orderService = new OrderService();

     const [loading, setLoading] = useState(false);
     const [showPopup] = usePopup();
     const [orders, setOrders] = useState([]);
     const [totalResults, setTotalResults] = useState(0);
     const [page, setPage] = useState(1);
     const defaultQuery = {
          page: 1,
          limit: 8,
     };

     useEffect(() => {
          (async () => {
               setLoading(true);
               const response = await orderService.getOrders(defaultQuery);

               setOrders(response.results);
               setTotalResults(response.totalResults);
               setPage(response.page);
               setLoading(false);
          })();
     }, []);

     const onSubmitFilter = async (values) => {
          try {
               setLoading(true);
               const response = await orderService.getOrders(values);

               setOrders(response.results);
               setTotalResults(response.totalResults);
               setPage(response.page);
          } catch (error) {
               showPopup({ show: true, bg: "warning", message: error.message });
               setLoading(false);
          } finally {
               setLoading(false);
          }
     };

     return (
          <>
               <Datatable
                    loading={loading}
                    defaultQuery={defaultQuery}
                    columns={[
                         {
                              label: "Order ID",
                              index: "id",
                              render: (record, data, index) => {
                                   return data;
                              },
                         },
                         {
                              label: "Order Date",
                              index: "orderDate",
                              sort: true,
                              render: (record, data, index) => {
                                   return convertDateFormat(new Date(data));
                              },
                         },
                         {
                              label: "Total Price",
                              index: "totalPrice",
                              sort: true,
                              render: (record, data, index) => {
                                   return convertIDR(data);
                              },
                         },
                         {
                              label: "Total Items",
                              render: (record, data, index) => {
                                   return record.courses.length;
                              },
                         },
                         {
                              label: "Status",
                              index: "status",
                              render: (record, data, index) => {
                                   if (data === "accepted") {
                                        return (
                                             <Badge bg="success">
                                                  {ORDER_STATUS[data]}{" "}
                                                  <FaCheckCircle />
                                             </Badge>
                                        );
                                   }

                                   if (data === "failed") {
                                        return (
                                             <Badge bg="danger">
                                                  {ORDER_STATUS[data]}{" "}
                                             </Badge>
                                        );
                                   }

                                   if (data === "pending") {
                                        return (
                                             <Badge bg="warning">
                                                  {ORDER_STATUS[data]}
                                             </Badge>
                                        );
                                   }

                                   if (data === "created") {
                                        return (
                                             <Badge bg="primary">
                                                  {ORDER_STATUS[data]}
                                             </Badge>
                                        );
                                   }
                              },
                         },
                    ]}
                    sourceData={orders}
                    paginate={{
                         totalCount: totalResults,
                         siblingCount: 5,
                         currentPage: page,
                    }}
                    onSubmitFilter={onSubmitFilter}
                    withSearch={true}
                    searchPlacholder="Search Order.."
                    customFilterPlugin={[
                         <Form.Select name="status" controlId="formStatus">
                              <option value="accepted">Accepted</option>
                              <option value="pending">Pending</option>
                              <option value="failed">Failed</option>
                              <option value="created">Created</option>
                              <option value="">All</option>
                         </Form.Select>,
                    ]}
               />
          </>
     );
};

export default OrderPage;
