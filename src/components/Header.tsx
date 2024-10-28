"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SquareX } from "lucide-react";

type MenuLink = {
  href: string;
  text: string;
  category?: string;
};

//todo get these from the header data
const menuLinksList: MenuLink[] = [
  { href: "/", text: "Home" },
  { href: "/about/", text: "About" },
  { href: "/podcast/1/", text: "Podcast", category: "podcast" },
  { href: "/articles/1/", text: "Articles", category: "articles" },
  { href: "/courses/", text: "Courses" },
  { href: "/videos/", text: "Videos" },
  { href: "/contact/", text: "Contact" },
];

export default function Header() {
  const [showOverlay, setShowOverlay] = useState(false);

  //hamburger and button should be svgs? absolute top-2 right-2
  const MenuOverlay = () => {
    return (
      <div
        className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/50"
        onClick={() => setShowOverlay(false)}
      >
        <div
          className="absolute right-0 top-0 flex h-full w-2/5 flex-col items-end bg-[#f0f3f6] p-2 md:w-2/6"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="m-0.5 w-4" onClick={() => setShowOverlay(false)}>
            <SquareX className="stroke-blue-primary " />
          </button>
          <ul>
            <MenuLinks menuLinksList={menuLinksList} />
          </ul>
        </div>
      </div>
    );
  };

  const MenuLinks = ({ menuLinksList }: { menuLinksList: MenuLink[] }) => {
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "";

    return menuLinksList.map((link) => {
      const isActive =
        currentPath === link.href ||
        (link.category && currentPath.includes(link.category));
      return (
        <li
          key={link.href}
          className={`p-1 text-right text-sm  md:text-base lg:text-lg ${
            isActive
              ? "text-blue-secondary"
              : "text-blue-primary hover:text-blue-secondary"
          }`}
        >
          <Link
            href={link.href}
            onClick={() => {
              setShowOverlay(false);
            }}
          >
            {link.text}
          </Link>
        </li>
      );
    });
  };

  return (
    <div className="bg-[#f0f3f6]">
      <div className="relative z-20 flex h-[60px] flex-row items-center justify-between px-5 py-3.5  drop-shadow-lg md:h-[90px] md:px-8 md:py-4 lg:justify-evenly xl:m-auto xl:max-w-[1200px]">
        <div>
          <Link href={"/"}>
            <Image
              src={
                "https://www.dentistswhoinvest.com/wp-content/uploads/2024/06/PBS-01-Twilight-Sky-RGB-e1717514900216.png"
              }
              alt={"Logo"}
              width={"94"}
              height={"31"}
              className="sm:h-[34px] sm:w-[103px] lg:h-[44px] lg:w-[134px]"
            />{" "}
          </Link>
        </div>

        <button
          className="pr-2 text-gray-700 hover:text-blue-primary md:hidden"
          onClick={() => setShowOverlay(true)}
        >
          <svg
            className="size-6 text-blue-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="4" width="20" height="2" fill="currentColor" />
            <rect y="10" width="20" height="2" fill="currentColor" />
            <rect y="16" width="20" height="2" fill="currentColor" />
            <rect y="22" width="20" height="2" fill="currentColor" />
          </svg>
        </button>

        {showOverlay && <MenuOverlay />}

        <ul className="hidden flex-row items-center md:flex lg:mr-32">
          <MenuLinks menuLinksList={menuLinksList} />
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href={"https://courses.dentistswhoinvest.com/login"}>
              <button className="m-2 rounded-md bg-orange-400 px-4 py-3 font-bold text-white hover:text-blue-primary">
                Members
              </button>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}
