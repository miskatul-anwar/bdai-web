import React from 'react';
import { 
  Database, 
  Search, 
  Brain, 
  Network, 
  Globe, 
  Wheat, 
  HeartPulse, 
  GraduationCap, 
  Map as MapIcon, 
  TrendingUp,
  FileSearch,
  MessageSquare,
  Users,
  Lightbulb,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const APP_DATA = {
  title: "BDAI",
  fullName: "BanglaDesh Sectoral Knowledge Graphs and Large Language Models for Artificial Intelligence-Driven Insights",
  hero: {
    title: "Revolutionizing Data Management in Bangladesh",
    subtitle: "Leveraging sectoral Knowledge Graphs and LLMs to empower stakeholders with actionable, AI-driven insights across key industries.",
    stats: [
      { label: "Sectors Covered", value: "5+" },
      { label: "Researchers", value: "10+" },
      { label: "AI Tools", value: "5" },
      { label: "Vision", value: "2025+" }
    ]
  },
  menuItems: [
    { name: "Home", href: "#home" },
    { name: "Team", href: "#team" },
    { name: "About", href: "#about" },
    { name: "Objectives", href: "#objectives", children: [
        { name: "OB1: Data Quality", href: "#ob1" },
        { name: "OB2: SMART Ecosystem", href: "#ob2" },
        { name: "OB3: KG Construction", href: "#ob3" },
        { name: "OB4: Analytics", href: "#ob4" },
        { name: "OB5: KG RAG", href: "#ob5" },
        { name: "OB6: Explainability", href: "#ob6" },
        { name: "OB7: askBDAI", href: "#ob7" },
        { name: "OB8: Capacity", href: "#ob8" }
    ]},
    { name: "Architecture", href: "#architecture" },
    { name: "Sectors", href: "#sectors" },
    { name: "Contact", href: "#contact" }
  ],
  about: {
    vision: {
      title: "Revolutionizing Data",
      text: "Revolutionize data management in Bangladesh, promoting sustainable, interoperable, and AI-driven solutions for \"Digital Bangladesh.\""
    },
    mission: {
      title: "Empowering Stakeholders",
      text: "Empower stakeholders with actionable, data-driven tools and insights across key sectors—empowering informed decision-making and accelerating progress toward the Sustainable Development Goals (SDGs)."
    },
    researchAreas: [
      { 
        title: "SMART Data Ecosystems", 
        desc: "Developing self-explorable, sustainable, and semantic data infrastructures tailored for Bangladesh.",
        icon: Network 
      },
      { 
        title: "Cross-Sectoral KGs", 
        desc: "Integrating diverse sectoral datasets (Agri, Health, Edu) into unified Knowledge Graphs.",
        icon: Database 
      },
      { 
        title: "KG-VLLM Validation", 
        desc: "Innovative use of Knowledge Graphs for validating and ensuring the factual accuracy of LLMs.",
        icon: ShieldCheck 
      },
      { 
        title: "Intelligent Interfaces", 
        desc: "AI tools with natural language interfaces and smart agents for direct decision support.",
        icon: MessageSquare 
      }
    ]
  },
  sectors: [
    { name: "Agriculture", icon: Wheat, color: "bg-green-100 text-green-600", desc: "Digital Twin and KG-based optimization for crop yields." },
    { name: "Healthcare", icon: HeartPulse, color: "bg-red-100 text-red-600", desc: "Semantic integration of medical records and AI diagnostics." },
    { name: "Education", icon: GraduationCap, color: "bg-blue-100 text-blue-600", desc: "Reducing disparities through SMART data ecosystems." },
    { name: "Tourism", icon: MapIcon, color: "bg-orange-100 text-orange-600", desc: "AI-powered guides and cultural heritage mapping." },
    { name: "Socio-economics", icon: TrendingUp, color: "bg-purple-100 text-purple-600", desc: "Data-driven policy insights for SDGs." }
  ],
  objectives: [
    { 
      id: "OB1", 
      title: "Open data quality", 
      details: "An Open data quality measurement framework",
      researcher: "(Masters-1)",
      icon: ShieldCheck
    },
    { 
      id: "OB2", 
      title: "SMART data ecosystem", 
      details: "A full-fledged SMART data ecosystem tailored to Bangladesh data",
      researcher: "Research Associate-1",
      icon: Network
    },
    { 
      id: "OB3", 
      title: "KG Construction", 
      details: "Knowledge graph construction and optimization for different sectors: Socio-economic, Agriculture, Healthcare, Education, Tourism",
      researcher: "PhD-1 + Research Assistant-1",
      icon: Database
    },
    { 
      id: "OB4", 
      title: "Cross-Sector Analytics", 
      details: "Enabling intra- and inter-sector analytics over knowledge graphs",
      researcher: "PhD-2 + Masters-2",
      icon: TrendingUp
    },
    { 
      id: "OB5", 
      title: "KG RAG", 
      details: "KG RAG: Leveraging KGs to provide the context to LLMs through retrieval augmented generation pipelines",
      researcher: "Masters-3",
      icon: Brain
    },
    { 
      id: "OB6", 
      title: "Explainability & Fairness", 
      details: "Ensuring explainability, bias and fairness, and validity of LLMs through KGs and vice versa",
      researcher: "PhD-3 + PostDoc-1",
      icon: Lightbulb
    },
    { 
      id: "OB7", 
      title: "askBDAI", 
      details: "askBDAI: An AI-powered data-driven Q/A system exploiting graph pattern",
      researcher: "Masters 4 + Research Assistant-2",
      icon: MessageSquare
    },
    { 
      id: "OB8", 
      title: "Capacity Building", 
      details: "Capacity building through publications, workshops, collaboration, and engagement activities",
      researcher: "Research Team",
      icon: GraduationCap
    }
  ],
  team: [
    { 
      name: "Dr. Rudra Pratap Deb Nath", 
      role: "SPM", 
      sub: "Associate Professor, University of Chittagong", 
      specialty: "Knowledge Graph, Semantic Web, Data Science",
      initials: "RPDN",
      image: "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=TkQGAWoAAAAJ&citpid=3"
    },
    { 
      name: "Dr. Abu Nowshed Chy", 
      role: "ASPM", 
      sub: "Assistant Professor, University of Chittagong", 
      specialty: "NLP, Deep Learning, AI",
      initials: "ANC",
      image: "https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=hQuUosgAAAAJ&citpid=1"
    },
    { 
      name: "Dr. Md. Mahbubul Islam", 
      role: "Member-1", 
      sub: "Associate Professor, South Korea PhD", 
      specialty: "Computer Vision, Machine Learning",
      initials: "MMI",
      image: "https://cu.ac.bd/assets/image/faculty_staff_users/40_Q11H4CDWTD.jpg"
    },
    { 
      name: "Ms. Shima Chakraborty", 
      role: "Member-2", 
      sub: "Assistant Professor, BD", 
      specialty: "Semantic Web, Data Science",
      initials: "SC",
      image: "https://cu.ac.bd/assets/image/faculty_staff_users/45_8Z6DUQK4EF.jpg"
    }
  ],
  partners: [
    { name: "University of Chittagong", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/86/University_of_Chittagong_logo.svg/330px-University_of_Chittagong_logo.svg.png" },
    { name: "Bangladesh Govt", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Emblem_of_Bangladesh.svg/500px-Emblem_of_Bangladesh.svg.png" },
    { name: "World Bank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/500px-The_World_Bank_logo.svg.png" },
    { name: "UGC Bangladesh", logo: "https://heat.ugc.gov.bd/heat-gov-images/logos/logo.svg" },
    { name: "HEAT Bangladesh", logo: "https://heat.ugc.gov.bd/heat-gov-images/logos/logo.svg" }
  ]
};
