import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";
import usePopup from "src/hooks/usePopup";

const NavHeader = ({ children }) => {
  const { auth, logout, flushSyncProfile } = useAuth();
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

      {children}
    </>
  );
};

export default NavHeader;
