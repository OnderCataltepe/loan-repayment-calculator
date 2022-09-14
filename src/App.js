import './App.css';

import { BackImages, Form, Navbar, Result } from 'Components';

import { useContext } from 'react';
import CalculatorContext from 'contexts/CalculatorContext';

function App() {
  const { isResult } = useContext(CalculatorContext);
  return (
    <div className="App">
      <Navbar />
      <BackImages />
      <Form />
      {isResult && <Result />}
    </div>
  );
}

export default App;
