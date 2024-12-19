import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white shadow-md p-4 text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
    </footer>
  );
}
