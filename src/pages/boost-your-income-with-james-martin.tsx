import Image from "next/image";
import Script from "next/script";

export default function BoostYourIncome() {
  return (
    <main
      className={`size-full bg-gradient-to-b from-blue-secondary to-blue-primary xl:h-screen`}
    >
      <section className="m-auto pt-[100px]">
        <div className="flex flex-col items-center justify-center space-y-5 p-5 xl:m-auto xl:max-w-[1140px] xl:flex-row">
          <Image
            src="https://assets.dentistswhoinvest.com/James_Martin_87db09f545/James_Martin_87db09f545.webp"
            alt="James Martin"
            height={335}
            width={251}
            className="rounded-3xl md:h-[550px] md:w-[413px]"
          />

          <div className="px-[20px] py-2 md:px-[40px] md:py-8 xl:px-[80px]">
            <div className="flex flex-col content-center items-center pb-5 text-center text-[25px] font-bold leading-[1.2em] text-white xl:text-[35px]">
              Type your details below to receive a reach out from Dr James
              Martin
            </div>
            <div
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className="_form_52"
            ></div>
            <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=52" />
          </div>
        </div>
      </section>
    </main>
  );
}
