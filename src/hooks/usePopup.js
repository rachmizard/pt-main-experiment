import { useContext } from "react";
import { PopupContext } from "../context/PopupContext";

export default function usePopup() {
  const { stacks, setStacks } = useContext(PopupContext);

  const showPopup = ({
    show = false,
    animation = true,
    autohide = true,
    delay = 4000,
    bg = "primary",
    message = "",
  }) => {
    setStacks((state) => [
      ...state,
      {
        show,
        animation,
        autohide,
        delay,
        bg,
        message,
      },
    ]);
  };

  return [showPopup, stacks, setStacks];
}
