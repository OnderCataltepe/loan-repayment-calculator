import "./App.css";
import BackAnimations from "./Components/BackAnimations";
import Form from "./Components/Form";
import Navbar from "./Components/Navbar";
import { LangProvider } from "./contexts/LangContext";

function App() {
  return (
    <LangProvider>
      <div className="App">
        <Navbar />
        <BackAnimations />
        <Form />
      </div>
    </LangProvider>
  );
}

export default App;
