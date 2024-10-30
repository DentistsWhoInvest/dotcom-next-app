import Script from "next/script";
import { Button } from "./ui/button";
import Image from "next/image";

export default function PodcastMarketingForm() {
  return (
    <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-b from-blue-primary to-black text-white  md:h-[500px] md:flex-row xl:mx-[100px] xl:h-[570px] xxl:mx-[292px] ">
      <Image
        src="https://www.dentistswhoinvest.com/wp-content/uploads/2022/10/7-Costly-and-Potentially-Disastrous-Mistakes-eBook-Mockup.png"
        alt="checklist"
        width={1024}
        height={1340}
        className="mt-4 h-[380px] w-[280px] self-center md:h-[338px] md:w-[258px] lg:h-[492px] lg:w-[376px] xl:h-[544px] xl:w-[416px]"
      />

      <section className="mt-[-20px] space-y-2 px-[30px] py-[50px] md:ml-8 md:w-1/2">
        <div className="text-center text-xl font-bold lg:text-2xl xl:text-4xl">
          Never Miss A Dentists Who Invest Podcast Episode Again And Also
          Receive A Free Report On Investing​
        </div>
        <div
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="_form_7"
        ></div>
        <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=7" />
        <p className="ml-5 pt-4 text-center text-xs md:text-left lg:text-base">
          BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST EMAIL
          LIST. THIS LIST CAN BE LEFT AT ANY TIME.
        </p>
      </section>
    </div>
  );
}
