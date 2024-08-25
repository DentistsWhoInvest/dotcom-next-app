import Link from "next/link";

export default function Header() {
  const listOfLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/podcast", text: "Podcast" },
    { href: "/blog", text: "Blog" },
    { href: "/courses", text: "Courses" },
    { href: "/videos", text: "Videos" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <>
      <div className="bg-[#f0f3f6] flex flex-row">
        <div className="w-1/3">Logo</div>
        <ul className="flex flex-row">
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
        <Link href={'https://courses.dentistswhoinvest.com/login'}><button className="bg-orange-400 text-white font-bold hover:text-blue-primary rounded-md px-4 py-3 m-2">Members</button></Link>
      </div>
    </>
  );
}
