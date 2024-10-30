import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export default function PodcastReport() {
  return (
    <main
      className={`size-full bg-gradient-to-b from-blue-secondary to-blue-primary md:h-screen `}
    >
      <section className="flex size-full flex-col place-content-center content-center items-center justify-items-center p-[40px] text-white md:flex-row md:p-[20px] xl:mx-auto xl:max-w-[1140px]">
        <Image
          src="https://www.dentistswhoinvest.com/wp-content/uploads/2022/10/7-Costly-and-Potentially-Disastrous-Mistakes-eBook-Mockup.png"
          alt="7-costly-mistakes"
          width={1024}
          height={1340}
          className="size-full max-h-[800px] max-w-[600px] rounded-xl object-cover md:max-h-[533px] md:max-w-[399px] lg:mr-[50px] lg:w-1/2"
        />

        <div className="space-y-2 md:ml-8 md:w-1/2">
          <div className="text-center">
            <p className="text-[25px] font-bold leading-[29px] md:text-xl lg:text-[30px] lg:leading-[42px]">
              Never Miss A Dentists Who Invest Podcast Episode Again And Also
              Receive A Free Report On Investing
            </p>
            <p className="text-[18px] leading-[25px] md:hidden lg:block lg:text-[20px] lg:leading-[28px]">
              Type your details below to download your FREE report
            </p>
          </div>

          <div
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="_form_7"
          ></div>
          <Script
            src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=7"
            strategy="lazyOnload"
            // charSet="utf-8"
          />
          <p className="pt-4 text-center text-xs md:text-center lg:text-base">
            BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST
            EMAIL LIST. THIS LIST CAN BE LEFT AT ANY TIME.
          </p>
        </div>
      </section>
    </main>
  );
}
