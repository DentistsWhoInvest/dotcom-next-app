import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type MenuLink = {
  href: string;
  text: string;
};

//todo get these from the header data
const menuLinksList: MenuLink[] = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/podcasts", text: "Podcast" },
  { href: "/blog", text: "Blog" },
  { href: "/courses", text: "Courses" },
  { href: "/videos", text: "Videos" },
  { href: "/contact", text: "Contact" },
];

export default function Header() {
  const [showOverlay, setShowOverlay] = useState(false);

  //hamburger and button should be svgs? absolute top-2 right-2
  const MenuOverlay = () => {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowOverlay(false)}
      >
        <div
          className="bg-[#f0f3f6] flex flex-col w-2/5 h-full top-0 right-0 absolute items-end p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-gray-700 hover:text-blue-500 border-solid border-2 border-blue-primary w-4"
            onClick={() => setShowOverlay(false)}
          >
            x
          </button>
          <ul className="text-right">
            <MenuLinks menuLinksList={menuLinksList} />
          </ul>
        </div>
      </div>
    );
  };

  const MenuLinks = ({ menuLinksList }: { menuLinksList: MenuLink[] }) => {
    //current pages needs to be highlighted in blue secondary - for some reason not quite working locally?
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "";

    return menuLinksList.map((link) => (
      <li
        key={link.href}
        className={`text-lg px-2 py-2 ${
          currentPath === link.href
            ? "text-blue-secondary"
            : "text-blue-primary hover:text-blue-secondary"
        }`}
      >
        <Link href={link.href}>{link.text}</Link>
      </li>
    ));
  };

  return (
    <>
      <div className="bg-[#f0f3f6] flex flex-row px-5 py-3 justify-between">
        <div className="w-1/3">
          <Image
            src={
              "https://www.dentistswhoinvest.com/wp-content/uploads/2024/06/PBS-01-Twilight-Sky-RGB-e1717514900216.png"
            }
            alt={"Logo"}
            width="78"
            height={"26"}
          />
        </div>

        <button
          className="md:hidden text-gray-700 hover:text-blue-500"
          onClick={() => setShowOverlay(true)}
        >
          <svg
            className="w-6 h-6 text-blue-primary"
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

        <ul className="flex-row hidden md:flex">
          <MenuLinks menuLinksList={menuLinksList} />
          <Link href={"https://courses.dentistswhoinvest.com/login"}>
            <button className="bg-orange-400 text-white font-bold hover:text-blue-primary rounded-md px-4 py-3 m-2">
              Members
            </button>
          </Link>
        </ul>
      </div>
    </>
  );
}
