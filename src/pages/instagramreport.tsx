import Head from "next/head";
import Script from "next/script";
import Image from "next/image";

export default function InstagramReport() {
  return (
    <>
      <Head>
        <title>Instagram - Dentists Who Invest</title>
        <meta
          name="Instagram - Dentists Who Invest"
          content="Instagram - Dentists Who Invest"
        />
      </Head>
      <main
        className={`size-full h-screen bg-gradient-to-b from-blue-secondary to-blue-primary `}
      >
        <section className="flex size-full flex-col place-content-center content-center items-center justify-items-center p-[40px] text-center text-white md:p-[20px] xl:mx-auto xl:max-w-[1140px]">
          <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-b from-blue-primary to-black text-white  md:h-[500px] md:flex-row xl:h-[570px] ">
            <Image
              src="https://www.dentistswhoinvest.com/wp-content/uploads/2022/10/7-Costly-and-Potentially-Disastrous-Mistakes-eBook-Mockup.png"
              alt="checklist"
              width={1024}
              height={1340}
              className="mt-4 h-[380px] w-[280px] self-center md:h-[338px] md:w-[258px] lg:h-[492px] lg:w-[376px] xl:h-[544px] xl:w-[416px]"
            />

            <section className="mt-[-20px] space-y-2 px-[30px] py-[50px] md:ml-8 md:w-1/2">
              <div className="text-center text-xl font-bold lg:text-2xl xl:text-4xl">
                Type your details below to receive an email link you can use to
                download your FREE report
              </div>
              <div
                // eslint-disable-next-line tailwindcss/no-custom-classname
                className="_form_9"
              ></div>
              <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=9" />
              <p className="ml-5 pt-4 text-center text-xs md:text-left lg:text-base">
                BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST
                EMAIL LIST. THIS LIST CAN BE LEFT AT ANY TIME.
              </p>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
