"use client";
import React, { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Crown,
  User,
  X,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function GlobalNavbar({ userData }) {
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [catExpanded, setCatExpanded] = useState(false);

  return (
    <>
      <nav className="lg:hidden bg-white px-6 py-5 border-b border-slate-200 sticky top-0 z-100">
        {!searchOpen ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-1 cursor-pointer active:opacity-60 transition-opacity"
                onClick={() => setNavOpen(!navOpen)}
              >
                <h1 className="font-black text-xl tracking-tighter uppercase text-black">
                  JobsAbroad
                </h1>
                <ChevronDown
                  size={18}
                  strokeWidth={3}
                  className={`text-blue-600 transition-transform duration-300 ${navOpen ? "rotate-180" : ""}`}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-black"
                >
                  <Search size={22} strokeWidth={3} />
                </button>

                <button
                  onClick={() => setPremiumOpen(true)}
                  className="text-amber-500"
                >
                  <Crown size={22} strokeWidth={2.5} />
                </button>

                <button className="relative p-2 text-black active:scale-95">
                  <Bell size={20} strokeWidth={3} />
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-white"></span>
                </button>

                <button
                  onClick={() => setProfileOpen(true)}
                  className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm active:scale-90 transition-all"
                >
                  {userData?.profilePicUrl ? (
                    <img
                      src={userData.profilePicUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={18} className="text-black" strokeWidth={3} />
                  )}
                </button>
              </div>
            </div>

            {navOpen && (
              <div className="pt-4 pb-2 space-y-1 animate-in slide-in-from-top-4 duration-300">
                <div className="h-px bg-slate-100 mb-4" />
                <Link
                  href="/portal"
                  className="flex items-center justify-between py-3 px-4 rounded-2xl"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-black">
                    Jobs
                  </span>
                </Link>

                <div className="space-y-1">
                  <button
                    onClick={() => setCatExpanded(!catExpanded)}
                    className="w-full flex items-center justify-between py-4 px-4 text-black hover:bg-slate-50 rounded-2xl transition-colors"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                      Categories
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${catExpanded ? "rotate-0 text-blue-600" : "-rotate-90 text-slate-300"}`}
                    />
                  </button>
                  {catExpanded && (
                    <div className="grid grid-cols-2 gap-2 px-2 pb-2 animate-in fade-in slide-in-from-top-2">
                      {["Remote", "Full Time", "Fresher", "Part Time"].map(
                        (cat) => (
                          <button
                            key={cat}
                            className="py-3 px-4 bg-slate-50 rounded-xl text-left text-[9px] font-black uppercase tracking-widest text-slate-500 active:bg-blue-600 active:text-white transition-all"
                          >
                            {cat}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </div>

                <Link
                  href="#"
                  className="w-full flex items-center justify-between py-4 px-4 text-black hover:bg-slate-50 rounded-2xl transition-colors"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                    Companies
                  </span>
                  <ArrowRight size={14} className="text-slate-300" />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
            <Search size={18} className="text-black" strokeWidth={3} />
            <input
              autoFocus
              placeholder="Search roles..."
              className="flex-1 bg-transparent outline-none text-sm font-black text-black placeholder:text-slate-400"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="bg-black text-white p-1 rounded-full"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </nav>

      <nav className="hidden lg:block bg-white border-b border-slate-50 sticky top-0 z-100 px-8 py-3">
        <div className="max-w-350 mx-auto flex items-center justify-between">
          <div className="flex items-center shrink-0">
            <Link
              href="/portal"
              className="text-black font-black text-xl lg:text-2xl uppercase tracking-tighter"
            >
              JobsAbroad
            </Link>
          </div>

          <div className="flex items-center gap-10">
            {["Jobs", "Companies", "Start Up"].map((link) => (
              <Link
                key={link}
                href="/portal"
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                  pathname === "/portal" && link === "Jobs"
                    ? "text-blue-600"
                    : "text-black hover:text-blue-600"
                }`}
              >
                {link}
              </Link>
            ))}
            <div className="relative group cursor-pointer py-2 text-[11px] font-black uppercase tracking-[0.2em] text-black group-hover:text-blue-600 transition-colors">
              <div className="flex items-center gap-1">
                Categories <ChevronDown size={14} strokeWidth={3} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <div className="relative hidden md:block">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black"
                size={14}
                strokeWidth={3}
              />
              <input
                type="text"
                placeholder="SEARCH KEYWORDS..."
                className="bg-slate-50 border border-slate-100 text-black rounded-full py-2.5 pl-10 pr-4 text-[9px] font-bold placeholder:text-slate-400 focus:outline-none w-44 focus:w-56 transition-all uppercase tracking-widest"
              />
            </div>
            <button className="relative p-2 text-black hover:text-blue-600 transition-all active:scale-95">
              <Bell size={18} strokeWidth={3} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-white"></span>
            </button>
            <Link
              href="/profile"
              className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm active:scale-95 transition-all"
            >
              {userData?.profilePicUrl ? (
                <img
                  src={userData.profilePicUrl}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={18} className="text-black" strokeWidth={3} />
              )}
            </Link>
          </div>
        </div>
      </nav>

      {profileOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-6 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setProfileOpen(false)}
          />
          <div className="bg-white rounded-[48px] p-10 w-full max-w-sm relative z-10 text-center shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setProfileOpen(false)}
              className="absolute top-6 right-6 p-2 bg-slate-50 rounded-full text-black"
            >
              <X size={20} strokeWidth={3} />
            </button>
            <div className="w-28 h-28 bg-slate-50 rounded-[40px] flex items-center justify-center overflow-hidden border-4 border-white shadow-2xl shadow-blue-100 mx-auto mb-6">
              {userData?.profilePicUrl ? (
                <img
                  src={userData.profilePicUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} className="text-black" strokeWidth={3} />
              )}
            </div>
            <h3 className="font-black text-2xl uppercase tracking-tighter text-black leading-none">
              {userData?.fullName || "Guest User"}
            </h3>
            <Link
              href="/profile"
              onClick={() => setProfileOpen(false)}
              className="text-[11px] font-black text-blue-600 uppercase tracking-widest mt-4 block"
            >
              View Profile →
            </Link>
            <div className="space-y-4 pt-4 mt-6 border-t border-slate-50">
              <button
                onClick={() => {
                  signOut(auth);
                  router.push("/");
                }}
                className="w-full py-2 text-[11px] font-black uppercase tracking-[0.2em] text-red-500 active:opacity-50"
              >
                Logout & Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {premiumOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-6 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setPremiumOpen(false)}
          />

          <div className="bg-black rounded-[48px] p-10 w-full max-w-sm relative z-10 text-center shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute -bottom-8 -right-8 opacity-10 rotate-12 pointer-events-none text-white">
              <Crown size={140} />
            </div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/20">
                <Crown size={40} />
              </div>

              <h2 className="font-black text-4xl uppercase tracking-tighter text-white leading-[0.8]">
                Platinum
                <br />
                <span className="text-blue-500 text-3xl">Care</span>
              </h2>

              <p className="text-slate-400 font-bold text-xs mt-6 leading-relaxed uppercase tracking-wide">
                Unlock the <span className="text-white">Elite Tier</span>. Get
                1-on-1 career coaching, priority interview slots with top global
                firms, and a 100% money-back guarantee if you aren't hired
                within 30 days.
              </p>

              <button className="w-full bg-white text-black py-5 rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl mt-10 active:scale-95 transition-all">
                Upgrade for ₹5000
              </button>

              <button
                onClick={() => setPremiumOpen(false)}
                className="mt-8 text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors"
              >
                [ Close Window ]
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
