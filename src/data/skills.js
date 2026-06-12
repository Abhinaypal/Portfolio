// src/data/skills.js
const DEV_ICON = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`
const DEV_ICON_PLAIN = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-plain.svg`

export const skillsData = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python",     logo: DEV_ICON('python'),     color: "#3776AB", docs: "https://docs.python.org/3/" },
      { name: "Java",       logo: DEV_ICON('java'),       color: "#ED8B00", docs: "https://docs.oracle.com/en/java/" },
      { name: "C",          logo: DEV_ICON('c'),          color: "#A8B9CC", docs: "https://devdocs.io/c/" },
      { name: "JavaScript", logo: DEV_ICON('javascript'), color: "#F7DF1E", docs: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "TypeScript", logo: DEV_ICON('typescript'), color: "#3178C6", docs: "https://www.typescriptlang.org/docs/" },
    ]
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "HTML5",      logo: DEV_ICON('html5'),      color: "#E34F26", docs: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS3",       logo: DEV_ICON('css3'),       color: "#1572B6", docs: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "React",      logo: DEV_ICON('react'),      color: "#61DAFB", docs: "https://react.dev/" },
      { name: "Node.js",    logo: DEV_ICON('nodejs'),     color: "#339933", docs: "https://nodejs.org/docs/latest/api/" },
      { name: "Tailwind",   logo: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg`, color: "#06B6D4", docs: "https://tailwindcss.com/docs" },
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL",      logo: DEV_ICON('mysql'),      color: "#4479A1", docs: "https://dev.mysql.com/doc/" },
      { name: "MongoDB",    logo: DEV_ICON('mongodb'),    color: "#47A248", docs: "https://docs.mongodb.com/" },
      { name: "PostgreSQL", logo: DEV_ICON('postgresql'), color: "#4169E1", docs: "https://www.postgresql.org/docs/" },
    ]
  },
  {
    category: "AI / ML",
    skills: [
      { name: "Pandas",     logo: DEV_ICON('pandas'),     color: "#150458", docs: "https://pandas.pydata.org/docs/" },
      { name: "NumPy",      logo: DEV_ICON('numpy'),      color: "#013243", docs: "https://numpy.org/doc/stable/" },
      { name: "Scikit-learn", logo: DEV_ICON('scikitlearn'), color: "#F7931E", docs: "https://scikit-learn.org/stable/documentation.html" },
      { name: "TensorFlow", logo: DEV_ICON('tensorflow'), color: "#FF6F00", docs: "https://www.tensorflow.org/api_docs" },
    ]
  },
  {
    category: "Cloud & Tools",
    skills: [
      { name: "Git",        logo: DEV_ICON('git'),        color: "#F05032", docs: "https://git-scm.com/doc" },
      { name: "GitHub",     logo: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg`, color: "#181717", docs: "https://docs.github.com/en" },
      { name: "Linux",      logo: DEV_ICON('linux'),      color: "#FCC624", docs: "https://www.kernel.org/doc/" },
      { name: "Docker",     logo: DEV_ICON('docker'),     color: "#2496ED", docs: "https://docs.docker.com/" },
      { name: "VS Code",    logo: DEV_ICON('vscode'),     color: "#007ACC", docs: "https://code.visualstudio.com/docs" },
    ]
  },
];