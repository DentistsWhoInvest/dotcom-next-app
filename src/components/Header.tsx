import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const listOfLinks = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/podcast", text: "Podcast" },
  { href: "/blog", text: "Blog" },
  { href: "/courses", text: "Courses" },
  { href: "/videos", text: "Videos" },
  { href: "/contact", text: "Contact" },
];

export default function Header() {
  const [showingOverlay, setShowingOverlay] = useState(false);

  const MenuOverlay = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <ul className="bg-[#f0f3f6] flex flex-col">
          <button
            className="absolute top-0 right-0 m-4 text-gray-700 hover:text-blue-500"
            onClick={() => setShowingOverlay(false)}
          >
            x
          </button>
          {listOfLinks.map((link) => {
            return (
              <li
                key={link.href}
                className="text-blue-primary hover:text-blue-secondary text-lg px-2 py-4"
              >
                <Link href={link.href}>{link.text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <>
      <div className="bg-[#f0f3f6] flex flex-row p-5 justify-between">
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
          className="md:hidden text-gray-700 hover:text-blue-500 mr-[-20px]"
          onClick={() => setShowingOverlay(true)}
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

        {showingOverlay && <MenuOverlay />}

        <ul className="flex-row hidden md:flex">
          {listOfLinks.map((link) => {
            return (
              <li
                key={link.href}
                className="text-blue-primary hover:text-blue-secondary text-lg px-2 py-4"
              >
                <Link href={link.href}>{link.text}</Link>
              </li>
            );
          })}
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
