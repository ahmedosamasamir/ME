import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./body.css";
import { 
  SiTailwindcss, 
  SiRedux, 
  SiDocker,
  SiExpress,
  SiMongodb
} from 'react-icons/si';

import imgme from "../componants/img/me.jpg";
import { DarkModeContext } from "../DarkModeContext/DarkModeContext";
import { LanguageContext } from "../LanguageContext/LanguageContext";

// Project images
import oneproject from "../componants/img/1project.png";
import twoproject from "../componants/img/2project.png";
import threeproject from "../componants/img/3project.png";

// Certificate images
import one from "../componants/img/img/1.jpg";
import two from "../componants/img/img/2.jpg";
import three from "../componants/img/img/3.jpg";
import four from "../componants/img/img/4.jpg"

// CV file
import cvFile from "../componants/img/AHEMD_OSAMA_CV.pdf";

// Icons for skills
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaDownload,
  FaCode,
  FaServer,
  FaRocket,
  FaAward,
  FaDatabase,
  FaCloud,
  FaGraduationCap
} from "react-icons/fa";

// Array of projects with enhanced data
const projects = [
  {
    img: oneproject,
    title: "AllTechno E-Commerce",
    descriptionKey: "projectoneDescription",
    url: "https://ahmedosamasamir.github.io/AllTechno/",
    github: "https://github.com/ahmedosamasamir/AllTechno",
    technologies: ["React", "Redux", "CSS3", "JavaScript", "Responsive Design"],
    category: "Frontend",
    featured: true
  },
  {
    img: twoproject,
    titleKey: "projectTwo",
    descriptionKey: "projecttwoDescription",
    url: "https://ahmedosamasamir.github.io/ecommerceweb/",
    github: "https://github.com/ahmedosamasamir/ecommerceweb",
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "UX/UI Design"],
    category: "Frontend"
  },
  {
    img: threeproject,
    titleKey: "projectThree",
    descriptionKey: "projectthreeDescription",
    url: "https://ahmedosamasamir.github.io/personalmedicalrecord/",
    github: "https://github.com/ahmedosamasamir/personalmedicalrecord",
    technologies: ["React","Redux", "Node.js", "MongoDB", "Full Stack"],
    category: "Full Stack",
    featured: true
  },
];

// Enhanced skills data with proficiency levels (removed percentages)
const skillIcons = [
  { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26", category: "frontend" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "#1572B6", category: "frontend" },
  { name: "JavaScript", icon: <FaJsSquare />, color: "#F7DF1E", category: "frontend" },
  { name: "React", icon: <FaReact />, color: "#61DAFB", category: "frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4", category: "frontend" },
  { name: "Redux", icon: <SiRedux />, color: "#764ABC", category: "frontend" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#339933", category: "backend" },
  { name: "Express.js", icon: <SiExpress />, color: "#000000", category: "backend" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", category: "backend" },
  { name: "Git", icon: <FaGitAlt />, color: "#F05032", category: "tools" },
  { name: "GitHub", icon: <FaGithub />, color: "#181717", category: "tools" },
  { name: "Docker", icon: <SiDocker />, color: "#2496ED", category: "tools" },
];

export default function Body() {
  const { darkMode } = useContext(DarkModeContext);
  const { language, texts } = useContext(LanguageContext);
  const isAr = language === "ar";
  
  const [activeFilter, setActiveFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef([]);

  // Certificates come from translations file (array)
  const certificates = texts.certificates || [];
  const certificateImages = [one, two, three, four];

  // Enhanced certificates data merging
  const certificatesWithImages = certificates.map((cert, index) => ({
    ...cert,
    image: certificateImages[index] || null,
  }));

  // Filter projects based on category
  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    document.body.classList.toggle("rtl", isAr);
    document.body.classList.toggle("ltr", !isAr);
    
    // Animation on load
    setIsVisible(true);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isAr]);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const handleDownloadCV = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'Ahmed_Osama_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openGmailCompose = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=codelighteg@gmail.com",
      "_blank"
    );
  };

  return (
    <main className={`body ${darkMode ? "dark" : "light"} ${isVisible ? "visible" : ""}`}>
      
      {/* Navigation Dots */}
      <nav className="navigation-dots">
        {["home", "about", "skills", "projects", "certifications", "contact"].map((section) => (
          <button
            key={section}
            className="nav-dot"
            onClick={() => scrollToSection(section)}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </nav>

      {/* Hero Section */}
      <section 
        id="home" 
        className="hero-section" 
        ref={el => sectionRefs.current[0] = el}
      >
        <div className="hero-container">
          <div className="hero-image-container">
            <img src={imgme} alt="Ahmed Osama - Full Stack Developer" className="hero-img" />
          </div>
          
          <div className="hero-content">
            <h1 className="hero-title">
              {texts.body.heroTitle}
              <span className="wave">👋</span>
            </h1>
            <h2 className="hero-subtitle">
              <span className="gradient-text">{texts.body.jobTitle}</span>
            </h2>
            <p className="hero-description">
              {texts.body.heroDescription}
            </p>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => scrollToSection("contact")}
              >
                <FaEnvelope />
                {texts.body.contactMe}
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleDownloadCV}
              >
                <FaDownload />
                {texts.body.downloadCV}
              </button>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="about-section"
        ref={el => sectionRefs.current[1] = el}
      >
        <div className="container">
          <h2 className="section-title">
            <FaCode />
            {texts.body.aboutMeTitle}
          </h2>
          
          <div className="about-content">
            <div className="about-text">
              <h3>{texts.body.passionateDeveloper}</h3>
              <p>
                {texts.body.specializingTechnologies}
              </p>
              
              <div className="expertise-areas">
                <div className="expertise">
                  <FaCode />
                  <div>
                    <h4>{texts.body.frontendExpertise}</h4>
                    <p>{texts.body.frontendTechnologies}</p>
                  </div>
                </div>
                <div className="expertise">
                  <FaServer />
                  <div>
                    <h4>{texts.body.backendExpertise}</h4>
                    <p>{texts.body.backendTechnologies}</p>
                  </div>
                </div>
                <div className="expertise">
                  <FaDatabase />
                  <div>
                    <h4>{texts.body.databaseDeployment}</h4>
                    <p>{texts.body.databaseTechnologies}</p>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="education-section">
                <h4>
                  <FaGraduationCap />
                  {texts.body.educationTitle}
                </h4>
                <p>{texts.body.educationDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        className="skills-section"
        ref={el => sectionRefs.current[2] = el}
      >
        <div className="container">
          <h2 className="section-title">{texts.body.technicalExpertise}</h2>
          
          <div className="skills-categories">
            <div className="category">
              <h3>
                <FaCode />
                {texts.body.frontendDevelopment}
              </h3>
              <div className="skills-grid">
                {skillIcons.filter(skill => skill.category === 'frontend').map(skill => (
                  <div key={skill.name} className="skill-tag" style={{ borderLeftColor: skill.color }}>
                    <div className="skill-icon" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="category">
              <h3>
                <FaServer />
                {texts.body.backendDevelopment}
              </h3>
              <div className="skills-grid">
                {skillIcons.filter(skill => skill.category === 'backend').map(skill => (
                  <div key={skill.name} className="skill-tag" style={{ borderLeftColor: skill.color }}>
                    <div className="skill-icon" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="category">
              <h3>
                <FaCloud />
                {texts.body.toolsTechnologies}
              </h3>
              <div className="skills-grid">
                {skillIcons.filter(skill => skill.category === 'tools').map(skill => (
                  <div key={skill.name} className="skill-tag" style={{ borderLeftColor: skill.color }}>
                    <div className="skill-icon" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className="projects-section"
        ref={el => sectionRefs.current[3] = el}
      >
        <div className="container">
          <h2 className="section-title">{texts.body.projects}</h2>
          <p className="section-subtitle">{texts.body.showcaseProjects}</p>
          
          <div className="projects-filter">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              {texts.body.allProjects}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Frontend' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Frontend')}
            >
              {texts.body.frontend}
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Full Stack' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Full Stack')}
            >
              {texts.body.fullStack}
            </button>
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <div key={index} className={`project-card ${project.featured ? 'featured' : ''}`}>
                {project.featured && <div className="featured-badge">{texts.body.featured}</div>}
                <div className="project-image">
                  <img src={project.img} alt={project.titleKey ? texts.body[project.titleKey] : project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                        {texts.body.liveDemo}
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        {texts.body.sourceCode}
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-category">{project.category === 'Frontend' ? texts.body.frontend : texts.body.fullStack}</div>
                  <h3>{project.titleKey ? texts.body[project.titleKey] : project.title}</h3>
                  <p>{texts.body[project.descriptionKey]}</p>
                  
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section 
        id="certifications" 
        className="certifications-section"
        ref={el => sectionRefs.current[4] = el}
      >
        <div className="container">
          <h2 className="section-title">
            <FaAward />
            {texts.body.certifications}
          </h2>
          <p className="section-subtitle">{texts.body.professionalCertifications}</p>
          
          <div className="certifications-grid">
            {certificatesWithImages.map((cert, index) => (
              <div key={index} className="certificate-card">
                <div className="certificate-image">
                  <img src={cert.image} alt={cert.title} />
                  <div className="certificate-overlay">
                    <FaAward className="certificate-icon" />
                  </div>
                </div>
                <div className="certificate-content">
                  <h3>{cert.title}</h3>
                  <p className="cert-issuer">{cert.issued_by}</p>
                  <p className="cert-duration">{cert.duration}</p>
                  <p className="cert-description">{cert.description.split('\n')[0]}</p>
                  
                  {cert.skills && (
                    <div className="cert-skills">
                      {cert.skills.map((skill, i) => (
                        <span key={i} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="contact-section"
        ref={el => sectionRefs.current[5] = el}
      >
        <div className="container">
          <h2 className="section-title">{texts.body.contactTitle}</h2>
          <p className="section-subtitle">{texts.body.letsDiscussProject}</p>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>{texts.body.letsWorkTogether}</h3>
              <p>{texts.body.opportunitiesChallenges}</p>
              
              <div className="contact-methods">
                <Link
                  to="#"
                  className="contact-btn"
                  onClick={openGmailCompose}
                >
                  <FaEnvelope />
                  {texts.body.sendMessage}
                </Link>
                
                <a 
                  href={cvFile} 
                  download="Ahmed_Osama_CV.pdf"
                  className="btn btn-secondary"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <FaDownload />
                  {texts.body.downloadCV}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
