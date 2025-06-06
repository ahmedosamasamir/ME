import React, { useContext } from "react";
import "./footer.css";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { LanguageContext } from "../LanguageContext/LanguageContext";
import {
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaTiktok
} from "react-icons/fa";

export default function Footer() {
  const { darkMode } = useContext(DarkModeContext);
  const { texts } = useContext(LanguageContext);

  return (
    <footer
      className={`footer ${darkMode ? "dark" : "light"}`}
      dir={texts.direction}
    >
      <div className="footer-content">

        {/* قسم التواصل - يسار */}
        <div className="footer-section contact-section">
          <a
            href="https://wa.me/201000223587"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link whatsapp-link"
          >
            <FaWhatsapp className="icon" />
            <span>{texts.footer.whatsapp}</span>
          </a>

          <a
            href="https://www.linkedin.com/in/ahmed-osama-alhayg/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link linkedin-link"
          >
            <FaLinkedin className="icon" />
            <span>{texts.footer.linkedin}</span>
          </a>
        </div>

        {/* قسم السوشيال ميديا - وسط */}
        <div className="footer-section social-section">
          <a href="https://www.facebook.com/groups/553694767794956" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://x.com/codelighteg" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=yem0rp3" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@CodeLightEgypt" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://github.com/ahmedosamasamir" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.tiktok.com/@code.light.eg?_t=ZS-8wjeS3PDKnH&_r=1" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
        </div>

        {/* حقوق النشر - أسفل */}
        <div className="footer-section copyright">
          <p>&copy; {new Date().getFullYear()} {texts.footer.rights}</p>
        </div>

      </div>
    </footer>
  );
}
