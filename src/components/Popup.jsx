import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import usePopup from "../hooks/usePopup";

const Popup = () => {
  const [__, stacks, setStacks] = usePopup();

  const handleClose = (index) => {
    const newValue = [...stacks];
    newValue[index].show = false;

    setStacks([...newValue]);
    removeStack(index);
  };

  const removeStack = (index) => {
    setStacks((state) => [...state, ...state.splice(index, 1)]);
  };

  return (
    <ToastContainer position="top-center" className="p-3 position-fixed">
      {stacks.map((stack, index) => (
        <Toast
          key={`stack-${index}`}
          onClose={() => handleClose(index)}
          show={stack.show}
          animation={true}
          {...stack}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Information</strong>
          </Toast.Header>
          <Toast.Body>
            <p className="fw-bold text-white">{stack.message}</p>
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default Popup;
