import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./header.css";
import logo from "../componants/img/logo.jpg";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { LanguageContext } from "../LanguageContext/LanguageContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { language, setLanguage, texts } = useContext(LanguageContext);

  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollTop = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop.current && scrollTop > 100) {
      setHideHeader(true);
    } else if (scrollTop < lastScrollTop.current) {
      setHideHeader(false);
    }
    
    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLanguageChange = useCallback((newLanguage) => {
    setLanguage(newLanguage);
  }, [setLanguage]);

  // الحصول على النص المناسب بناءً على الوضع الحالي
  const getDarkModeText = () => {
    return darkMode ? texts.header.lightMode : texts.header.darkMode;
  };

  const headerClassNames = [
    "header",
    darkMode ? "dark" : "light",
    hideHeader ? "hide-header" : ""
  ].filter(Boolean).join(" ");

  return (
    <header className={headerClassNames}>
      <div className="header-logo">
        <img src={logo} alt="logo" />
      </div>
      
      <div className="header-buttons">
        <button
          className={`header-btn ${language === "ar" ? "active" : ""}`}
          disabled={language === "ar"}
          onClick={() => handleLanguageChange("ar")}
          aria-pressed={language === "ar"}
        >
          {texts.header.arabic}
        </button>
        
        <button
          className={`header-btn ${language === "en" ? "active" : ""}`}
          disabled={language === "en"}
          onClick={() => handleLanguageChange("en")}
          aria-pressed={language === "en"}
        >
          {texts.header.english}
        </button>
        
        <button
          className="header-btn dark-mode-btn"
          onClick={toggleDarkMode}
          aria-label={getDarkModeText()}
          aria-pressed={darkMode}
        >
          {darkMode ? "🌞" : "🌙"} {getDarkModeText()}
        </button>
      </div>
    </header>
  );
};

export default Header;
