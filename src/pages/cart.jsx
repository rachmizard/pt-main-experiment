import React, { useEffect, useState } from "react";
import { Col, Row, Button, Spinner, Form } from "react-bootstrap";
import useCart from "src/hooks/useCart";
import usePopup from "src/hooks/usePopup";

const CartPage = () => {
     const { resource, isLoading, removeCart, refetch } = useCart();
     const [showPopup] = usePopup();
     const [totalPrice, setTotalPrice] = useState(0);
     const [selectedCart, setSelectedCart] = useState([]);
     const [checkedAll, setCheckedAll] = useState(false);

     useEffect(() => {
          const sumPrice = [...selectedCart]
               .map((p) => p.price)
               .reduce((prev, curr) => prev + curr, 0);

          setTotalPrice(sumPrice);
     }, [selectedCart, setSelectedCart]);

     const converCurrency = (currency) => {
          return new Intl.NumberFormat("id-ID", {
               style: "currency",
               currency: "IDR",
               minimumFractionDigits: 2,
          }).format(currency);
     };

     const handleCheckAll = ({ target }) => {
          setCheckedAll(target.checked);

          if (!target.checked) return setSelectedCart([]);

          const { results } = resource;

          for (let index = 0; index < results.length; index++) {
               const { course, id } = results[index];

               setSelectedCart((state) => [
                    ...state,
                    { id, price: course.price },
               ]);
          }
     };

     const handleCheckCourse = (cart) => {
          const isMatch = selectedCart.find((prop) => prop.id === cart.id);

          if (isMatch) {
               return setSelectedCart([
                    ...selectedCart.filter((field) => field.id !== cart.id),
               ]);
          }

          setSelectedCart((state) => [
               ...state,
               { id: cart.id, price: cart?.course?.price },
          ]);
     };

     const handleRemoveCart = async (courseId, cartId) => {
          try {
               setSelectedCart([
                    ...selectedCart.filter((field) => field.id !== cartId),
               ]);

               await removeCart(courseId);
          } catch (error) {
               showPopup({
                    show: true,
                    bg: "warning",
                    message: error.message,
               });
          } finally {
               await refetch();
          }
     };

     return (
          <div>
               <Row>
                    <Col>
                         <Form.Check
                              checked={checkedAll}
                              onChange={handleCheckAll}
                         />
                    </Col>
                    <Col>
                         <h5>Course Name</h5>
                    </Col>
                    <Col>
                         <h5>Price</h5>{" "}
                    </Col>
                    <Col>
                         <h5>Action</h5>
                    </Col>
               </Row>
               {isLoading ? (
                    <div className="d-flex min-vh-100 justify-content-center align-items-center">
                         <Spinner animation="grow" />
                    </div>
               ) : resource?.results?.length > 0 ? (
                    resource?.results?.map((cart, index) => {
                         const { course, id } = cart;

                         const isChecked = selectedCart.find(
                              (prop) => prop.id === cart.id
                         );

                         return (
                              <Row className="py-5" key={index}>
                                   <Col>
                                        <Form.Check
                                             checked={isChecked}
                                             onChange={(e) => {
                                                  handleCheckCourse(cart);
                                             }}
                                        />
                                   </Col>
                                   <Col>{course?.courseTitle}</Col>
                                   <Col>{converCurrency(course?.price)}</Col>
                                   <Col>
                                        <Button
                                             variant="warning text-white"
                                             onClick={() =>
                                                  handleRemoveCart(
                                                       course?.id,
                                                       id
                                                  )
                                             }
                                        >
                                             Delete
                                        </Button>
                                   </Col>
                              </Row>
                         );
                    })
               ) : (
                    <Row>
                         <Col>Empty</Col>
                    </Row>
               )}
               <Row>
                    <Col className="d-flex justify-content-end" lg={12}>
                         <div className="d-flex flex-column gap-3">
                              <p>
                                   Total Checkout:{" "}
                                   <span className="fw-bold">
                                        {converCurrency(totalPrice)}
                                   </span>
                              </p>
                              <span>Selected: {selectedCart.length}</span>
                              <Button
                                   hidden={totalPrice === 0}
                                   variant="success"
                                   size="sm"
                              >
                                   Continue Payment
                              </Button>
                         </div>
                    </Col>
               </Row>
          </div>
     );
};

export default CartPage;
