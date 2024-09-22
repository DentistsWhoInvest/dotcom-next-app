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
  { href: "/podcast/1", text: "Podcast" },
  { href: "/articles", text: "Articles" },
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setShowOverlay(false)}
      >
        <div
          className="absolute right-0 top-0 flex h-full w-2/5 flex-col items-end bg-[#f0f3f6] p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="w-4 border-2 border-solid border-blue-primary text-gray-700 hover:text-blue-primary"
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
        // className={`p-2 text-lg ${
        //   currentPath === link.href
        //     ? "text-blue-secondary"
        //     : "text-blue-primary hover:text-blue-secondary"
        // }`}
        className="p-2 text-lg"
      >
        <Link href={link.href}>{link.text}</Link>
      </li>
    ));
  };

  return (
    <>
      <div className="flex flex-row justify-between bg-[#f0f3f6] px-5 py-3">
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
          className="text-gray-700 hover:text-blue-primary md:hidden"
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

        <ul className="hidden flex-row md:flex">
          <MenuLinks menuLinksList={menuLinksList} />
          <Link href={"https://courses.dentistswhoinvest.com/login"}>
            <button className="m-2 rounded-md bg-orange-400 px-4 py-3 font-bold text-white hover:text-blue-primary">
              Members
            </button>
          </Link>
        </ul>
      </div>
    </>
  );
}
