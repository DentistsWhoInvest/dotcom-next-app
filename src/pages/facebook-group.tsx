import Link from "next/link";

export default function FacebookGroup() {
  return (
    <main
      className={`w-screen h-screen bg-gradient-to-b from-blue-secondary to-blue-primary `}
    >
      <section className="p-[20px] size-full flex flex-col content-center place-content-center items-center justify-items-center xl:max-w-[1140px] xl:mx-auto">
        <div className="text-center  text-white">
          <p className="font-bold md:text-[45px] md:leading-[54px] pb-[20px] text-[31px] leading-[43.4px]">
            UK Dentists: Join The Free Facebook Group Which Demonstrates How A
            Dentist Can Grow Their Wealth PROPERLY
          </p>

          <p className="text-[20px] leading-[24px] md:text-[29px] md:leading-[34.8px] pt-[14px] pb-[60px]">
            (...and not like how 99% of the Internet Portrays it)
          </p>
        </div>
        <button className="bg-orange-400 py-[15px] px-[30px] text-[25px] md:text-[45px] text-white">
          <Link href={"https://www.facebook.com/groups/dentistswhoinvest"}>Join the Free Facebook Group</Link>
        </button>
      </section>
    </main>
  );
}
