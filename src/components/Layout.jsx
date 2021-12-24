import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavHeader from "./NavHeader";

const Layout = () => {
  return (
    <Container>
      <NavHeader>
        <Outlet />
      </NavHeader>
    </Container>
  );
};

export default Layout;
