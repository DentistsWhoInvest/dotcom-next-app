import { Button } from "./ui/button";
import Image from "next/image";

export default function NHSPopupForm() {
  return (
    <div id="overall-container" className="flex size-full flex-col">
      <div
        id="title-and-image"
        className="flex h-3/5 flex-col justify-center bg-[#F58F1D] text-white"
      >
        <div className="my-12 flex flex-col items-center justify-center  text-center font-bold">
          <h2 className="text-[28px] leading-7 mb-4">
            Have you got your NHS Pension checklist yet?
          </h2>
          <Image
            src="https://storage.googleapis.com/dwi-dotcom-assets/nhs_pension_checklist_clipboard_97caac76f6/nhs_pension_checklist_clipboard_97caac76f6.webp"
            alt="checklist"
            width={240}
            height={300}
          />
        </div>
      </div>
      <div id="form" className="m-4 bg-white">
        <form action="" method="post">
          <div className="my-4 flex flex-col justify-start space-y-1">
            <label
              className="text-sm font-semibold text-blue-primary"
              htmlFor="name"
            >
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
          <div className="mb-4 flex flex-col space-y-1">
            <label
              className="text-sm font-semibold text-blue-primary"
              htmlFor="email"
            >
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
            className="mt-2 rounded-sm bg-orange-400 px-4 py-2 text-center text-blue-primary"
          />
        </form>
        <p className="mt-4 text-base text-blue-primary">
          Enter your details above to receive a link you can use to download
          your FREE checklist
        </p>
        {/* <p className="text-blue-primary"></p>
        <input
          type="text"
          placeholder="Type your first name"
          className="w-full rounded-sm border-2 border-black p-1 text-black"
        /> */}

        {/* <p>Email*</p>
        <input
          type="email"
          placeholder="Type your email"
          className="w-full rounded-sm p-1 text-black"
        />
        <Button className="m-4 bg-orange-400 text-center text-blue-primary">
          SUBMIT & DOWNLOAD
        </Button> */}
      </div>
    </div>
  );
}
