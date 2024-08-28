import Link from "next/link";

const BottomBar = () => {
  return (
    //on desktop, single line, copyright name is on the left, links on the right
    //on mobile, stacked, copyright on the bottom, links on top
    <div className="bg-[#151f6d] text-white flex items-center justify-between p-4 md:flex-row flex-col text-center md:text-left">
      <span className="order-2 md:order-1">copyright name</span>
      <span className="order-1 md:order-2 mb-2 md:mb-0">
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
      <button className="bg-blue-primary hover:bg-blue-secondary text-white hover:text-blue-primary rounded-3xl  px-3.5 py-2 m-1">
        F
      </button>
      <button className="bg-blue-primary hover:bg-blue-secondary text-white hover:text-blue-primary rounded-3xl  px-3.5 py-2 m-1">
        C
      </button>
      <button className="bg-blue-primary hover:bg-blue-secondary text-white hover:text-blue-primary rounded-3xl  px-3.5 py-2 m-1">
        In
      </button>
    </div>
  );
};

export default function Footer() {
  const ExploreLinks = [
    { href: "/about", text: "About" },
    { href: "/podcast", text: "Podcast" },
    { href: "/blog", text: "Blog" },
    { href: "/videos", text: "Videos" },
  ];
  const CoursesLinks = [
    { href: "/cash-flow", text: "Cash Flow" },
    { href: "/academy", text: "Academy" },
  ];
  return (
    <>
      <div className="bg-[#f0f3f6] flex flex-row text-blue-primary p-4 ">
        <div className="w-1/3 m-8">
          Logo
          <p className="text-lg font-bold">
            DENTISTS WHO INVEST LIMITED IS A LIMITED COMPANY, REGISTERED IN
            ENGLAND AND WALES
          </p>
        </div>
        <div className="flex-row w-2/3 space-x-24 flex-grow justify-center content-center self-center justify-self-center hidden md:flex">
          <ul>
            <span className="text-lg font-bold flex justify-center">
              EXPLORE
            </span>
            <p className="border-orange-400 border-solid border-t-2 flex justify-center"></p>
            {ExploreLinks.map((link) => {
              return (
                <li
                  key={link.href}
                  className="hover:text-blue-secondary px-2 py-4 flex justify-center"
                >
                  <Link href={link.href}>{link.text}</Link>
                </li>
              );
            })}
          </ul>

          <ul>
            <span className="text-lg font-bold flex justify-center">
              COURSES
            </span>
            <p className="border-orange-400 border-solid border-t-2 flex justify-center"></p>
            {CoursesLinks.map((link) => {
              return (
                <li
                  key={link.href}
                  className="hover:text-blue-secondary px-2 py-4"
                >
                  <Link href={link.href}>{link.text}</Link>
                </li>
              );
            })}
          </ul>
          <ul>
            <p className="text-lg font-bold flex justify-center">
              GET IN TOUCH
            </p>
            <p className="border-orange-400 border-solid border-t-2 flex justify-center"></p>
            <li className="hover:text-blue-secondary px-2 py-4 flex justify-center">
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
