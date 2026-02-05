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
  Briefcase,
  Crown,
  MapPin,
  MousePointer2,
} from "lucide-react";

export default function Portal() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <GlobalNavbar userData={userData} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-12">
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-white text-center relative">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="w-full h-full bg-blue-600 rounded-4xl flex items-center justify-center text-white shadow-2xl shadow-blue-100 overflow-hidden border-4 border-white">
                {userData?.profilePicUrl ? (
                  <img
                    src={userData.profilePicUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} />
                )}
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
