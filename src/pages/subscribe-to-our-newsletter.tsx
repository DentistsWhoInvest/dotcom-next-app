import Head from "next/head";
import Script from "next/script";
import Image from "next/image";

export default function SubscribeToNewsletterPage() {
  return (
    <>
      <Head>
        <title>Subscribe to our Newsletter - Dentists Who Invest</title>
        <meta
          name="Subscribe to our Newsletter - Dentists Who Invest"
          content="Subscribe to our Newsletter - Dentists Who Invest"
        />
      </Head>
      <main
        className={`size-full bg-gradient-to-b from-blue-secondary to-blue-primary md:h-screen `}
      >
        <section className="flex size-full flex-col place-content-center content-center items-center justify-items-center p-[40px] text-center text-white md:p-[20px] xl:mx-auto xl:max-w-[1140px]">
          <div className="flex flex-col justify-center rounded-2xl text-white  md:h-[550px] md:flex-row xl:h-[700px] ">
            <Image
              src="https://assets.dentistswhoinvest.com/Newsletter_scaled_e57b2b53b0/Newsletter_scaled_e57b2b53b0.webp"
              alt="newsletter-email-example"
              width={1024}
              height={1340}
              className="mt-4 h-[380px] w-[280px] self-center md:h-[338px] md:w-[258px] lg:h-[492px] lg:w-[376px] xl:h-[544px] xl:w-[416px]"
            />
            <section className="mt-[-20px] space-y-1 py-[40px] md:ml-8  md:w-1/2 md:px-[30px]">
              <div className="mb-[-30px] text-center text-xl font-bold lg:text-2xl xl:text-4xl">
                Subscribe to our email newsletter and stay updated on all things
                finance
              </div>
              <div
                // eslint-disable-next-line tailwindcss/no-custom-classname
                className="_form_38"
              ></div>
              <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=38" />
              <p className="ml-5 text-center text-xs md:text-left lg:text-base">
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
