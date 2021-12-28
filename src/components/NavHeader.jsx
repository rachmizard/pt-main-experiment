import React from "react";
import { Badge, Container, Navbar } from "react-bootstrap";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import useCart from "src/hooks/useCart";
import usePopup from "src/hooks/usePopup";

const NavHeader = ({ children }) => {
     const { auth, logout, flushSyncProfile } = useAuth();
     const { carts } = useCart();
     const [showPopup] = usePopup();
     const navigate = useNavigate();

     const handleLogout = () => {
          logout();

          navigate("/login", { replace: true });
     };

     const handleRefreshAuth = async () => {
          try {
               await flushSyncProfile();

               showPopup({
                    show: true,
                    bg: "success",
                    message: "Berhasil update profile",
               });
          } catch (error) {
               showPopup({
                    show: true,
                    bg: "warning",
                    message: error.message,
               });
          }
     };

     return (
          <>
               <Navbar>
                    <Container>
                         <Navbar.Brand
                              onClick={() => navigate("/")}
                              href="#home"
                         >
                              PT Main Admin Experimental Web
                         </Navbar.Brand>
                         <Navbar.Toggle />
                         {auth?.auth && (
                              <Navbar.Collapse className="justify-content-end">
                                   <Navbar.Text
                                        as={Link}
                                        to="/cart"
                                        className="p-3 pe-auto position-relative"
                                        style={{ textDecoration: "none" }}
                                   >
                                        <FaCartPlus size={28} />{" "}
                                        <Badge
                                             hidden={carts?.length === 0}
                                             bg="success"
                                             pill
                                             style={{ fontSize: 10 }}
                                             className="position-absolute top-45 start-70 translate-middle"
                                        >
                                             {carts?.length}
                                        </Badge>
                                   </Navbar.Text>
                                   <Navbar.Text className="p-3">
                                        <a
                                             href="#home"
                                             onClick={handleRefreshAuth}
                                        >
                                             {auth?.auth?.user?.username}
                                        </a>
                                   </Navbar.Text>
                                   <Navbar.Text className="p-3">
                                        <Link to="/courses">Course</Link>
                                   </Navbar.Text>
                                   <Navbar.Text
                                        className="p-3"
                                        style={{ cursor: "pointer" }}
                                        onClick={handleLogout}
                                   >
                                        Logout
                                   </Navbar.Text>
                              </Navbar.Collapse>
                         )}
                    </Container>
               </Navbar>

               {children}
          </>
     );
};

export default NavHeader;
