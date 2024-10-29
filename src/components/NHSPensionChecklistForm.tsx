import Script from "next/script";

export default function NHSPensionChecklistForm() {
  return (
    <section className="bg-orange-400 text-white xl:w-[330px]">
      <div className="mb-[-50px] p-[20px] text-center text-[25px] font-bold md:text-left lg:text-[33px] lg:leading-[39px]">
      FREE pdf on tax efficiency for dentists
      </div>
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="_form_23"
      ></div>
      <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=23" />
      <p className="pb-4 text-[12px] leading-5 md:text-left px-[20px] mt-[-10px]">
      Enter your details above to receive a link you can use to download your FREE pdf
      </p>
    </section>
  );
}
