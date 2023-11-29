import React, { createContext, useEffect, useState } from 'react';

const StockStatusContext = createContext();

export const StockStatusProvider = ({ children }) => {
  const [outOfStockMedicines, setOutOfStockMedicines] = useState([]);

  const handleStockFinished = (medicines) => {
    setOutOfStockMedicines([...medicines]);
    console.log("in handleStockFinished");
    console.log(outOfStockMedicines);
  };

  useEffect(() => {
    console.log(outOfStockMedicines);
  }, [outOfStockMedicines]);

  return (
    <StockStatusContext.Provider value={{ outOfStockMedicines, handleStockFinished }}>
      {children}
    </StockStatusContext.Provider>
  );
};

export default StockStatusContext;
