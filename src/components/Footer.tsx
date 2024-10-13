import Image from "next/image";
import Link from "next/link";

const BottomBar = () => {
  return (
    //on desktop, single line, copyright name is on the left, links on the right
    //on mobile, stacked, copyright on the bottom, links on top
    <div className="flex flex-col items-center justify-between bg-blue-primary p-4 text-center text-xs text-white md:flex-row md:text-left md:text-base xl:px-[150px]">
      <span className="order-2 md:order-1">
        © 2024 Dentists Who Invest All Rights Reserved.
      </span>
      <span className="order-1 mb-2 md:order-2 md:mb-0">
        <Link href="/privacy-policy"> Privacy Policy </Link>
        <span> | </span>
        <Link href="/terms-and-conditions"> Terms and conditions </Link>
      </span>
    </div>
  );
};

//also need to be visible at mobile breakpoint
const ShareButtons = () => {
  return (
    <div className="flex flex-row space-x-2">
      <Link href={"https://www.facebook.com/groups/dentistswhoinvest"}>
        <Image
          src="https://storage.googleapis.com/dwi-dotcom-assets/Facebook_Logo_Primary_357f62df13/Facebook_Logo_Primary_357f62df13.webp"
          alt="Facebook"
          width={30}
          height={30}
          className="md:size-[40px]"
        ></Image>
      </Link>
      <Link href={"https://www.instagram.com/dentistswhoinvest/"}>
        <Image
          src="https://storage.googleapis.com/dwi-dotcom-assets/Instagram_Glyph_Gradient_0fde9ef993/Instagram_Glyph_Gradient_0fde9ef993.webp"
          alt="Instagram"
          width={30}
          height={30}
          className="md:size-[40px]"
        ></Image>
      </Link>
      <Link
        // className="m-1 rounded-3xl bg-blue-primary px-3.5 py-2  text-white hover:bg-blue-secondary hover:text-blue-primary"
        href={"https://www.linkedin.com/in/dr-james-martin/"}
      >
        <Image
          src="https://storage.googleapis.com/dwi-dotcom-assets/linkedin_logo_681e6eb0d0/linkedin_logo_681e6eb0d0.webp"
          alt="Linked in"
          width={30}
          height={30}
          className="md:size-[40px]"
        ></Image>
      </Link>
    </div>
  );
};

export default function Footer() {
  const ExploreLinks = [
    { href: "/about", text: "About" },
    { href: "/podcast/1", text: "Podcast" },
    { href: "/articles/1", text: "Articles" },
    { href: "/videos", text: "Videos" },
  ];
  const CoursesLinks = [
    { href: "/cash-flow", text: "Cash Flow For Dentists" },
    { href: "/academy", text: "Dentists Who invest Academy" },
  ];
  return (
    <>
      <div className="flex flex-row bg-[#f0f3f6] p-2 text-blue-primary shadow-[rgba(0,0,15,0.5)_0px_0px_15px_0px] md:flex-col lg:flex-row lg:px-32 lg:py-8">
        <div
          className="justify-evenly md:m-8 md:flex md:flex-row md:space-x-8 lg:w-1/3 lg:flex-col lg:space-x-0 lg:space-y-4"
          id="logo and text"
        >
          <Image
            src="https://storage.googleapis.com/dwi-dotcom-assets/DWI_initials_logo_41a62b9b9a/DWI_initials_logo_41a62b9b9a.webp"
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

        <div
          id="links"
          className="hidden grow flex-row content-center justify-center space-x-28 self-center justify-self-center md:flex lg:space-x-8"
        >
          <ul>
            <span className="flex justify-center text-lg font-bold">
              EXPLORE
            </span>
            <p className="flex justify-center border-t-2 border-solid border-orange-400"></p>
            {ExploreLinks.map((link) => {
              return (
                <li
                  key={link.href}
                  className="flex justify-center p-2 hover:text-blue-secondary"
                >
                  <Link href={link.href}>{link.text}</Link>
                </li>
              );
            })}
          </ul>

          <ul>
            <span className="flex justify-center text-lg font-bold">
              COURSES
            </span>
            <p className="mx-16 flex justify-center border-t-2 border-solid border-orange-400"></p>
            {CoursesLinks.map((link) => {
              return (
                <li
                  key={link.href}
                  className="p-2 text-center hover:text-blue-secondary"
                >
                  <Link href={link.href}>{link.text}</Link>
                </li>
              );
            })}
          </ul>
          <ul>
            <p className="flex justify-center text-lg font-bold">
              GET IN TOUCH
            </p>
            <p className="flex justify-center border-t-2 border-solid border-orange-400"></p>
            <li className="flex justify-center p-2 hover:text-blue-secondary">
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li className="flex justify-center p-2">
              <ShareButtons />
            </li>
          </ul>
        </div>
      </div>
      <BottomBar />
    </>
  );
}
