"use client";
import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import GlobalNavbar from "@/components/Navbar";

import {
  User,
  Search,
  Briefcase,
  Crown,
  X,
  MapPin,
  MousePointer2,
  ChevronDown,
  ArrowRight
} from "lucide-react";

export default function Portal() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [catExpanded, setCatExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email) {
        const userEmail = user.email.toLowerCase();
        const ref = doc(db, "users", userEmail);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserData(snap.data());
        }
      } else {
        router.push("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#eef2f6]">
        <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-black text-black uppercase tracking-widest text-xs">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef2f6] font-sans selection:bg-blue-100">
      <div className="lg:hidden bg-white px-6 py-5 border-b border-slate-200 sticky top-0 z-100">
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

              <div className="flex items-center gap-5">
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

                <button
                  onClick={() => setProfileOpen(true)}
                  className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white shadow-lg"
                >
                  <User size={18} />
                </button>
              </div>
            </div>

            {navOpen && (
              <div className="pt-4 pb-2 space-y-1 animate-in slide-in-from-top-4 duration-300">
                <div className="h-px bg-slate-100 mb-4" />

                <Link
                  href="/portal"
                  className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-2xl"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">
                    Jobs
                  </span>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
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

                <Link
                  href="#"
                  className="w-full flex items-center justify-between py-4 px-4 text-black hover:bg-slate-50 rounded-2xl transition-colors"
                >
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">
                    Startups
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
      </div>

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

            <div className="w-24 h-24 bg-blue-600 rounded-4xl flex items-center justify-center text-white shadow-2xl shadow-blue-200 mx-auto mb-6">
              <User size={40} />
            </div>

            <h3 className="font-black text-2xl uppercase tracking-tighter text-black leading-none">
              {userData?.fullName}
            </h3>

            <Link
              href="/profile"
              className="text-[11px] font-black text-blue-600 uppercase tracking-widest mt-3 block"
            >
              View Profile →
            </Link>

            <div className="my-8 px-2">
              <div className="flex justify-between text-[10px] font-black uppercase mb-2 text-black">
                <span>Profile Strength</span>
                <span>75%</span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-2xl p-1">
                <div className="bg-black h-full rounded-xl w-[75%]" />
              </div>
            </div>

            <div className="space-y-4">
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

      <div className="hidden lg:block">
        <GlobalNavbar />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-white text-center relatve">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="w-full h-full bg-blue-600 rounded-4xl flex items-center justify-center text-white shadow-2xl shadow-blue-100">
                <User size={40} />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-black text-white p-1.5 rounded-xl border-4 border-white">
                <MousePointer2 size={12} />
              </div>
            </div>

            <h2 className="font-black text-xl uppercase tracking-tighter text-black leading-tight">
              {userData?.fullName}
            </h2>

            <Link
              href="/profile"
              className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2 block hover:underline"
            >
              View Profile →
            </Link>
            <div className="mt-8 mb-8 text-left">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[10px] font-black uppercase text-black tracking-widest">
                  Completion
                </span>
                <span className="text-[10px] font-black text-blue-600">
                  75%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-black h-full rounded-full w-[75%] transition-all duration-1000"></div>
              </div>
              <p className="text-[9px] font-bold text-slate-400 mt-2 leading-tight">
                Complete your resume to unlock Premium matchings.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => signOut(auth)}
                className="w-full text-slate-400 py-2 text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Logout Account
              </button>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em]">
              Latest Openings
            </h3>
            <button className="text-[10px] font-black text-blue-600 uppercase">
              View All
            </button>
          </div>

          {[
            {
              role: "Product Designer",
              company: "Meta",
              loc: "Remote",
              match: "98%",
            },
            {
              role: "Frontend Lead",
              company: "Vercel",
              loc: "Singapore",
              match: "92%",
            },
            {
              role: "Brand Manager",
              company: "Nike",
              loc: "London",
              match: "89%",
            },
          ].map((job, i) => (
            <div
              key={i}
              className="bg-white p-7 rounded-4xl border border-white shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-5">
                  <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-white">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg uppercase tracking-tight text-black">
                      {job.role}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-black">
                      <p className="text-xs font-black opacity-60 uppercase tracking-tighter">
                        {job.company}
                      </p>
                      <div className="w-1 h-1 bg-black/20 rounded-full" />
                      <p className="text-xs font-black opacity-60 flex items-center gap-1">
                        <MapPin size={12} /> {job.loc}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase shadow-md">
                  {job.match}
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-black rounded-[40px] p-9 text-white shadow-2xl relative overflow-hidden border border-white/5">
            <div className="absolute -bottom-10 -right-10 opacity-20 rotate-12 pointer-events-none">
              <Crown size={180} />
            </div>

            <div className="relative z-10">
              <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/30">
                <Crown size={28} />
              </div>

              <h2 className="font-black text-3xl uppercase leading-[0.9] tracking-tighter">
                Placement <br />{" "}
                <span className="text-blue-500">Guaranteed.</span>
              </h2>

              <p className="mt-6 text-[11px] font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
                Unlock the <span className="text-white">Elite Tier</span>. Get
                1-on-1 career coaching, priority interview slots with top global
                firms, and a 100% money-back guarantee if you aren't hired
                within 30 days.
              </p>

              <button className="w-full bg-white text-black mt-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95">
                Claim Offer Now
              </button>

              <p className="text-center mt-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                Only 5 Slots left this month
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
