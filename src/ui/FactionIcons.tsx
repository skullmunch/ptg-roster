// src/ui/FactionIcons.tsx
import type { ReactNode } from "react";

export const FACTION_ICONS: Record<string, ReactNode> = {
  // --- Existing Icons (unchanged) ---
  soulblight: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-red-600">
      <path d="M12 2l3 6-3 2-3-2 3-6zm0 8l7 4-7 8-7-8 7-4z" />
    </svg>
  ),

  nighthaunt: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-teal-400">
      <path d="M12 2c4 0 7 3 7 7v4l-3 3v4l-4-2-4 2v-4l-3-3V9c0-4 3-7 7-7z" />
    </svg>
  ),

  stormcast: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-yellow-400">
      <path d="M12 2l8 4v6c0 5-3 9-8 10-5-1-8-5-8-10V6l8-4z" />
    </svg>
  ),

  orruk: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-green-600">
      <path d="M4 4h16v10l-8 6-8-6V4z" />
    </svg>
  ),

  ogor: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-stone-400">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1-5 4-8 8-8s7 3 8 8H4z" />
    </svg>
  ),

  seraphon: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-emerald-500">
      <path d="M12 2l5 5-5 5-5-5 5-5zm0 10l5 5-5 5-5-5 5-5z" />
    </svg>
  ),

  fyreslayers: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-orange-500">
      <path d="M12 2l3 4-3 4-3-4 3-4zm0 8l6 8H6l6-8z" />
    </svg>
  ),

  kharadron: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-sky-400">
      <circle cx="12" cy="8" r="5" />
      <path d="M4 20h16l-3-6H7l-3 6z" />
    </svg>
  ),

  sylvaneth: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-green-500">
      <path d="M12 2l4 6-4 6-4-6 4-6zm0 12l6 8H6l6-8z" />
    </svg>
  ),

  cities: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-gray-300">
      <path d="M4 20V8l6-4 6 4v12H4zm10 0V10h6v10h-6z" />
    </svg>
  ),

  // --- New Icons (AoS 4e full list) ---

  lumineth: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-amber-300">
      <path d="M12 2l4 4-4 8-4-8 4-4zm0 14l6 6H6l6-6z" />
    </svg>
  ),

  idoneth: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-cyan-300">
      <path d="M12 2c5 3 8 6 8 10s-3 7-8 10c-5-3-8-6-8-10s3-7 8-10z" />
    </svg>
  ),

  khaine: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-rose-600">
      <path d="M12 2l4 4-2 6h-4l-2-6 4-4zm0 12l6 8H6l6-8z" />
    </svg>
  ),

  slaves: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-purple-700">
      <path d="M12 2l6 6-6 6-6-6 6-6zm0 14l8 6H4l8-6z" />
    </svg>
  ),

  khorne: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-red-700">
      <path d="M12 2l6 4-2 8h-8l-2-8 6-4zm0 14l6 6H6l6-6z" />
    </svg>
  ),

  tzeentch: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-blue-400">
      <path d="M4 12c4-6 12-6 16 0-4 6-12 6-16 0zm8-8l4 4-4 4-4-4 4-4z" />
    </svg>
  ),

  nurgle: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-lime-600">
      <circle cx="12" cy="12" r="4" />
      <circle cx="6" cy="8" r="3" />
      <circle cx="18" cy="8" r="3" />
    </svg>
  ),

  slaanesh: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-pink-500">
      <path d="M12 2a6 6 0 110 12 6 6 0 010-12zm0 14l6 6H6l6-6z" />
    </svg>
  ),

  skaven: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-gray-500">
      <path d="M4 12l8-8 8 8-8 8-8-8zm8-6l6 6-6 6-6-6 6-6z" />
    </svg>
  ),

  helsmiths: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-orange-700">
      <path d="M12 2l4 4v6l-4 4-4-4V6l4-4zm0 14l6 6H6l6-6z" />
    </svg>
  ),

  bonereapers: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-stone-300">
      <path d="M12 2l4 4v4l-4 4-4-4V6l4-4zm0 12l6 8H6l6-8z" />
    </svg>
  ),

  fecc: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-purple-400">
      <path d="M12 2l5 5-5 3-5-3 5-5zm0 8l7 4-7 8-7-8 7-4z" />
    </svg>
  ),

  gitz: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-green-400">
      <path d="M12 2l6 6-6 4-6-4 6-6zm0 10l6 6H6l6-6z" />
    </svg>
  ),

  behemat: (
    <svg viewBox="0 0 24 24" className="w-10 h-10 fill-yellow-600">
      <circle cx="12" cy="8" r="5" />
      <path d="M4 22c2-6 6-10 8-10s6 4 8 10H4z" />
    </svg>
  ),
};
