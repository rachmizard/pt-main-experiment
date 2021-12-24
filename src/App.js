import "./App.css";
import Login from "./components/Login";
import { Container } from "react-bootstrap";
import AuthProvider from "./context/AuthContext";
import CreateCourse from "./components/CreateCourse";
import NavHeader from "./components/NavHeader";

function App() {
  return (
    <>
      <AuthProvider>
        <Container>
          <NavHeader>
            <Login />
            <CreateCourse />
          </NavHeader>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
