import React, { createContext, useState, useEffect } from "react";
import ar from "../ar.json";
import en from "../en.json";

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [texts, setTexts] = useState(en);

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    if (language === "ar") setTexts(ar);
    else setTexts(en);
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, texts }}>
      {children}
    </LanguageContext.Provider>
  );
}
