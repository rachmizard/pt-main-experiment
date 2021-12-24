import React from "react";
import { Container, Navbar } from "react-bootstrap";
import useAuth from "src/hooks/useAuth";

const NavHeader = ({ children }) => {
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">
            PT Main Create Course Experiment
          </Navbar.Brand>
          <Navbar.Toggle />
          {auth?.auth && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="p-3">
                Signed in as:{" "}
                <a href="#kemanajaa">{auth?.auth?.user?.username}</a> role:{" "}
                {auth?.auth?.user?.role}
              </Navbar.Text>
              <Navbar.Text style={{ cursor: "pointer" }} onClick={handleLogout}>
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
