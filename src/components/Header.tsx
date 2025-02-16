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
  { href: "https://www.dwimarket.com/", text: "Store" },
  { href: "/courses/", text: "Courses" },
  { href: "/videos/", text: "Videos/CPD" },
  { href: "/contact/", text: "Contact" },
];

export default function Header() {
  const [showOverlay, setShowOverlay] = useState(false);

  //hamburger and button should be svgs? absolute top-2 right-2
  const MenuOverlay = () => {
    return (
      <div
        className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/50 -mx-3"
        onClick={() => setShowOverlay(false)}
      >
        <div
          className="absolute right-0 top-0 flex h-full w-[35%] flex-col items-end bg-[#f0f3f6] p-2 md:w-1/5 pr-5"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="mt-2 mb-0.5 mx-2.5 w-4" onClick={() => setShowOverlay(false)}>
            <SquareX className="stroke-blue-primary" />
          </button>
          <ul>
            <MenuLinks menuLinksList={menuLinksList} />
            <li>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Link href={"https://courses.dentistswhoinvest.com/login"}>
                  <button className="mt-2 rounded-md bg-orange-600 px-3 py-1.5 text-white transition duration-200 ease-in-out hover:scale-105">
                    Members
                  </button>
                </Link>
              </div>
            </li>
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
          className={`p-[3px] lg:p-2 text-right text-[15px] lg:text-lg ${
            isActive
              ? "text-orange-700"
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
    <div className="bg-[white] ">
      <div className="relative z-20 flex h-[60px] flex-row items-center justify-between py-3.5 drop-shadow-lg md:h-[90px] md:py-4 lg:mx-auto lg:max-w-[1000px] lg:justify-between mx-3">
        <div>
          <Link href={"/"}>
            <Image
              src="https://assets.dentistswhoinvest.com/DWI_logo_dark_blue_fe1599655f/DWI_logo_dark_blue_fe1599655f.svg"
              alt={"Dentists Who Invest Logo"}
              width={"94"}
              height={"31"}
              className="sm:h-[34px] sm:w-[103px] lg:h-[44px] lg:w-[134px]"
            />{" "}
          </Link>
        </div>
        <div className="grow"></div>
        <button
          className="text-gray-700 hover:text-blue-primary md:hidden"
          onClick={() => setShowOverlay(true)}
        >
          <svg
            className="size-6 text-blue-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 26"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect y="4" width="20" height="2" fill="currentColor" />
            <rect y="10" width="20" height="2" fill="currentColor" />
            <rect y="16" width="20" height="2" fill="currentColor" />
            <rect y="22" width="20" height="2" fill="currentColor" />
          </svg>
        </button>

        {showOverlay && <MenuOverlay />}

        <ul className="hidden flex-row items-center md:flex">
          <MenuLinks menuLinksList={menuLinksList} />
          <li>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link href={"https://courses.dentistswhoinvest.com/login"}>
                <button className="transform rounded-md bg-orange-600 px-4 py-3 font-bold text-white transition duration-200 ease-in-out hover:scale-105">
                  Members
                </button>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
