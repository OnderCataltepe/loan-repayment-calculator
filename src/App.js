import "./App.css";
import BackAnimations from "./Components/BackAnimations";
import Form from "./Components/Form";
import Navbar from "./Components/Navbar";
import Result from "./Components/Result";
import { useContext } from "react";
import CalculatorContext from "./contexts/CalculatorContext";
function App() {
  const { isResult } = useContext(CalculatorContext);
  return (
    <div className="App">
      <Navbar />
      <BackAnimations />
      <Form />
      {isResult && <Result />}
    </div>
  );
}

export default App;
