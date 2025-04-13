import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <LanguageSwitcher />

      <div className="flex-1">{children}</div>
      <footer className="mt-12 text-center text-sm text-gray-600"></footer>
    </div>
  );
}
