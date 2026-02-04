"use client";
import React, { useState } from "react";
import {
  Search,
  Bell,
  ChevronLeft,
  ChevronDown,
  User,
  Crown,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNavbar() {
  const pathname = usePathname();
  const [premiumOpen, setPremiumOpen] = useState(false);
  
  const isNotPortal = pathname !== "/portal";
  const isProfile = pathname === "/profile";

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 px-6 py-4">
      <div className="max-w-350 mx-auto flex items-center justify-between lg:justify-center lg:gap-12">
        <div className="flex items-center gap-4">
          {isNotPortal && (
            <Link
              href="/portal"
              className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-900 group"
              title="Back to Portal"
            >
              <ChevronLeft
                size={20}
                className="group-active:-translate-x-1 transition-transform"
              />
            </Link>
          )}
          <Link
            href="/portal"
            className="text-[#0a0a0a] font-black text-xl uppercase tracking-tighter shrink-0"
          >
            JobsAbroad
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/portal"
            className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
              pathname === "/portal"
                ? "text-blue-600"
                : "text-slate-900 hover:text-blue-600"
            }`}
          >
            Jobs
          </Link>
          <div className="relative group cursor-pointer py-2">
            <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors">
              Categories <ChevronDown size={14} />
            </div>
            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-2xl border border-slate-50 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
              {["Remote", "Full Time", "Fresher", "Part Time"].map((cat) => (
                <button
                  key={cat}
                  className="w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <a
            href="#"
            className="text-[11px] font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-colors"
          >
            Companies
          </a>
          <a
            href="#"
            className="text-[11px] font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-colors"
          >
            Start Up
          </a>
        </div>
        <div className="flex items-center gap-4">
          {isProfile ? (
            <div className="lg:hidden flex items-center gap-3">
              <button 
                onClick={() => setPremiumOpen(true)}
                className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center border border-amber-100 active:scale-90 transition-all"
              >
                <Crown size={20} fill="currentColor" />
              </button>

              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
                <User size={18} />
              </div>
            </div>
          ) : (
            <>
              <div className="relative hidden sm:block">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Search Keywords..."
                  className="bg-slate-50 border border-slate-100 text-black rounded-full py-2 pl-9 pr-4 text-[11px] font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 w-48 focus:w-64 transition-all"
                />
              </div>
              <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-all active:scale-90">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-600 rounded-full border border-white"></span>
              </button>
            </>
          )}
        </div>
      </div>

      {premiumOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPremiumOpen(false)}
          />
          <div className="bg-black rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden border border-white/10 w-full max-w-sm animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setPremiumOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white"
            >
              <X size={20} />
            </button>
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
        </div>
      )}
    </nav>
  );
}