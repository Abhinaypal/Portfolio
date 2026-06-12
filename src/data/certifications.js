// src/data/certifications.js

const ISSUERS = {
  'PhysicsWallah':             { color: '#F7941D', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/PW_Logo.png/800px-PW_Logo.png' },
  'Deloitte':                  { color: '#86BC25', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/2560px-Deloitte.svg.png' },
  'Amazon Web Services':       { color: '#FF9900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  'IBM SkillsBuild':           { color: '#006699', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg' },
  'Infosys Springboard':       { color: '#007CC2', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/2560px-Infosys_logo.svg.png' },
  'Coursera':                  { color: '#0056D2', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/2048px-Coursera-Logo_600x600.svg.png' },
  'Coursera Project Network':  { color: '#5E35B1', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/2048px-Coursera-Logo_600x600.svg.png' },
  'Google':                    { color: '#4285F4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg' },
  'Microsoft':                 { color: '#00A4EF', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
}

const issuer = (name) => ISSUERS[name] || { color: '#ec4899', logo: null }

export const certifications = [
  // ── PRIORITY 1 ────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Data Science With Generative AI',
    organization: 'PhysicsWallah',
    date: 'Oct 2025',
    badge: '⭐ Featured',
    description: 'Successfully completed the comprehensive Data Science with Generative AI program by PhysicsWallah (PW Skills), covering Python, statistics, ML algorithms, deep learning, LLMs, and hands-on Generative AI projects.',
    certNo: 'e8d334c7-bfd0-4966-8ae8-57065b59f463',
    verifyUrl: 'https://pwskills.com/learn/certificate-validation',
    ...issuer('PhysicsWallah'),
  },

  // ── PRIORITY 2 ────────────────────────────────────────────────────────────
  {
    id: 2,
    name: 'Data Analytics Job Simulation',
    organization: 'Deloitte',
    date: 'Mar 2026',
    description: 'Completed Deloitte\'s Data Analytics Job Simulation via Forage, gaining practical experience in data analysis and forensic technology — working on real-world business scenarios as a Deloitte analyst.',
    verifyUrl: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Deloitte-Digital/io9DzWKe3PTsiS6GE_Deloitte%20Digital_679i5hQa4p9RvuBMu_1741382400000_completion_certificate.pdf',
    ...issuer('Deloitte'),
  },

  // ── REST ──────────────────────────────────────────────────────────────────
  {
    id: 3,
    name: 'AWS Academy Graduate — Machine Learning Foundations',
    organization: 'Amazon Web Services',
    date: 'May 2026',
    hours: '20 hours',
    description: 'Completed the AWS Academy Machine Learning Foundations training badge, covering core ML concepts, AWS ML services, and hands-on labs using Amazon SageMaker.',
    verifyUrl: 'https://www.credly.com/go/ZzOkImuN',
    ...issuer('Amazon Web Services'),
  },
  {
    id: 4,
    name: 'AI Fundamentals: Language and Vision in AI',
    organization: 'IBM SkillsBuild',
    date: 'Jun 2026',
    description: 'Gained foundational knowledge of Natural Language Processing (NLP) and Computer Vision through IBM SkillsBuild, covering language models, image recognition, and real-world AI applications.',
    verifyUrl: 'https://www.credly.com/go/B4Ffp5LA',
    ...issuer('IBM SkillsBuild'),
  },
  {
    id: 5,
    name: 'Windows Server 2022: Networking Principles',
    organization: 'Infosys Springboard',
    date: 'Dec 2025',
    description: 'Successfully completed the Infosys Springboard course on Windows Server 2022 Networking, covering DNS, DHCP, TCP/IP, routing, and enterprise network configuration principles.',
    verifyUrl: 'https://verify.onwingspan.com',
    ...issuer('Infosys Springboard'),
  },
  {
    id: 6,
    name: 'Kali Linux',
    organization: 'Coursera',
    date: 'Dec 2025',
    description: 'Completed the Kali Linux course authorized by Board Infinity via Coursera, covering ethical hacking tools, penetration testing techniques, and cybersecurity fundamentals using Kali Linux.',
    verifyUrl: 'https://coursera.org/verify/OSW9L3TXDZV5',
    ...issuer('Coursera'),
  },
  {
    id: 7,
    name: 'Getting Started with Microsoft Excel',
    organization: 'Coursera Project Network',
    date: 'Sep 2025',
    description: 'Completed a hands-on Coursera guided project covering Microsoft Excel essentials — formulas, functions, charts, pivot tables, and data analysis workflows for real-world business use.',
    verifyUrl: 'https://coursera.org/verify/6RNNYKLG4MLT',
    ...issuer('Coursera Project Network'),
  },

  // ─── Add more certifications here ─────────────────────────────────────────
  // Copy any block above, paste below, and update the fields.
  // Fields:
  //   id          – unique number (increment from last)
  //   name        – full certificate name
  //   organization – issuing org (must match a key in ISSUERS for auto logo/color)
  //   date        – "Mon YYYY" format
  //   description – 1-2 sentences about what you learned
  //   verifyUrl   – direct verification link
];