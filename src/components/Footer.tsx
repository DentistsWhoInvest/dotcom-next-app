import Image from "next/image";
import Link from "next/link";

const BottomBar = () => {
  return (
    //on desktop, single line, copyright name is on the left, links on the right
    //on mobile, stacked, copyright on the bottom, links on top
    <div className="flex flex-col items-center justify-between bg-blue-primary p-4 text-center text-xs text-white md:flex-row md:text-left">
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
    <div>
      <Link
        className="m-1 rounded-3xl bg-blue-primary px-3.5 py-2  text-white hover:bg-blue-secondary hover:text-blue-primary"
        href={"https://www.facebook.com/groups/dentistswhoinvest"}
      >
        F
      </Link>
      <Link
        className="m-1 rounded-3xl bg-blue-primary px-3.5 py-2  text-white hover:bg-blue-secondary hover:text-blue-primary"
        href={"https://www.instagram.com/dentistswhoinvest/"}
      >
        C
      </Link>
      <Link
        className="m-1 rounded-3xl bg-blue-primary px-3.5 py-2  text-white hover:bg-blue-secondary hover:text-blue-primary"
        href={"https://www.linkedin.com/in/dr-james-martin/"}
      >
        In
      </Link>
    </div>
  );
};

export default function Footer() {
  const ExploreLinks = [
    { href: "/about", text: "About" },
    { href: "/podcast/1", text: "Podcast" },
    { href: "/articles", text: "Articles" },
    { href: "/videos", text: "Videos" },
  ];
  const CoursesLinks = [
    { href: "/cash-flow", text: "Cash Flow" },
    { href: "/academy", text: "Academy" },
  ];
  return (
    <>
      <div className="flex flex-row bg-[#f0f3f6] p-2 text-blue-primary">
        <div className="">
          <Image
            src="https://www.dentistswhoinvest.com/wp-content/uploads/2024/06/Logo-Footer-2.png"
            alt="logo"
            height={"125"}
            width={"61"}
          />
          <p className="my-4 text-xs font-bold">
            DENTISTS WHO INVEST LIMITED IS A LIMITED COMPANY, REGISTERED IN
            ENGLAND AND WALES
          </p>
          <ShareButtons />
        </div>
        <div className="hidden w-2/3 grow flex-row content-center justify-center space-x-24 self-center justify-self-center md:flex">
          <ul>
            <span className="flex justify-center text-lg font-bold">
              EXPLORE
            </span>
            <p className="flex justify-center border-t-2 border-solid border-orange-400"></p>
            {ExploreLinks.map((link) => {
              return (
                <li
                  key={link.href}
                  className="flex justify-center px-2 py-4 hover:text-blue-secondary"
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
            <p className="flex justify-center border-t-2 border-solid border-orange-400"></p>
            {CoursesLinks.map((link) => {
              return (
                <li
                  key={link.href}
                  className="px-2 py-4 hover:text-blue-secondary"
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
            <li className="flex justify-center px-2 py-4 hover:text-blue-secondary">
              <Link href={"/contact"}>Contact</Link>
            </li>
            <li>
              <ShareButtons />
            </li>
          </ul>
        </div>
      </div>
      <BottomBar />
    </>
  );
}
