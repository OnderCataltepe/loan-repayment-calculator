import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LangProvider } from 'contexts/LangContext';
import { CalculatorProvider } from 'contexts/CalculatorContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LangProvider>
      <CalculatorProvider>
        <App />
      </CalculatorProvider>
    </LangProvider>
  </React.StrictMode>
);
