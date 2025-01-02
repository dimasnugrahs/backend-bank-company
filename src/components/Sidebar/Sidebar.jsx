"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  return (
    // <div
    //   className={`fixed inset-y-0 left-0 bg-blue-500 text-white w-64 transform ${
    //     isOpen ? "translate-x-0" : "-translate-x-full"
    //   } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    // >
    //   <div className="p-4">
    //     <h2 className="text-lg font-bold">Sidebar</h2>
    //   </div>
    //   <nav className="mt-4">
    //     <ul>
    //       <li className="p-2 hover:bg-blue-600">
    //         <a href="#">Home</a>
    //       </li>
    //       <li className="p-2 hover:bg-blue-600">
    //         <a href="#">About</a>
    //       </li>
    //       <li className="p-2 hover:bg-blue-600">
    //         <a href="#">Contact</a>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-30 px-2 flex h-screen w-72 flex-col overflow-y-hidden bg-slate-800 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 mt-7">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-white">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5 text-white">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <Link
                  href="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-slate-700 ${
                    pathname === "/" && "bg-graydark bg-slate-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M3 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm0 8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1zm1-17a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"
                    />
                  </svg>
                  Dashboard
                </Link>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item User --> */}
              <li>
                <Link
                  href="/user"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-slate-700 ${
                    pathname &&
                    pathname.includes("user") &&
                    "bg-graydark bg-slate-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M6.5 7.5a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M3 19a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v3H3z"
                    />
                  </svg>
                  User
                </Link>
              </li>
              {/* <!-- Menu Item User --> */}

              {/* <!-- Menu Item Category --> */}
              <li>
                <Link
                  href="/categoryblog"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-slate-700 ${
                    pathname.startsWith("/categoryblog") &&
                    "bg-graydark bg-slate-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m22.67 12l-4.49 4.5l-2.51-2.5l1.98-2l-1.98-1.96l2.51-2.51zM12 1.33l4.47 4.49l-2.51 2.51L12 6.35l-2 1.98l-2.5-2.51zm0 21.34l-4.47-4.49l2.51-2.51L12 17.65l2-1.98l2.5 2.51zM1.33 12l4.49-4.5L8.33 10l-1.98 2l1.98 1.96l-2.51 2.51zM12 10a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"
                    />
                  </svg>
                  Blog Categories
                </Link>
              </li>
              {/* <!-- Menu Item Category --> */}

              {/* <!-- Menu Item Blog --> */}
              <li>
                <Link
                  href="/blog"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-slate-700 ${
                    pathname.startsWith("/blog") && "bg-graydark bg-slate-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm-4 4q-.825 0-1.412-.587T3 20V6h2v14h11v2z"
                    />
                  </svg>
                  Blog
                </Link>
              </li>
              {/* <!-- Menu Item Blog --> */}

              {/* <!-- Menu Item Product --> */}
              <li>
                <Link
                  href="/product"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-slate-700 ${
                    pathname &&
                    pathname.includes("product") &&
                    "bg-graydark bg-slate-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="M160 144h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V160c0-8.837 7.163-16 16-16m564.314-25.333l181.019 181.02c6.248 6.248 6.248 16.378 0 22.627l-181.02 181.019c-6.248 6.248-16.378 6.248-22.627 0l-181.019-181.02c-6.248-6.248-6.248-16.378 0-22.627l181.02-181.019c6.248-6.248 16.378-6.248 22.627 0M160 544h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16m400 0h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H560c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16"
                    />
                  </svg>
                  Product
                </Link>
              </li>
              {/* <!-- Menu Item Product --> */}

              {/* <!-- Menu Item Category --> */}

              {/* <!-- Menu Item Report --> */}
              {/* <li>
                <Link
                  href="/report"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-slate-700 ${
                    pathname.startsWith("/report") && "bg-graydark bg-slate-700"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M2.5 1.045a.5.5 0 0 0-.5.5v10.91a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V5.364a.5.5 0 0 0-.152-.36L7.911 1.188a.5.5 0 0 0-.348-.142zm7.766 3.819L8.063 2.727v2.137zM6 5.5H4v-1h2zM10 8H4V7h6zm-6 2.5h6v-1H4z"
                      clipRule="evenodd"
                    />
                    <path
                      fill="currentColor"
                      d="M13 7.5V14H4.5v1h9a.5.5 0 0 0 .5-.5v-7z"
                    />
                  </svg>
                  Report
                </Link>
              </li> */}
              {/* <!-- Menu Item Blog --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
}
