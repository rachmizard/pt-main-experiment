import React from "react";
import { Container } from "react-bootstrap";
import LoginForm from "src/components/LoginForm";

const LoginPage = () => {
  return (
    <Container>
      <h2 className="mt-3 text-center">
        Welcome to PT Main Admin Experimental Web
      </h2>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
