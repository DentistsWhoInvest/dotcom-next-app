import Script from "next/script";

export default function NHSPensionChecklistForm() {
  return (
    <section className="bg-orange-400 text-white xl:w-[330px]">
      <div className="mb-4 text-center text-2xl font-bold xl:text-4xl md:text-left p-[20px]">
        Have you got your NHS Pension checklist yet?
      </div>
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="_form_26"
      ></div>
      <Script src="https://dentistswhoinvest.activehosted.com/f/embed.php?id=26" />
      <p className="pt-4 text-[18px] leading-5 md:text-left lg:text-base px-[20px]">
        Enter your details above to receive a link you can use to download your
        FREE checklist
      </p>
    </section>
  );
}
