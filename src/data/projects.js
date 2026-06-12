// src/data/projects.js
export const projects = [
  {
    id: 1,
    title: "Driver Drowsiness Detection",
    description: "AI-powered real-time system that detects driver drowsiness using computer vision and deep learning to prevent road accidents.",
    techStack: ["Python", "OpenCV", "TensorFlow", "CNN"],
    github: "https://github.com/username/driver-drowsiness",
    demo: "https://demo-link.com",
    docs: "https://docs-link.com",
    featured: true,
    category: "AI / ML",
    gradient: "from-violet-600 via-purple-500 to-pink-500",
    icon: "🚗",
  },
  {
    id: 2,
    title: "Customer Categorization",
    description: "ML model that segments customers by purchasing behavior for targeted marketing and improved retention strategies.",
    techStack: ["Python", "Scikit-learn", "Flask", "Pandas"],
    github: "https://github.com/abhinaypal/customer-categorization",
    demo: "https://customer-categorization-abhinay.streamlit.app/",
    docs: "https://github.com/abhinaypal/customer-categorization",
    featured: true,
    category: "AI / ML",
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    icon: "📊",
  },
  {
    id: 3,
    title: "Climate Visibility ML",
    description: "Predicts fog formation and visibility levels at JFK Airport using historical weather data with real-time alerts.",
    techStack: ["Python", "Scikit-learn", "NumPy", "Pandas"],
    github: "https://github.com/Abhinaypal/Climate-visibility-ML-project.git",
    demo: "https://demo-link.com",
    docs: "https://github.com/Abhinaypal/Climate-visibility-ML-project.git",
    featured: false,
    category: "AI / ML",
    gradient: "from-blue-600 via-indigo-500 to-violet-500",
    icon: "🌫️",
  },
  {
    id: 4,
    title: "AI Chat Application",
    description: "Intelligent NLP-powered chatbot that answers queries, schedules meetings and delivers personalised recommendations.",
    techStack: ["Python", "NLP", "React", "Socket.io"],
    github: "https://github.com/username/ai-chat",
    demo: "https://demo-link.com",
    docs: "https://docs-link.com",
    featured: false,
    category: "Web",
    gradient: "from-orange-500 via-pink-500 to-rose-500",
    icon: "🤖",
  },
  // ─── Add more projects here ───────────────────────────────────────────────
  // Copy the block above, paste below this comment, and update the fields.
  // Fields:
  //   id        – unique number
  //   title     – project name
  //   description – one-two sentences
  //   techStack – array of strings
  //   github    – GitHub URL
  //   demo      – live demo URL
  //   docs      – docs / writeup URL
  //   featured  – true → shown in spotlight row, false → shown in grid
  //   category  – "AI / ML" | "Web" | "Security" | "Data" | other
  //   gradient  – Tailwind gradient classes for the card accent
  //   icon      – emoji used as the visual
];

export const projectCategories = ["All", "AI / ML", "Web", "Security", "Data"];