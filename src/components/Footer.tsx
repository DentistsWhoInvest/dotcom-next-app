"use client";
import Image from "next/image";
import Link from "next/link";

const BottomBar = () => {
  const currentYear = new Date().getFullYear();
  return (
    //on desktop, single line, copyright name is on the left, links on the right
    //on mobile, stacked, copyright on the bottom, links on top
    <div className="bg-blue-primary">
    <div className="flex flex-col items-center justify-between py-4 text-center text-xs text-white md:flex-row md:text-left mx-3 md:text-base lg:mx-auto lg:max-w-[1000px]">
      <span className="order-2 md:order-1">
        © {currentYear} Dentists Who Invest All Rights Reserved.
      </span>
      <span className="order-1 mb-2 md:order-2 md:mb-0">
        <Link href="/privacy-policy"> Privacy Policy </Link>
        <span> | </span>
        <Link href="/terms-and-conditions"> Terms and conditions </Link>
      </span>
    </div></div>
  );
};

//also need to be visible at mobile breakpoint
const ShareButtons = () => {
  return (
    <div className="flex flex-row space-x-2">
      <Link href={"https://www.facebook.com/groups/dentistswhoinvest"}>
        <Image
          src="https://assets.dentistswhoinvest.com/Facebook_Logo_Primary_357f62df13/Facebook_Logo_Primary_357f62df13.webp"
          alt="Visit Dentists Who Invest on Facebook"
          width={40}
          height={40}
        ></Image>
      </Link>
      <Link href={"https://www.instagram.com/dentistswhoinvest/"}>
        <Image
          src="https://assets.dentistswhoinvest.com/Instagram_Glyph_Gradient_0fde9ef993/Instagram_Glyph_Gradient_0fde9ef993.webp"
          alt="Visit Dentists Who Invest on Instagram"
          width={40}
          height={40}
        ></Image>
      </Link>
      <Link
        // className="m-1 rounded-3xl bg-blue-primary px-3.5 py-2  text-white hover:bg-blue-secondary hover:text-blue-primary"
        href={"https://www.linkedin.com/in/dr-james-martin/"}
      >
        <Image
          src="https://assets.dentistswhoinvest.com/linkedin_logo_681e6eb0d0/linkedin_logo_681e6eb0d0.webp"
          alt="Visit Dentists Who Invest on LinkedIn"
          width={40}
          height={40}
        ></Image>
      </Link>
    </div>
  );
};

export default function Footer() {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const ExploreLinks = [
    { href: "/about/", text: "About" },
    { href: "/podcast/1/", text: "Podcast", category: "podcast" },
    { href: "/articles/1/", text: "Articles", category: "articles" },
    { href: "/videos", text: "Videos/CPD" },
  ];
  const CoursesLinks = [
    { href: "/cash-flow-for-dentists/", text: "Cash Flow For Dentists" },
    { href: "/the-academy/", text: "Dentists Who Invest Academy" },
  ];

  return (
    <div className="bg-[#f0f3f6] shadow-[rgba(0,0,15,0.5)_0px_0px_15px_0px]">
      <div className="flex flex-row mx-3 py-2 text-blue-primary md:flex-col lg:flex-row lg:pt-8 lg:pb-4 max-w-[1000px] lg:mx-auto lg:justify-evenly">
        
        {/* Logo and Text Section */}
        <div className="justify-evenly md:flex md:flex-row md:space-x-0 lg:w-1/3 lg:flex-col lg:space-x-0 md:space-y-4 lg:place-self-start md:py-4 lg:py-0">
          <Image
            src="https://assets.dentistswhoinvest.com/DWI_initials_logo_41a62b9b9a/DWI_initials_logo_41a62b9b9a.webp"
            alt="logo"
            height={"61"}
            width={"125"}
            className="md:h-[73px] md:w-[150px]"
          />
          <p className="my-2 text-xs font-bold md:text-center md:text-base lg:text-left">
            DENTISTS WHO INVEST LIMITED IS A LIMITED COMPANY, REGISTERED IN
            ENGLAND AND WALES
          </p>
          <div className="md:hidden">
            <ShareButtons />
          </div>
        </div>

        {/* Links Section */}
        <div className="hidden grow flex-row content-center lg:justify-end space-x-28 self-center justify-self-center md:flex lg:space-x-8">
          
          {/* Explore Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold">EXPLORE</h3>
            <div className="flex justify-center border-t-2 border-solid border-orange-400 my-2"></div>
            <ul>
              {ExploreLinks.map((link) => {
                const isActive =
                  currentPath === link.href ||
                  (link.category && currentPath.includes(link.category));
                return (
                  <li
                    key={link.href}
                    className={
                      "flex justify-center p-2 text-blue-primary hover:text-blue-secondary"
                    }
                  >
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Courses Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold">COURSES</h3>
            <div className="mx-16 flex justify-center border-t-2 border-solid border-orange-400 my-2"></div>
            <ul>
              {CoursesLinks.map((link) => {
                const isActive = currentPath === link.href;
                return (
                  <li
                    key={link.href}
                    className={`flex justify-center p-2 text-nowrap ${
                      isActive
                        ? "text-blue-secondary"
                        : "text-blue-primary hover:text-blue-secondary"
                    }`}
                  >
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div className="text-center">
            <h3 className="text-lg font-bold">GET IN TOUCH</h3>
            <div className="flex justify-center border-t-2 border-solid border-orange-400 my-2"></div>
            <ul>
              <li
                className={`flex justify-center p-2 ${
                  currentPath === "/contact/"
                    ? "text-blue-secondary"
                    : "text-blue-primary hover:text-blue-secondary"
                }`}
              >
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li className="flex justify-center p-2">
                <ShareButtons />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
