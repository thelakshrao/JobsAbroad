"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import GlobalNavbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Briefcase,
  GraduationCap,
  FileText,
  Crown,
  ChevronDown,
  ChevronUp,
  Settings,
  FileCode,
  Award,
  Pencil,
  Check,
  Trash2,
  Zap,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    phone: userData?.phone || "",
    location: userData?.location || "",
    dob: userData?.dob || "",
    gender: userData?.gender || "",
  });
  const [education, setEducation] = useState(
    userData?.education || {
      college: {
        name: "",
        degree: "",
        specialization: "",
        scoreType: "percentage",
        score: "",
      },
      twelfth: {
        school: "",
        board: "",
        stream: "",
        scoreType: "percentage",
        score: "",
      },
      tenth: { school: "", board: "", scoreType: "percentage", score: "" },
    },
  );
  const SUGGESTED_SKILLS = [
    // WEB FRONTEND (1-60)
    "React",
    "Next.js",
    "Vue.js",
    "Angular",
    "Svelte",
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Bootstrap",
    "Sass",
    "Redux",
    "Zustand",
    "Recoil",
    "MobX",
    "Three.js",
    "Web3.js",
    "jQuery",
    "WebAssembly",
    "Remix",
    "Astro",
    "Gatsby",
    "Nuxt.js",
    "SolidJS",
    "Qwik",
    "Alpine.js",
    "Lit",
    "Handlebars",
    "Pug",
    "Less",
    "Stylus",
    "PostCSS",
    "Material UI",
    "Chakra UI",
    "Ant Design",
    "Radix UI",
    "Shadcn UI",
    "DaisyUI",
    "Semantic UI",
    "Foundation",
    "Bulma",
    "BEM",
    "Flexbox",
    "CSS Grid",
    "Canvas API",
    "SVG Animation",
    "GSAP",
    "Framer Motion",
    "Anime.js",
    "WebVitals",
    "PWA",
    "Service Workers",
    "Web Workers",
    "WebSockets",
    "WebRTC",
    "Babel",
    "Webpack",
    "Vite",
    "Parcel",

    // BACKEND & RUNTIMES (61-130)
    "Node.js",
    "Deno",
    "Bun",
    "Express.js",
    "NestJS",
    "Fastify",
    "Koa",
    "Hapi.js",
    "Python",
    "Django",
    "Flask",
    "FastAPI",
    "Tornado",
    "Pyramid",
    "Ruby",
    "Ruby on Rails",
    "Sinatra",
    "PHP",
    "Laravel",
    "Symfony",
    "CodeIgniter",
    "Yii",
    "Phalcon",
    "Java",
    "Spring Boot",
    "Spring MVC",
    "Jakarta EE",
    "Hibernate",
    "Go",
    "Gin",
    "Echo",
    "Fiber",
    "Rust",
    "Actix",
    "Rocket",
    "C#",
    ".NET",
    "ASP.NET Core",
    "Entity Framework",
    "C++",
    "C",
    "Scala",
    "Play Framework",
    "Akka",
    "Kotlin",
    "Ktor",
    "Elixir",
    "Phoenix",
    "Erlang",
    "Clojure",
    "Haskell",
    "Dart",
    "Solidity",
    "Vyper",
    "Zig",
    "Perl",
    "Raku",
    "Fortran",
    "COBOL",
    "Pascal",
    "Assembly",
    "ColdFusion",
    "Apex",
    "Julia",
    "Mojo",
    "Ballerina",
    "Lisp",
    "Prolog",
    "Grails",
    "Micronaut",

    // DATABASES & CACHING (131-190)
    "PostgreSQL",
    "MySQL",
    "MariaDB",
    "SQLite",
    "SQL Server",
    "Oracle Database",
    "IBM DB2",
    "CockroachDB",
    "MongoDB",
    "CouchDB",
    "RavenDB",
    "Redis",
    "Memcached",
    "DragonflyDB",
    "Cassandra",
    "ScyllaDB",
    "HBase",
    "Neo4j",
    "ArangoDB",
    "SurrealDB",
    "Firebase Realtime Database",
    "Firestore",
    "Supabase",
    "Pocketbase",
    "DynamoDB",
    "Cosmos DB",
    "FaunaDB",
    "InfluxDB",
    "TimescaleDB",
    "QuestDB",
    "Elasticsearch",
    "Meilisearch",
    "Algolia",
    "Solr",
    "Prisma",
    "Drizzle ORM",
    "Sequelize",
    "TypeORM",
    "Mongoose",
    "Knex.js",
    "Active Record",
    "Hibernate",
    "JOOQ",
    "SQLAlchemy",
    "Tortoise ORM",
    "PonyORM",
    "ElasticSearch",
    "OpenSearch",
    "ClickHouse",
    "Presto",
    "Trino",
    "Snowflake",
    "BigQuery",
    "Redshift",
    "Teradata",
    "DuckDB",
    "KeyDB",
    "Upstash",

    // CLOUD & DEVOPS (191-260)
    "AWS",
    "AWS Lambda",
    "AWS EC2",
    "AWS S3",
    "AWS RDS",
    "Google Cloud Platform",
    "GCP Cloud Run",
    "GCP App Engine",
    "Azure",
    "Azure Functions",
    "DigitalOcean",
    "Linode",
    "Hetzner",
    "Vercel",
    "Netlify",
    "Cloudflare Pages",
    "Cloudflare Workers",
    "Heroku",
    "Railway",
    "Fly.io",
    "Render",
    "Docker",
    "Docker Compose",
    "Kubernetes",
    "Helm",
    "Terraform",
    "Ansible",
    "Puppet",
    "Chef",
    "Pulumi",
    "Jenkins",
    "GitHub Actions",
    "GitLab CI",
    "CircleCI",
    "Travis CI",
    "Bitbucket Pipelines",
    "ArgoCD",
    "Tekton",
    "Nginx",
    "Apache HTTP Server",
    "Caddy",
    "Traefik",
    "HAProxy",
    "Prometheus",
    "Grafana",
    "ELK Stack",
    "Loki",
    "Datadog",
    "New Relic",
    "Sentry",
    "OpenTelemetry",
    "Linux",
    "Ubuntu",
    "Debian",
    "CentOS",
    "RHEL",
    "Arch Linux",
    "Alpine Linux",
    "Bash Scripting",
    "PowerShell",
    "Zsh",
    "Vagrant",
    "Proxmox",
    "VMware",
    "Serverless Framework",
    "Istio",
    "Linkerd",
    "Knative",

    // MOBILE DEVELOPMENT (261-300)
    "React Native",
    "Expo",
    "Flutter",
    "Dart",
    "Swift",
    "SwiftUI",
    "Objective-C",
    "Kotlin",
    "Kotlin Multiplatform",
    "Java (Android)",
    "Android SDK",
    "Jetpack Compose",
    "Ionic",
    "Capacitor",
    "Cordova",
    "Xamarin",
    "MAUI",
    "NativeScript",
    "Appcelerator",
    "Unity (Mobile)",
    "Unreal Engine (Mobile)",
    "Mobile Design",
    "App Store Optimization",
    "TestFlight",
    "Google Play Console",
    "Fastlane",
    "Firebase Crashlytics",
    "RevenueCat",
    "Push Notifications",
    "Bluetooth Low Energy",

    // DATA SCIENCE, AI & ML (301-370)
    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "Neural Networks",
    "Generative AI",
    "LLMs",
    "Prompt Engineering",
    "OpenAI API",
    "LangChain",
    "Hugging Face",
    "TensorFlow",
    "PyTorch",
    "Keras",
    "JAX",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "SciPy",
    "Matplotlib",
    "Seaborn",
    "Plotly",
    "D3.js",
    "R Language",
    "Tidyverse",
    "Data Analysis",
    "Data Visualization",
    "Big Data",
    "Apache Spark",
    "Apache Flink",
    "Apache Kafka",
    "Hadoop",
    "Data Engineering",
    "ETL Pipelines",
    "Airflow",
    "Dagster",
    "Prefect",
    "Natural Language Processing",
    "Computer Vision",
    "OpenCV",
    "Reinforcement Learning",
    "Recommendation Systems",
    "MLOps",
    "Weights & Biases",
    "MLflow",
    "SageMaker",
    "Data Mining",
    "Statistical Modeling",
    "Bayesian Inference",
    "Quantitative Analysis",
    "Bioinformatics",
    "Genomics",

    // TESTING & SECURITY (371-420)
    "Jest",
    "Vitest",
    "Cypress",
    "Playwright",
    "Selenium",
    "Puppeteer",
    "Testing Library",
    "Storybook",
    "Mocha",
    "Chai",
    "Jasmine",
    "Karma",
    "Appium",
    "Detox",
    "Pytest",
    "JUnit",
    "NUnit",
    "Unit Testing",
    "Integration Testing",
    "E2E Testing",
    "TDD",
    "BDD",
    "Penetration Testing",
    "Ethical Hacking",
    "OWASP",
    "Burp Suite",
    "Metasploit",
    "Nmap",
    "Wireshark",
    "Cryptography",
    "SSL/TLS",
    "OAuth2",
    "OpenID Connect",
    "JWT",
    "SAML",
    "IAM",
    "Vulnerability Assessment",
    "Firewalls",
    "SOC 2 Compliance",
    "GDPR",
    "HIPAA Compliance",

    // DESIGN & UI/UX (421-460)
    "Figma",
    "Adobe XD",
    "Sketch",
    "Framer",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Adobe InDesign",
    "Adobe After Effects",
    "Adobe Premiere Pro",
    "Canva",
    "Blender",
    "Cinema 4D",
    "AutoCAD",
    "SolidWorks",
    "UI Design",
    "UX Research",
    "User Flows",
    "Wireframing",
    "Prototyping",
    "Design Systems",
    "Typography",
    "Color Theory",
    "Interaction Design",
    "Responsive Design",
    "Accessibility (A11y)",
    "Design Thinking",
    "Brand Identity",
    "Motion Graphics",
    "3D Modeling",
    "Character Design",

    // BUSINESS & MANAGEMENT (461-510)
    "Project Management",
    "Agile",
    "Scrum",
    "Kanban",
    "Product Management",
    "SaaS Management",
    "CRM",
    "Salesforce",
    "HubSpot",
    "Zendesk",
    "ERP",
    "SAP",
    "Technical Writing",
    "Documentation",
    "SEO",
    "Search Engine Marketing",
    "Content Strategy",
    "Digital Marketing",
    "Social Media Marketing",
    "Email Marketing",
    "Google Analytics",
    "Hotjar",
    "Mixpanel",
    "Amplitude",
    "Growth Hacking",
    "Business Intelligence",
    "Public Speaking",
    "Leadership",
    "Team Building",
    "Stakeholder Management",
    "Crisis Management",
    "Budgeting",
    "Financial Analysis",
    "Legal Compliance",
    "Entrepreneurship",

    // SOFT SKILLS & OTHERS (511-550+)
    "Problem Solving",
    "Critical Thinking",
    "Communication",
    "Time Management",
    "Collaboration",
    "Emotional Intelligence",
    "Adaptability",
    "Creativity",
    "Remote Work",
    "Mental Health Awareness",
    "Blockchain",
    "Web3",
    "Ethereum",
    "Smart Contracts",
    "Solana",
    "NFTs",
    "DeFi",
    "DAO",
    "IoT",
    "Embedded Systems",
    "Arduino",
    "Raspberry Pi",
    "Microcontrollers",
    "FPGA",
    "VHDL",
    "Verilog",
    "Game Development",
    "Unity 3D",
    "Unreal Engine 5",
    "Godot",
    "Pygame",
    "AR/VR",
    "Oculus SDK",
    "Computer Graphics",
  ];
  const [experiences, setExperiences] = useState([
    {
      company: "",
      role: "",
      joining: "",
      leaving: "",
      isPresent: false,
      noticePeriod: "NA",
      description: "",
    },
  ]);
  const [summary, setSummary] = useState(userData?.summary || "");
  const [saveStatus, setSaveStatus] = useState("");
  const [skills, setSkills] = useState([]);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuggestions =
    searchTerm.trim() === ""
      ? []
      : SUGGESTED_SKILLS.filter(
          (s) =>
            s.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !skills.includes(s),
        );

  const handleSave = async () => {
    if (!userData?.email) return;

    try {
      setSaveStatus("Saving...");
      const userRef = doc(db, "users", userData.email.toLowerCase());

      const updatePayload = {
        fullName: formData.name,
        phone: formData.phone,
        location: formData.location,
        dob: formData.dob,
        gender: formData.gender,
        summary: summary,
        education: education,
        experiences: experiences,
        skills: skills,
      };

      await updateDoc(userRef, updatePayload);

      setUserData((prev) => ({ ...prev, ...updatePayload }));

      setIsEditing(false);
      setIsEditingSkills(false);
      setSaveStatus("Saved!");
      setTimeout(() => setSaveStatus(""), 2000);
    } catch (error) {
      console.error("Firebase Error:", error);
      setSaveStatus("Error!");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email.toLowerCase();
        const ref = doc(db, "users", userEmail);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setUserData(data);
          setSummary(data.summary || "");

          if (data.education) {
            setEducation(data.education);
          }

          if (data.experiences) {
            setExperiences(data.experiences);
          }
          if (data.skills) {
            setSkills(data.skills);
          }

          setFormData({
            name: data.fullName || data.name || "",
            phone: data.phone || "",
            location: data.location || "",
            dob: data.dob || "",
            gender: data.gender || "",
          });
        }
      } else {
        router.push("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);
  if (loading)
    return (
      <div className="h-screen flex items-center justify-center font-black uppercase text-xs tracking-widest text-black">
        Loading Details...
      </div>
    );

  return (
    <main className="min-h-screen bg-[#eef2f6]">
      {saveStatus && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              {saveStatus}
            </span>
          </div>
        </div>
      )}
      <GlobalNavbar />

      <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-10 items-start">
        <aside className="lg:col-span-3 lg:sticky lg:top-32 w-full z-30">
          <div className="lg:hidden fixed top-17 left-0 right-0 z-100 bg-[#eef2f6] px-4 py-2 border-b border-slate-200 shadow-sm">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full bg-white rounded-3xl p-4 shadow-md border border-white flex items-center gap-4 active:scale-95 transition-all"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                <User size={20} />
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-black uppercase text-black tracking-tighter">
                    {userData?.fullName}
                  </span>
                  <span className="text-[10px] font-black text-blue-600">
                    75% Strength
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-black h-full w-[75%] rounded-full" />
                </div>
              </div>
              {mobileMenuOpen ? (
                <ChevronUp size={18} className="text-slate-400" />
              ) : (
                <ChevronDown size={18} className="text-slate-400" />
              )}
            </button>
          </div>
          <div className="lg:hidden h-24" />
          <div
            className={`bg-white rounded-[40px] shadow-sm border border-white transition-all duration-500 ease-in-out overflow-hidden ${
              mobileMenuOpen
                ? "max-h-250 p-8 opacity-100 mb-6 border-blue-100"
                : "max-h-0 lg:max-h-none opacity-0 lg:opacity-100 p-0 lg:p-8"
            }`}
          >
            <div className="hidden lg:block text-center">
              <div className="relative w-28 h-28 mx-auto mb-6 group">
                <div className="w-full h-full bg-blue-600 rounded-[35px] flex items-center justify-center text-white shadow-2xl shadow-blue-100">
                  <User size={48} />
                </div>
              </div>

              <h2 className="font-black text-xl uppercase tracking-tighter text-black leading-tight">
                {userData?.fullName || "New User"}
              </h2>
              <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-2 mb-8">
                {userData?.workStatus}
              </p>
              <div className="text-left bg-slate-50 p-5 rounded-3xl border border-slate-100 mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[9px] font-black uppercase text-black">
                    Profile Strength
                  </span>
                  <span className="text-[9px] font-black text-blue-600">
                    75%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
                  <div className="bg-black h-full rounded-full w-[75%]" />
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { label: "Personal Info", icon: <Mail size={16} /> },
                { label: "Summary", icon: <FileText size={16} /> },
                { label: "Education", icon: <GraduationCap size={16} /> },
                { label: "Experience", icon: <Briefcase size={16} /> },
                { label: "Skill", icon: <Settings size={16} /> },
                { label: "Resume", icon: <FileCode size={16} /> },
                { label: "Certificate (Optional)", icon: <Award size={16} /> },
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-4 py-4 px-4 rounded-2xl text-left hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-slate-400 group-hover:text-blue-600 transition-colors">
                    {item.icon}
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-widest text-black">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="lg:col-span-6 space-y-6">
          <section
            id="info"
            className="bg-white rounded-[30px] md:rounded-[40px] p-5 lg:p-10 shadow-sm border border-white group"
          >
            <div className="flex items-center justify-between mb-5 md:mb-8">
              <h3 className="text-[11px] md:text-sm font-black uppercase tracking-widest text-black flex items-center gap-2 md:gap-3">
                <User size={16} className="text-blue-600" /> Personal Info
              </h3>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`p-2 rounded-xl transition-all ${isEditing ? "bg-green-600 text-white" : "bg-slate-50 text-black hover:bg-black hover:text-white"}`}
              >
                {isEditing ? <Check size={14} /> : <Pencil size={14} />}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-5 md:gap-6">
              <div>
                <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  Full Name
                </p>
                {isEditing ? (
                  <input
                    className="text-[10px] md:text-xs font-black text-black border-b border-blue-200 w-full focus:outline-none bg-transparent"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-[10px] md:text-xs font-black text-black truncate">
                    {userData?.fullName || "Not Set"}
                  </p>
                )}
              </div>

              <div>
                <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  Email Address
                </p>
                <p className="text-[10px] md:text-xs font-black text-slate-500 truncate">
                  {userData?.email}
                </p>
              </div>

              <div>
                <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  Phone Number
                </p>
                {isEditing ? (
                  <input
                    className="text-[10px] md:text-xs font-black text-black border-b border-blue-200 w-full focus:outline-none bg-transparent"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-[10px] md:text-xs font-black text-black">
                    {userData?.phone || "Not Set"}
                  </p>
                )}
              </div>

              <div>
                <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  Location
                </p>
                {isEditing ? (
                  <input
                    className="text-[10px] md:text-xs font-black text-black border-b border-blue-200 w-full focus:outline-none bg-transparent"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-[10px] md:text-xs font-black text-black truncate">
                    {userData?.location || "Not Set"}
                  </p>
                )}
              </div>

              <div>
                <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  Date of Birth
                </p>
                {isEditing ? (
                  <input
                    type="date"
                    className="text-[10px] md:text-xs font-black text-black border-b border-blue-200 w-full focus:outline-none bg-transparent"
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-[10px] md:text-xs font-black text-black">
                    {userData?.dob || "Not Set"}
                  </p>
                )}
              </div>

              <div>
                <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                  Gender
                </p>
                {isEditing ? (
                  <select
                    className="text-[10px] md:text-xs font-black text-black border-b border-blue-200 w-full focus:outline-none bg-transparent"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <p className="text-[10px] md:text-xs font-black text-black">
                    {userData?.gender || "Not Set"}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section
            id="summery"
            className="bg-white rounded-[30px] md:rounded-[40px] p-5 lg:p-10 shadow-sm border border-white"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-[11px] md:text-sm font-black uppercase tracking-widest text-black flex items-center gap-2 md:gap-3">
                <FileText size={16} className="text-blue-600" /> Professional
                Summary
              </h3>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`p-2 rounded-xl transition-all ${
                  isEditing
                    ? "bg-green-600 text-white"
                    : "bg-slate-50 text-black hover:bg-black hover:text-white"
                }`}
              >
                {isEditing ? <Check size={14} /> : <Pencil size={14} />}
              </button>
            </div>

            {isEditing ? (
              <textarea
                className="w-full p-3 md:p-4 text-[11px] md:text-[13px] font-black text-black border border-blue-100 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-600 min-h-25 bg-slate-50"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            ) : (
              <p className="text-slate-500 font-bold leading-relaxed text-[11px] md:text-[13px]">
                {userData?.summary ||
                  "Add a brief overview of your career goals and key achievements to stand out to global recruiters."}
              </p>
            )}
          </section>

          <section
            id="education"
            className="bg-white rounded-[30px] md:rounded-[40px] p-5 lg:p-10 shadow-sm border border-white"
          >
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-[11px] md:text-sm font-black uppercase tracking-widest text-black flex items-center gap-2 md:gap-3">
                <GraduationCap size={16} className="text-blue-600" /> Education
              </h3>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`p-2 rounded-xl transition-all ${isEditing ? "bg-green-600 text-white" : "bg-slate-50 text-black hover:bg-black hover:text-white"}`}
              >
                {isEditing ? <Check size={14} /> : <Pencil size={14} />}
              </button>
            </div>

            <div className="space-y-8 md:space-y-10">
              {/* COLLEGE SECTION */}
              <div className="border-l-2 border-blue-600 pl-4 md:pl-6 space-y-4 md:space-y-6">
                <p className="text-[9px] md:text-[10px] font-black uppercase text-blue-600 tracking-widest">
                  College / University
                </p>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-x-12 md:gap-y-6">
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      College Name
                    </p>
                    {isEditing ? (
                      <input
                        className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-1"
                        value={education.college.name}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            college: {
                              ...education.college,
                              name: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black uppercase truncate">
                        {userData?.education?.college?.name || "Not Set"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      Degree
                    </p>
                    {isEditing ? (
                      <input
                        className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-1"
                        value={education.college.degree}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            college: {
                              ...education.college,
                              degree: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black uppercase">
                        {userData?.education?.college?.degree || "Not Set"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      Specialization
                    </p>
                    {isEditing ? (
                      <input
                        className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-1"
                        value={education.college.specialization}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            college: {
                              ...education.college,
                              specialization: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black uppercase">
                        {userData?.education?.college?.specialization ||
                          "Not Set"}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      College Score
                    </p>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <select
                          className="text-[9px] font-black border-b border-black bg-transparent"
                          value={education.college.scoreType}
                          onChange={(e) =>
                            setEducation({
                              ...education,
                              college: {
                                ...education.college,
                                scoreType: e.target.value,
                                score: "",
                              },
                            })
                          }
                        >
                          <option value="percentage">%</option>
                          <option value="cgpa">10</option>
                        </select>
                        <input
                          type="number"
                          className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-1"
                          value={education.college.score}
                          onChange={(e) =>
                            setEducation({
                              ...education,
                              college: {
                                ...education.college,
                                score: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black">
                        {userData?.education?.college?.score
                          ? `${userData.education.college.score} (${userData.education.college.scoreType === "percentage" ? "%" : "CGPA"})`
                          : "Not Set"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className=" border-l-2 border-slate-200 pl-4 md:pl-6 space-y-4 md:space-y-6">
                <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Class XII
                </p>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-x-12 md:gap-y-6">
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      School Name
                    </p>
                    {isEditing ? (
                      <input
                        className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-1"
                        value={education.twelfth.school}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            twelfth: {
                              ...education.twelfth,
                              school: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black uppercase truncate">
                        {userData?.education?.twelfth?.school || "Not Set"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      Board
                    </p>
                    {isEditing ? (
                      <input
                        className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-1"
                        value={education.twelfth.board}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            twelfth: {
                              ...education.twelfth,
                              board: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black uppercase">
                        {userData?.education?.twelfth?.board || "Not Set"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      Stream
                    </p>
                    {isEditing ? (
                      <select
                        className="text-[10px] font-black border-b border-black w-full bg-transparent py-1"
                        value={education.twelfth.stream}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            twelfth: {
                              ...education.twelfth,
                              stream: e.target.value,
                            },
                          })
                        }
                      >
                        <option value="">Select</option>
                        <option value="PCM">PCM</option>
                        <option value="PCB">PCB</option>
                        <option value="PCMB">PCMB</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts">Arts</option>
                      </select>
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black uppercase">
                        {userData?.education?.twelfth?.stream || "Not Set"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      Marks (%)
                    </p>
                    {isEditing ? (
                      <input
                        type="number"
                        className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-1"
                        value={education.twelfth.score}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            twelfth: {
                              ...education.twelfth,
                              score: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black">
                        {userData?.education?.twelfth?.score
                          ? `${userData.education.twelfth.score}%`
                          : "Not Set"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-l-2 border-slate-200 pl-4 md:pl-6 space-y-4 md:space-y-6">
                <p className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Class X
                </p>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-x-12 md:gap-y-6">
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      School Name
                    </p>
                    {isEditing ? (
                      <input
                        className="text-[10px] md:text-xs font-black border-b border-black w-full bg-transparent py-1"
                        value={education.tenth.school}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            tenth: {
                              ...education.tenth,
                              school: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black uppercase truncate">
                        {userData?.education?.tenth?.school || "Not Set"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      Board
                    </p>
                    {isEditing ? (
                      <input
                        className="text-[10px] md:text-xs font-black border-b border-black w-full bg-transparent py-1"
                        value={education.tenth.board}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            tenth: {
                              ...education.tenth,
                              board: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black uppercase">
                        {userData?.education?.tenth?.board || "Not Set"}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                      Percentage
                    </p>
                    {isEditing ? (
                      <input
                        type="number"
                        className="text-[10px] md:text-xs font-black border-b border-black w-full bg-transparent py-1"
                        value={education.tenth.score}
                        onChange={(e) =>
                          setEducation({
                            ...education,
                            tenth: {
                              ...education.tenth,
                              score: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      <p className="text-[10px] md:text-xs font-black text-black">
                        {userData?.education?.tenth?.score
                          ? `${userData.education.tenth.score}%`
                          : "Not Set"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="work"
            className="bg-white rounded-[30px] md:rounded-[40px] p-5 lg:p-10 shadow-sm border border-white"
          >
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-[11px] md:text-sm font-black uppercase tracking-widest text-black flex items-center gap-2 md:gap-3">
                <Briefcase size={16} className="text-blue-600" /> Work
                Experience
              </h3>
              <div className="flex items-center gap-2">
                {isEditing && (
                  <button
                    onClick={() =>
                      setExperiences([
                        ...experiences,
                        {
                          company: "",
                          role: "",
                          joining: "",
                          leaving: "",
                          isPresent: false,
                          noticePeriod: "NA",
                          description: "",
                        },
                      ])
                    }
                    className="bg-slate-50 px-3 py-2 rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all"
                  >
                    + Add New
                  </button>
                )}
                <button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className={`p-2 rounded-xl transition-all ${isEditing ? "bg-green-600 text-white" : "bg-slate-50 text-black hover:bg-black hover:text-white"}`}
                >
                  {isEditing ? <Check size={14} /> : <Pencil size={14} />}
                </button>
              </div>
            </div>

            <div className="space-y-10">
              {!experiences || experiences.length === 0 ? (
                <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    No experience added
                  </p>
                </div>
              ) : (
                experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-blue-600 pl-4 md:pl-6 space-y-6 relative group/item"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-x-4 gap-y-4 md:gap-x-12 md:gap-y-6">
                      <div>
                        <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                          Company Name
                        </p>
                        {isEditing ? (
                          <input
                            className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-1"
                            value={exp.company}
                            placeholder="e.g. Google"
                            onChange={(e) => {
                              const n = [...experiences];
                              n[index].company = e.target.value;
                              setExperiences(n);
                            }}
                          />
                        ) : (
                          <p className="text-[10px] md:text-xs font-black text-black uppercase">
                            {exp.company || "Not Set"}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                          Role / Position
                        </p>
                        {isEditing ? (
                          <input
                            className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-1"
                            value={exp.role}
                            placeholder="e.g. UI Designer"
                            onChange={(e) => {
                              const n = [...experiences];
                              n[index].role = e.target.value;
                              setExperiences(n);
                            }}
                          />
                        ) : (
                          <p className="text-[10px] md:text-xs font-black text-black uppercase">
                            {exp.role || "Not Set"}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                            Joining
                          </p>
                          {isEditing ? (
                            <input
                              type="date"
                              max={new Date().toISOString().split("T")[0]}
                              className="text-[10px] md:text-xs font-black text-black border-b border-black w-full bg-transparent py-1"
                              value={exp.joining}
                              onChange={(e) => {
                                const n = [...experiences];
                                n[index].joining = e.target.value;
                                setExperiences(n);
                              }}
                            />
                          ) : (
                            <p className="text-[10px] md:text-xs font-black text-black">
                              {exp.joining || "Not Set"}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                            Leaving
                          </p>
                          {isEditing ? (
                            <input
                              type="date"
                              max={new Date().toISOString().split("T")[0]}
                              disabled={exp.isPresent}
                              className="text-[10px] md:text-xs font-black text-black border-b border-black w-full bg-transparent py-1 disabled:opacity-30"
                              value={exp.leaving}
                              onChange={(e) => {
                                const n = [...experiences];
                                n[index].leaving = e.target.value;
                                setExperiences(n);
                              }}
                            />
                          ) : (
                            <p className="text-[10px] md:text-xs font-black text-black">
                              {exp.isPresent
                                ? "PRESENT"
                                : exp.leaving || "Not Set"}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                            Notice Period
                          </p>
                          {isEditing ? (
                            <input
                              className="text-[10px] md:text-xs font-black text-black border-b border-black w-full bg-transparent py-1"
                              value={exp.noticePeriod}
                              onChange={(e) => {
                                const n = [...experiences];
                                n[index].noticePeriod = e.target.value;
                                setExperiences(n);
                              }}
                            />
                          ) : (
                            <p className="text-[10px] md:text-xs font-black text-black">
                              {exp.noticePeriod}
                            </p>
                          )}
                        </div>
                        <div className="flex items-end pb-1 gap-2">
                          {isEditing && (
                            <>
                              <input
                                type="checkbox"
                                id={`present-${index}`}
                                checked={exp.isPresent}
                                onChange={(e) => {
                                  const n = [...experiences];
                                  n[index].isPresent = e.target.checked;
                                  if (e.target.checked) n[index].leaving = "";
                                  setExperiences(n);
                                }}
                              />
                              <label
                                htmlFor={`present-${index}`}
                                className="text-[8px] font-black uppercase tracking-widest text-slate-500 cursor-pointer"
                              >
                                Present
                              </label>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="col-span-2">
                        <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                          Description
                        </p>
                        {isEditing ? (
                          <textarea
                            className="text-[10px] md:text-xs font-black text-black border-b border-black w-full bg-transparent py-1 min-h-10"
                            value={exp.description}
                            onChange={(e) => {
                              const n = [...experiences];
                              n[index].description = e.target.value;
                              setExperiences(n);
                            }}
                          />
                        ) : (
                          <p className="text-[10px] md:text-xs font-bold text-slate-500 leading-relaxed">
                            {exp.description || "No description added."}
                          </p>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <button
                        onClick={() =>
                          setExperiences(
                            experiences.filter((_, i) => i !== index),
                          )
                        }
                        className="absolute -left-10 top-0 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          <section
            id="skills"
            className="bg-white rounded-[30px] md:rounded-[40px] p-5 lg:p-10 shadow-sm border border-white"
          >
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-[11px] md:text-sm font-black uppercase tracking-widest text-black flex items-center gap-2 md:gap-3">
                <Zap size={16} className="text-blue-600" /> Skills & Expertise
              </h3>
              <button
                onClick={() =>
                  isEditingSkills ? handleSave() : setIsEditingSkills(true)
                }
                className={`p-2 rounded-xl transition-all ${
                  isEditingSkills
                    ? "bg-green-600 text-white"
                    : "bg-slate-50 text-black hover:bg-black hover:text-white"
                }`}
              >
                {isEditingSkills ? <Check size={14} /> : <Pencil size={14} />}
              </button>
            </div>

            <div className="space-y-6">
              {isEditingSkills && (
                <div className="relative">
                  <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">
                    Search or Type Skill
                  </p>
                  <div className="relative">
                    <input
                      className="text-[10px] md:text-xs font-black text-black border-b border-black w-full focus:outline-none bg-transparent py-2"
                      placeholder="Start typing (e.g. React)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchTerm.trim()) {
                          if (!skills.includes(searchTerm.trim())) {
                            setSkills([...skills, searchTerm.trim()]);
                          }
                          setSearchTerm("");
                        }
                      }}
                    />
                    {filteredSuggestions.length > 0 && (
                      <div className="absolute z-30 w-full mt-1 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-y-auto max-h-48 py-1">
                        {filteredSuggestions.map((s, index) => (
                          <button
                            key={`${s}-${index}`} 
                            onClick={() => {
                              setSkills([...skills, s]);
                              setSearchTerm("");
                            }}
                            className="w-full text-black text-left px-4 py-2.5 text-[10px] font-black hover:bg-slate-50 transition-colors flex justify-between items-center border-b border-slate-50 last:border-0"
                          >
                            {s}
                            <span className="text-blue-600 text-[8px] font-bold">
                              Add +
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-[7px] font-bold text-slate-400 mt-2 uppercase">
                    Press Enter to add custom skill
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 md:gap-3">
                {skills.length === 0 ? (
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    No skills added yet
                  </p>
                ) : (
                  skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-black group"
                    >
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider">
                        {skill}
                      </span>
                      {isEditingSkills && (
                        <button
                          onClick={() =>
                            setSkills(skills.filter((_, i) => i !== index))
                          }
                          className="hover:text-red-400 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-3 lg:sticky lg:top-32">
          <div className="bg-black rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute -bottom-10 -right-10 opacity-20 rotate-12">
              <Crown size={160} />
            </div>
            <div className="relative z-10">
              <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
                <Crown size={24} />
              </div>
              <h2 className="font-black text-2xl uppercase leading-tight tracking-tighter">
                Guaranteed <br /> Placement.
              </h2>
              <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase leading-relaxed tracking-wider">
                Get hired globally within 90 days or 100% refund.
              </p>
              <button className="w-full bg-white text-black mt-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                Claim Offer
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
