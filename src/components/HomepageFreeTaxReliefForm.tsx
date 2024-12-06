import Script from "next/script";
import { Button } from "./ui/button";
import Image from "next/image";

export default function HomepageFreeTaxReliefForm() {
  return (
    <div className="flex min-h-[550px] flex-col justify-center bg-blue-primary text-white md:min-h-[560px] md:flex-row lg:min-h-[580px] xl:mx-[100px]">
      <Image
        src="https://assets.dentistswhoinvest.com/David_Hossein_tax_relief_8729644e8b/David_Hossein_tax_relief_8729644e8b.jpg"
        alt="checklist"
        layout="responsive"
        width={808}
        height={898}
        className="size-auto max-h-[340px] max-w-[306px] self-center rounded-[30px] p-2 md:max-h-[480px] md:max-w-[432px] lg:max-h-[480px] lg:max-w-[432px] xl:max-h-[499px] xl:max-w-[449px]"
      />

      <section className="px-[30px] pt-3 md:mt-[38px] md:w-1/2">
        <div className="mb-[-30px] text-center text-xl font-bold lg:text-2xl xl:text-[30px] xl:leading-[36px]">
          Type your details below to receive an email link you can use to
          download your FREE pdf on tax efficiency for dentists.
        </div>
        <div
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="_form_23"
        ></div>
        <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=23" />

        <p className="ml-5 pb-4 text-center text-xs md:pb-0 md:text-left lg:text-base">
          BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST EMAIL
          LIST. THIS LIST CAN BE LEFT AT ANY TIME.
        </p>
      </section>
    </div>
  );
}
