import React, { useContext, useEffect, useRef, useState } from "react";
import "./header.css";
import logo from "../componants/img/logo.jpg";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { LanguageContext } from "../LanguageContext/LanguageContext";

export default function Header() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { language, setLanguage, texts } = useContext(LanguageContext);

  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop.current) {
        // التمرير لأسفل -> إخفاء الهيدر
        setHideHeader(true);
      } else {
        // التمرير لأعلى -> إظهار الهيدر
        setHideHeader(false);
      }
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header ${darkMode ? "dark" : "light"} ${
        hideHeader ? "hide-header" : ""
      }`}
    >
      <div className="header-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="header-buttons">
        <button
          className="header-btn"
          disabled={language === "ar"}
          onClick={() => setLanguage("ar")}
        >
          {texts.header.arabic}
        </button>
        <button
          className="header-btn"
          disabled={language === "en"}
          onClick={() => setLanguage("en")}
        >
          {texts.header.english}
        </button>
        <button
          className="header-btn dark-mode-btn"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? "🌞" : "🌙"} {texts.header.darkMode}
        </button>
      </div>
    </header>
  );
}
