import Head from "next/head";

export default function Congrats() {
  return (
    <>
      <Head>
        {" "}
        <title>Congrats</title>
        <meta
          name="Dentists Who Invest - Congrats"
          content="Dentists Who Invest - Congrats"
        />
      </Head>
      <main
        className={`size-full h-screen bg-gradient-to-b from-blue-secondary to-blue-primary `}
      >
        <section className="flex size-full flex-col place-content-center content-center items-center justify-items-center p-[40px] text-center text-white md:p-[20px] xl:mx-auto xl:max-w-[1140px]">
          <p className="pb-5 text-[45px] font-bold leading-[54px]">
            Congrats On Joining The Waiting List​
          </p>
          <p className="text-[29px] leading-[40.6px]">
            We Will Be In Touch Via Email In Due Course
          </p>
        </section>
      </main>
    </>
  );
}
