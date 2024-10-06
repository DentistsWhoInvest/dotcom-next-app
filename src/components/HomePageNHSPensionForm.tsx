import { Button } from "./ui/button";
import Image from "next/image";

export default function HomePageNHSPensionForm() {
  return (
    <div className="flex flex-col justify-center rounded-2xl bg-orange-400 text-white">
      <Image
        src="https://storage.googleapis.com/dwi-dotcom-assets/nhs_pension_checklist_clipboard_97caac76f6/nhs_pension_checklist_clipboard_97caac76f6.webp"
        alt="checklist"
        width={240}
        height={300}
        className="mt-[-50px] self-center"
      />

      <section className="mt-[-20px] space-y-2 px-[30px] py-[50px]">
        <div className="text-center text-xl font-bold">
          Type your details below to receive an email link you can use to
          download your FREE checklist
        </div>
        <form action="" method="post">

        <div id="form" className="space-y-4 md:w-1/2 md:p-8  md:pt-16">
            <div className="flex flex-col justify-start space-y-2">
              <label className="text-sm font-semibold" htmlFor="name">
                First Name{" "}
              </label>
              <input
                className="w-full rounded-sm border border-gray-400 p-2 text-black"
                type="text"
                name="name"
                id="name"
                required
                placeholder="Type your first name"
              />
            </div>
            <div className="flex flex-col  space-y-2">
              <label className="text-sm font-semibold" htmlFor="email">
                Email*
              </label>
              <input
                className="w-full rounded-sm border border-gray-400 p-2 text-black"
                type="email"
                name="email"
                id="email"
                required
                placeholder="Type your email"
              />
            </div>

            <input
              type="submit"
              value="SUBMIT & DOWNLOAD"
              className="rounded-sm bg-blue-light px-4 py-2 text-center text-blue-primary"
            />
            </div>
          </form>
          <p className="pt-4 text-center text-xs">
            BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST
            EMAIL LIST. THIS LIST CAN BE LEFT AT ANY TIME.
          </p>
      </section>
    </div>
  );
}
