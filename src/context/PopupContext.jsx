const { createContext, useState } = require("react");

export const PopupContext = createContext(null);

const PopupProvider = ({ children }) => {
  const [stacks, setStacks] = useState([]);

  const value = { stacks, setStacks };

  return (
    <PopupContext.Provider value={value}>
      <div className="position-relative">{children}</div>
    </PopupContext.Provider>
  );
};

export default PopupProvider;
