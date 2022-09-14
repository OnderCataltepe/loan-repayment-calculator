import { createContext, useState } from 'react';
const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
  const [calculatedDatas, setCalculatedDatas] = useState();
  const [isResult, setIsResult] = useState(false);

  let values = { isResult, setIsResult, calculatedDatas, setCalculatedDatas };

  return <CalculatorContext.Provider value={values}>{children}</CalculatorContext.Provider>;
};

export default CalculatorContext;
