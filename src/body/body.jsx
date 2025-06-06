import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./body.css";
import { SiTailwindcss,SiRedux, SiDocker} from 'react-icons/si';

import imgme from "../componants/img/me.jpg";  // Import profile image
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";  // Dark mode context
import { LanguageContext } from "../LanguageContext/LanguageContext";  // Language context for translations

// Project images
import oneproject from "../componants/img/1project.png";
import twoproject from "../componants/img/2project.png";
import threeproject from "../componants/img/3project.png";

// Certificate images
import one from "../componants/img/img/1.jpg";
import two from "../componants/img/img/2.jpg";
import three from "../componants/img/img/3.jpg";
import four from "../componants/img/img/4.jpg"

// Icons for skills
 import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

// Array of projects with images, titles, descriptions, and URLs
const projects = [
  {
    img: oneproject,
    title: "e-commerce (All Techno)",
    descriptionKey: "projectoneDescription", // Key for translations
    url: "https://ahmedosamasamir.github.io/AllTechno/",
  },
  {
    img: twoproject,
    titleKey: "projectTwo", // Title uses translation key
    descriptionKey: "projecttwoDescription",
    url: "https://ahmedosamasamir.github.io/ecommerceweb/",
  },
  {
    img: threeproject,
    titleKey: "projectThree",
    descriptionKey: "projectthreeDescription",
    url: "https://ahmedosamasamir.github.io/personalmedicalrecord/",
  },
];
const skillIcons = [
  { name: "html", icon: <FaHtml5 />, tooltipKey: "html" },
  { name: "css", icon: <FaCss3Alt />, tooltipKey: "css" },
  { name: "js", icon: <FaJsSquare />, tooltipKey: "js" },
  { name: "react", icon: <FaReact />, tooltipKey: "react" },
  { name: "tailwind", icon: <SiTailwindcss />, tooltipKey: "tailwind" },
  { name: "redux", icon: <SiRedux />, tooltipKey: "redux" },
  { name: "node", icon: <FaNodeJs />, tooltipKey: "node" },
  { name: "git", icon: <FaGitAlt />, tooltipKey: "git" },
  { name: "github", icon: <FaGithub />, tooltipKey: "github" },
  { name: "docker", icon: <SiDocker />, tooltipKey: "docker" },

];

export default function Body() {
  // Access dark mode from context
  const { darkMode } = useContext(DarkModeContext);

  // Access language and texts (translations) from context
  const { language, texts } = useContext(LanguageContext);
  const isAr = language === "ar"; // Check if current language is Arabic

  // State for pagination of projects
  const [page, setPage] = useState(0);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Certificates come from translations file (array)
  const certificates = texts.certificates || [];

  // Certificate images imported
  const certificateImages = [
    { image: one },
    { image: two },
    { image: three },
    { image: four},
  ];

  // دمج بيانات الشهادات مع الصور حسب الترتيب
  const certificatesWithImages = certificates.map((cert, index) => ({
    ...cert,
    image: certificateImages[index] ? certificateImages[index].image : null,
  }));

  // State for pagination of certificates
  const [certPage, setCertPage] = useState(0);
  const certsPerPage = 2;
  const totalCertPages = Math.ceil(certificates.length / certsPerPage);

  // Effect to toggle RTL/LTR class on body based on language
  useEffect(() => {
    document.body.classList.toggle("rtl", isAr);
    document.body.classList.toggle("ltr", !isAr);
  }, [isAr]);

  // Slice current projects for current page
  const currentProjects = projects.slice(
    page * projectsPerPage,
    page * projectsPerPage + projectsPerPage
  );

  // Function to go to previous page of projects
  function prevPage() {
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  }

  // Function to go to next page of projects
  function nextPage() {
    setPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  }

  // Function to go to previous page of certificates
  function prevCertPage() {
    setCertPage((prev) => (prev === 0 ? totalCertPages - 1 : prev - 1));
  }

  // Function to go to next page of certificates
  function nextCertPage() {
    setCertPage((prev) => (prev === totalCertPages - 1 ? 0 : prev + 1));
  }

  return (
    // Main container with conditional class for dark or light mode
    <main className={`body ${darkMode ? "dark" : "light"}`}>
      
      {/* Hero section with profile image and introduction */}
      <section className="hero-section">
        <img src={imgme} alt="developer" className="hero-img" />
        <div className="hero-text">
          <h1>{texts.body.heroTitle}</h1> {/* Hero title from translations */}
          <h2 className="blue-text">{texts.body.jobTitle}</h2> {/* Job title */}
          <p>{texts.body.heroDescription}</p> {/* Description paragraph */}
          {/* Contact button opens Gmail compose window */}
          <Link
            to="#"
            className="contact-btn"
            onClick={() =>
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=ahmedosamasamiralsyd@gmail.com",
                "_blank"
              )
            }
          >
            {texts.body.contactMe}
          </Link>
        </div>
      </section>

      {/* About section showing skill icons and about me text */}
      <section className="about-section">
        <div className="icon-fountain">
          {skillIcons.map(({ name, icon, tooltipKey }) => (
            <div
              key={name}
              className={`icon ${name}`}
              title={texts.skillsTooltips[tooltipKey]}
             >
              {icon}
            </div>
          ))}
        </div>
        <h2>{texts.body.aboutMeTitle}</h2> {/* About me title */}
        <p>{texts.body.aboutMeDescription}</p> {/* About me description */}
      </section>

      {/* Education section */}
      <section className="education-section">
        <h2>{texts.body.educationTitle}</h2> {/* Education title */}
        <p>{texts.body.educationDescription}</p> {/* Education description */}
      </section>

      {/* Certifications section with pagination */}
      <section className="Certifications-section">
        <h2>{texts.body.certificate}</h2>
        <h2>{texts.body.certifications}</h2> {/* Certifications title */}
        <p>{texts.body.certificationstitle}</p> {/* Additional certification title */}
        <p>{texts.body.certificationstrack}</p> {/* Track info */}
        <p>{texts.body.certificationsdescription}</p> {/* Description */}

        {/* Controls to navigate certificate pages */}
        <div className="slider-controls">
          <button onClick={prevCertPage} className="slider-arrow" aria-label="Previous">
            &#8592;
          </button>
          <button onClick={nextCertPage} className="slider-arrow" aria-label="Next">
            &#8594;
          </button>
        </div>

        {/* Grid displaying current certificates */}
        <div className="certificates-grid">
          {certificatesWithImages
            .slice(certPage * certsPerPage, certPage * certsPerPage + certsPerPage)
            .map((cert, index) => (
              <div key={index} className="certificate-card">
                {cert.image && (
                  <img src={cert.image} alt={cert.title || "Certificate"} className="certificate-image" />
                )}
                <h3>{cert.title}</h3>
                 {cert.field && <p>{cert.field}</p>}
                <p>{cert.issued_by}</p>
                <p>{cert.duration}</p>
                <p>{cert.description}</p>
                <p>{cert.skills}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Skills section with pagination for projects */}
      <section className="skills-section">
        <h2>{texts.body.skills}</h2> {/* Skills title */}
        {/* Controls to navigate project pages */}
        <div className="slider-controls">
          <button onClick={prevPage} className="slider-arrow" aria-label="Previous">
            &#8592;
          </button>
          <button onClick={nextPage} className="slider-arrow" aria-label="Next">
            &#8594;
          </button>
        </div>

        {/* Grid showing current projects */}
        <div className="skills-grid">
          {currentProjects.map((project, idx) => (
            <div key={idx} className="skill-card">
              <img src={project.img} alt="Project" />
              <h3>
                {/* Show translated title or default title */}
                {project.titleKey ? texts.body[project.titleKey] : project.title}
              </h3>
              <p>{texts.body[project.descriptionKey]}</p> {/* Project description */}
              <Link to={project.url} target="_blank" rel="noopener noreferrer">
                Visit Website
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Progress bars section showing skill proficiency */}
      <section className="projects-section">
        <h2>{texts.body.projects}</h2> {/* Section title */}
        <div className="progress-bars">
          {[ 
            { name: "HTML", value: 90 },
            { name: "CSS", value: 85 },
            { name: "JavaScript", value: 70 },
            { name: "React", value: 80 },
            { name: "Tailwind", value: 60 },
            { name: "Redux", value: 50 },
            { name: "Node.js", value: 50 },
            { name: "Git", value: 65 },
            { name: "GitHub", value: 80 },
            { name: "Docker", value: 60 },
          ].map((skill, i) => (
            <div key={i} className="progress-item">
              <p>
                <span>{skill.name}</span> {/* Skill name */}
                <span>{skill.value}%</span> {/* Skill value */}
              </p>
              <div className="progress-bg">
                {/* Progress fill width based on skill value */}
                <div className="progress-fill" style={{ width: `${skill.value}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
