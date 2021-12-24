import React, { useState } from "react";
import { Container, Navbar, ToastContainer, Toast } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";

const NavHeader = ({ children }) => {
  const { auth, logout, flushSyncProfile } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();

    navigate("/login", { replace: true });
  };

  const handleRefreshAuth = async () => {
    try {
      await flushSyncProfile();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand onClick={() => navigate("/")} href="#home">
            PT Main Admin Experimental Web
          </Navbar.Brand>
          <Navbar.Toggle />
          {auth?.auth && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="p-3">
                <a href="#home" onClick={handleRefreshAuth}>
                  {auth?.auth?.user?.username}
                </a>
              </Navbar.Text>
              <Navbar.Text className="p-3">
                <Link to="/courses/create">Course</Link>
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

      <ToastContainer position="top-center" className="p-3">
        <Toast
          show={!!error}
          animation
          autoHide
          bg="warning"
          onClose={() => setError(null)}
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
            <p className="fw-bold text-white">{error}</p>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {children}
    </>
  );
};

export default NavHeader;
