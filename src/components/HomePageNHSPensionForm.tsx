import Script from "next/script";
import { Button } from "./ui/button";
import Image from "next/image";

export default function HomePageNHSPensionForm() {
  return (
    <div className="flex flex-col justify-center rounded-2xl bg-orange-400 text-white  md:h-[560px] md:flex-row lg:h-[580px] xl:mx-[100px] ">
      <Image
        src="https://storage.googleapis.com/dwi-dotcom-assets/nhs_pension_checklist_clipboard_97caac76f6/nhs_pension_checklist_clipboard_97caac76f6.webp"
        alt="checklist"
        width={1024}
        height={1340}
        className="mt-[-40px] h-[361px] w-[276px] self-center md:h-[338px] md:w-[258px] lg:h-[492px] lg:w-[376px] xl:h-[544px] xl:w-[416px]"
      />

      <section className="px-[30px] pt-3 md:ml-8 md:w-1/2">
        <div className="mb-[-30px] text-center text-xl font-bold lg:text-2xl xl:text-4xl">
          Type your details below to receive an email link you can use to
          download your FREE checklist
        </div>
        <div
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="_form_26"
        ></div>
        <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=26" />

        <p className="ml-5 pb-4 text-center text-xs md:pb-0 md:text-left lg:text-base">
          BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST EMAIL
          LIST. THIS LIST CAN BE LEFT AT ANY TIME.
        </p>
      </section>
    </div>
  );
}
