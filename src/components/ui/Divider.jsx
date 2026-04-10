import React from "react";

export default function Divider({ className = "" }) {
  return (
    <div
      className={`w-full h-px bg-brand-border ${className}`}
      aria-hidden="true"
    />
  );
}
