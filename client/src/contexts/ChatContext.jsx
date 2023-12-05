import { createContext, useEffect, useState } from "react";

const ChatContext = createContext({ fifo: [], setFifo: () => {} });

const Provider = ({ children }) => {
  const [fifo, setFifo] = useState([]);

  return (
    <ChatContext.Provider value={{ fifo, setFifo }}>
      {children}
    </ChatContext.Provider>
  );
};

export { Provider };
export default ChatContext;