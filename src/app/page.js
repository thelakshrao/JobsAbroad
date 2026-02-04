"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  Star,
  Wifi,
  Search,
  FileText,
  BookOpen,
  Globe,
  Crown,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Zap,
  ArrowRight,
  BadgeDollarSign,
  UtensilsCrossed,
  Stethoscope,
  ShieldCheck,
  Rocket,
  MousePointer2,
  Menu,
  X,
} from "lucide-react";

import img1 from "../images/pic1.jpg";
import img2 from "../images/pic2.jpg";
import img3 from "../images/pic3.jpg";
import img4 from "../images/pic4.jpg";
import img5 from "../images/pic5.jpg";
import img6 from "../images/pic6.jpg";

export default function Home() {
  const router = useRouter();
  const [workStatus, setWorkStatus] = useState("experienced");
  const [activeStep, setActiveStep] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const services = [
    {
      title: "Rapid Placement",
      desc: "Accelerate your career entry with our proprietary fast-track system. We leverage direct industry connections to bypass traditional hurdles, ensuring you land your first professional role in record time with top-tier global companies.",
      icon: <Search size={20} />,
      img: img1,
    },
    {
      title: "Employer Match",
      desc: "Our intelligent matching algorithm connects high-potential talent with verified employers globally. We don't just find jobs; we find the perfect cultural and professional fit, ensuring long-term success for both candidates and companies.",
      icon: <Zap size={20} />,
      img: img2,
    },
    {
      title: "Resume Building",
      desc: "Stand out in a sea of applicants with expert resume engineering. We optimize your professional story using modern ATS-compliant structures and high-impact keywords that grab the attention of recruiters and automated filters alike.",
      icon: <FileText size={20} />,
      img: img3,
    },
    {
      title: "Courses",
      desc: "Bridge the gap between academic learning and industry demands. Access a curated library of high-impact, industry-standard courses designed by professionals to equip you with the specific technical and soft skills employers are hiring for today.",
      icon: <BookOpen size={20} />,
      img: img4,
    },
    {
      title: "Visa Support",
      desc: "Navigate the complexities of international relocation with ease. We provide comprehensive assistance for Indian professionals and students, covering everything from documentation to visa interview prep for global employment hubs.",
      icon: <Globe size={20} />,
      img: img5,
    },
    {
      title: "Platinum Care",
      desc: "Experience our most elite tier of service. For ₹5000/mo, we act as your personal career agents—managing your applications, scheduling your interviews, and providing 1-on-1 coaching until you are successfully placed in your dream role.",
      icon: <Crown size={20} />,
      img: img6,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [services.length]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { createUserWithEmailAndPassword } = await import("firebase/auth");
      const { doc, setDoc } = await import("firebase/firestore");

      // Create user in Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      // Save to Firestore using Email as the Document ID
      const userEmail = formData.email.toLowerCase();
      await setDoc(doc(db, "users", userEmail), {
        fullName: formData.fullName,
        email: userEmail,
        phone: formData.phone,
        workStatus: workStatus,
        createdAt: new Date().toISOString(),
      });

      setShowSuccess(true);
      setTimeout(() => router.push("/portal"), 1500);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push("/portal");
    } catch (error) {
      setLoginError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#eef2f6] min-h-screen p-0 sm:p-4 md:p-6 font-sans selection:bg-blue-100 flex items-center justify-center">
      {showSuccess && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-100 animate-in fade-in slide-in-from-top-8 duration-500">
          <div className="bg-white border border-emerald-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] px-6 py-4 rounded-3xl flex items-center gap-4">
            <div className="bg-emerald-500 text-white p-2 rounded-full">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-slate-900 font-black uppercase tracking-tight text-sm">
                Registration Successful
              </p>
              <p className="text-slate-400 font-bold text-[10px]">
                Your profile is now live in the network.
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-4 text-slate-300 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      <div className="bg-white w-full max-w-350 min-h-screen sm:min-h-[90vh] sm:rounded-[48px] relative flex flex-col overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]">
        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-2 sm:px-12 z-50">
          <div className="flex items-start">
            <div className="relative flex items-start">
              <div className="hidden sm:block w-10 h-10 bg-transparent rounded-tr-4xl shadow-[10px_-10px_0_0_#0a0a0a]"></div>

              <div className="bg-[#0a0a0a] text-white px-6 sm:px-10 py-3 sm:py-6 rounded-b-[20px] sm:rounded-b-4xl rounded-t-[20px] sm:rounded-t-none font-black text-lg sm:text-2xl tracking-tighter uppercase ml-2 sm:ml-0 mt-2 sm:mt-0 shadow-lg sm:shadow-none">
                JobsAbroad
              </div>

              <div className="hidden sm:block w-10 h-10 bg-transparent rounded-tl-4xl shadow-[-10px_-10px_0_0_#0a0a0a]"></div>
            </div>
          </div>

          <div className="md:hidden flex items-center pr-4 pt-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 bg-white rounded-full shadow-lg border border-slate-100 text-slate-900 active:scale-90 transition-transform"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-8 mt-6">
            <div className="flex gap-8 text-[13px] font-bold text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Post a Job
              </a>
            </div>
            <button
              onClick={() => {
                setIsLoginMode(true);
                document
                  .getElementById("form")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 text-white px-8 py-2.5 rounded-full font-bold text-[13px] shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              Login <ArrowRight size={14} />
            </button>
          </nav>

          {isMenuOpen && (
            <div className="absolute top-full right-4 mt-4 w-64 bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)] border border-slate-100 z-50 md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="flex flex-col p-6 space-y-5">
                <a
                  href="#"
                  className="text-sm font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Post a Job
                </a>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsLoginMode(true);
                      document
                        .getElementById("form")
                        .scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full bg-blue-600 text-white py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 sm:px-16 pt-32 sm:pt-40 pb-10 relative">
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8 z-20">
            <div className="space-y-2">
              <h1 className="text-[40px] sm:text-[60px] lg:text-[85px] leading-[0.85] font-black tracking-tighter text-slate-900 uppercase">
                HIRE LOCALLY.
                <br />
                <span className="text-blue-600">WORK GLOBALLY.</span>
              </h1>
              <div className="flex items-center gap-3 text-slate-400 font-bold text-xl sm:text-2xl pt-2">
                <span className="opacity-50">#</span> 10
                <div className="h-px w-32 sm:w-64 bg-slate-200"></div>
              </div>
            </div>

            <p className="text-lg sm:text-xl font-medium text-slate-500 max-w-md leading-relaxed">
              The modern marketplace where{" "}
              <span className="text-slate-900 font-bold">elite talent</span>{" "}
              connects with verified employers.
            </p>

            <div className="space-y-4 sm:space-y-5 pt-4">
              {[
                {
                  icon: <CheckCircle2 size={18} />,
                  text: "Direct Recruiter Access",
                },
                {
                  icon: <CheckCircle2 size={18} />,
                  text: "Global & Local Roles",
                },
                {
                  icon: <CheckCircle2 size={18} />,
                  text: "Verified Opportunities",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                    {item.icon}
                  </div>
                  <span className="text-[10px] sm:text-[12px] font-black text-slate-900 tracking-widest uppercase">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center z-20 mt-10 lg:mt-0">
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 pointer-events-none z-0 hidden lg:block">
              <svg width="1000" height="400" viewBox="0 0 600 400" fill="none">
                <path
                  d="M0 250C150 150 250 350 400 250C550 150 650 350 800 250"
                  stroke="url(#paint1_linear)"
                  strokeWidth="40"
                  strokeLinecap="round"
                  className="opacity-20"
                />
                <defs>
                  <linearGradient
                    id="paint1_linear"
                    x1="0"
                    y1="250"
                    x2="800"
                    y2="250"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#2563eb" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div
              id="form"
              className="bg-white rounded-4xl sm:rounded-[40px] p-6 sm:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-100 w-full max-w-110 relative z-10 lg:mr-10"
            >
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                    {isLoginMode ? "Welcome Back" : "Create Profile"}
                  </h2>
                  <p className="text-slate-400 text-[10px] sm:text-xs font-bold mt-1">
                    {isLoginMode
                      ? "Enter your credentials to access the portal."
                      : "Join the network of professional achievers."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  className="bg-blue-600 p-3 rounded-full text-white hover:bg-black transition-all active:scale-90 shadow-lg shadow-blue-100"
                  title={isLoginMode ? "Switch to Register" : "Switch to Login"}
                >
                  <ArrowRight
                    size={18}
                    className={`transition-transform duration-500 ${isLoginMode ? "rotate-180" : ""}`}
                  />
                </button>
              </div>

              <form
                className="space-y-5"
                onSubmit={isLoginMode ? handleLogin : handleRegister}
              >
                {!isLoginMode && (
                  <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-900 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 font-bold text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-900 ml-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 font-bold text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-3 pt-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-900 ml-1 block">
                        Status
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setWorkStatus("experienced")}
                          className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all font-black text-[11px] uppercase tracking-wider ${
                            workStatus === "experienced"
                              ? "border-blue-600 bg-blue-50 text-blue-600 shadow-inner"
                              : "border-slate-100 bg-slate-50 text-slate-400 hover:bg-white"
                          }`}
                        >
                          <Briefcase size={18} /> Experienced
                        </button>
                        <button
                          type="button"
                          onClick={() => setWorkStatus("fresher")}
                          className={`flex items-center justify-center gap-2 py-4 rounded-2xl border-2 transition-all font-black text-[11px] uppercase tracking-wider ${
                            workStatus === "fresher"
                              ? "border-blue-600 bg-blue-50 text-blue-600 shadow-inner"
                              : "border-slate-100 bg-slate-50 text-slate-400 hover:bg-white"
                          }`}
                        >
                          <GraduationCap size={18} /> Fresher
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-900 ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 font-bold text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-900 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={(e) => {
                      handleInputChange(e);
                      setLoginError("");
                    }}
                    className={`w-full px-5 py-3 rounded-xl bg-slate-50 border font-bold text-sm focus:bg-white outline-none transition-all ${loginError ? "border-red-500 ring-2 ring-red-500/10" : "border-slate-200 focus:border-blue-500"}`}
                    placeholder="••••••••"
                  />

                  {isLoginMode && loginError && (
                    <p className="text-[10px] font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                      {loginError}
                    </p>
                  )}

                  {isLoginMode && (
                    <div className="flex justify-end px-1">
                      <button
                        type="button"
                        className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-tighter"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}
                </div>

                <button
                  disabled={loading}
                  className="group w-full bg-blue-600 text-white py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#0a0a0a] transition-all shadow-xl shadow-blue-100 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      {isLoginMode ? "Login Now" : "Register Now"}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mx-4 sm:mx-6 mb-6 bg-[#f8fafc] rounded-3xl sm:rounded-4xl p-2 flex items-center justify-between border border-white shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 sm:gap-8 w-full">
            <h4 className="hidden sm:block text-[11px] font-black text-slate-900 uppercase tracking-widest border-r border-slate-200 pr-8 shrink-0">
              Categories
            </h4>
            <div className="flex gap-3 flex-1 overflow-x-auto no-scrollbar py-1 cursor-pointer">
              {[
                { icon: <Zap size={16} />, label: "Tech Roles" },
                { icon: <Briefcase size={16} />, label: "Management" },
                { icon: <BadgeDollarSign size={16} />, label: "Sales" },
                { icon: <UtensilsCrossed size={16} />, label: "Hospitality" },
                { icon: <Stethoscope size={16} />, label: "Medical" },
                { icon: <ShieldCheck size={16} />, label: "Security" },
                { icon: <Rocket size={16} />, label: "Startups" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white mb-1 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 sm:gap-4 shrink-0 min-w-32.5 sm:min-w-40 hover:border-blue-200 transition-colors"
                >
                  <div className="bg-blue-600 text-white p-2 rounded-lg shrink-0">
                    {item.icon}
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-tight">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex bg-white px-4 py-2 rounded-xl border border-slate-100 text-[10px] font-black text-slate-400 ml-4 items-center gap-2">
            <MousePointer2 size={12} /> INTERACTIVE
          </div>
        </div>

        <div className="px-4 sm:px-16 pb-12 sm:pb-20 relative">
          <div className="bg-[#f1f4ff] relative z-10 rounded-4xl sm:rounded-[48px] overflow-hidden flex flex-col lg:flex-row items-center border border-white shadow-sm min-h-150 lg:min-h-187.5">
            <div className="absolute top-1/4 -left-20 w-80 sm:w-150 h-32 bg-blue-600/10 rounded-full -rotate-12 blur-3xl pointer-events-none z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-24 bg-indigo-500/5 rounded-[100px] rotate-15 pointer-events-none z-0"></div>

            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
              viewBox="0 0 1000 1000"
            >
              <path
                d="M-100,200 Q400,100 1100,500"
                stroke="#3b82f6"
                strokeWidth="80"
                fill="none"
                strokeOpacity="0.05"
              />
              <path
                d="M-100,800 Q500,900 1100,600"
                stroke="#6366f1"
                strokeWidth="60"
                fill="none"
                strokeOpacity="0.03"
              />
            </svg>

            <div className="flex-1 p-8 sm:p-12 lg:p-16 space-y-8 sm:space-y-12 relative z-10 w-full">
              <div className="space-y-4">
                <h2 className="text-[36px] sm:text-[55px] leading-[0.9] font-black text-slate-900 uppercase tracking-tighter text-center lg:text-left">
                  PLAN YOUR <br />
                  <span className="italic font-medium text-blue-600 underline decoration-blue-200 underline-offset-8">
                    CAREER PATH
                  </span>
                </h2>
              </div>

              <div className="relative h-80 sm:h-95">
                {services.map((service, index) => {
                  const isActive = index === activeStep;
                  const isPrev =
                    index ===
                    (activeStep - 1 + services.length) % services.length;
                  return (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${isActive ? "opacity-100 translate-x-0 z-20 scale-100" : isPrev ? "opacity-0 translate-x-full z-10 scale-95" : "opacity-0 -translate-x-full z-0 scale-95"}`}
                    >
                      <div className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl sm:rounded-4xl shadow-xl border border-white max-w-md mx-auto lg:mx-0">
                        <div className="mb-4 w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                          {service.icon}
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2 sm:mb-3">
                          {service.title}
                        </h4>
                        <p className="text-sm sm:text-base text-slate-500 font-bold leading-relaxed">
                          {service.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 relative z-10 flex items-center justify-center py-12 lg:py-0 w-full min-h-125 lg:min-h-150">
              <div className="relative w-70 sm:w-77.5 h-137.5 sm:h-155 bg-slate-900 rounded-[45px] sm:rounded-[55px] p-2.5 sm:p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border-8 border-slate-800">
                <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 bg-slate-900 rounded-full z-50"></div>
                <div className="w-full h-full bg-white rounded-[35px] sm:rounded-[42px] overflow-hidden relative">
                  {services.map((s, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-all duration-1000 flex flex-col ${activeStep === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                    >
                      <div className="absolute top-0 left-0 right-0 h-12 sm:h-14 flex justify-between items-center px-6 sm:px-8 z-40">
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-900">
                          9:41
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-900">
                          <Wifi size={12} strokeWidth={3} />
                          <div className="w-4 sm:w-5 h-2 sm:h-2.5 border border-slate-900 rounded-xs p-px relative">
                            <div className="bg-slate-900 h-full w-[80%] rounded-[1px]"></div>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6 pt-14 sm:pt-16 space-y-3 sm:space-y-4 bg-white z-10">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] sm:text-[10px] font-black text-blue-600 uppercase tracking-widest">
                            JobsAbroad App
                          </span>
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-blue-100 rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                          {s.title.split(" ")[0]} <br />
                          <span className="text-blue-600 italic font-medium">
                            {s.title.split(" ")[1] || "CAREER"}
                          </span>
                        </h3>
                        <div className="w-full bg-slate-50 border border-slate-100 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-[9px] sm:text-[10px] font-bold text-slate-400 flex items-center gap-2">
                          <Search size={14} /> Search destinations...
                        </div>
                      </div>
                      <div className="flex-1 relative mx-3 sm:mx-4 mb-3 sm:mb-4 rounded-3xl sm:rounded-4xl overflow-hidden bg-slate-100 group">
                        <img
                          src={s.img.src || s.img}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-white/50">
                          <div className="flex justify-between items-center mb-1 sm:mb-2">
                            <span className="text-[8px] sm:text-[9px] font-black text-slate-900 uppercase">
                              Top Rated
                            </span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  size={8}
                                  className="text-yellow-400 fill-yellow-400"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg sm:rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                              {s.icon}
                            </div>
                            <div className="flex-1">
                              <p className="text-[9px] sm:text-[11px] font-black text-slate-900 uppercase leading-none">
                                {s.title}
                              </p>
                              <p className="text-[7px] sm:text-[8px] font-bold text-slate-400 mt-1">
                                Verified Partner
                              </p>
                            </div>
                            <div className="bg-blue-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[7px] sm:text-[8px] font-black uppercase shadow-lg shadow-blue-100">
                              Apply
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="h-14 sm:h-16 border-t border-slate-50 flex justify-around items-center bg-white">
                        <Search size={20} className="text-blue-600" />
                        <Briefcase size={20} className="text-slate-200" />
                        <Globe size={20} className="text-slate-200" />
                        <Crown size={20} className="text-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="px-6 sm:px-16 py-8 sm:py-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] text-slate-900 font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] bg-white border-t border-slate-50 mt-auto">
          <div className="flex gap-6 sm:gap-10">
            <a
              href="#"
              className="hover:text-blue-600 transition underline decoration-transparent hover:decoration-blue-600 underline-offset-4"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition underline decoration-transparent hover:decoration-blue-600 underline-offset-4"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition underline decoration-transparent hover:decoration-blue-600 underline-offset-4"
            >
              Legal
            </a>
          </div>
          <p className="text-center sm:text-right">
            © 2026 JobsAbroad Global — Direct Hiring & Placement Network.
          </p>
        </footer>
      </div>
    </main>
  );
}
