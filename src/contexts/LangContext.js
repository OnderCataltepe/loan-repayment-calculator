import { createContext, useState } from "react";
import tr from "../languages/tr.json";
import en from "../languages/en.json";

const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [userLanguage, setUserLanguage] = useState(
    localStorage.getItem("lang") || "tr"
  );

  const changeLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    setUserLanguage(lang);
  };

  const values = {
    userLanguage,
    changeLanguage,
    text: userLanguage === "tr" ? tr : en,
  };
  return <LangContext.Provider value={values}>{children}</LangContext.Provider>;
};

export default LangContext;
