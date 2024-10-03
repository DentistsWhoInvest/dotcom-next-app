import { Button } from "./ui/button";
import Image from "next/image";
import { SquareX } from "lucide-react";

interface NHSPopupFormProps {
  isVisible: boolean;
  onClose: () => void;
}

export const NHSPopupForm = ({ isVisible, onClose }: NHSPopupFormProps) => {
  if (!isVisible) return null;
  return (
    <div
      id="overlay"
      // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-primary bg-opacity-50"
      onClick={onClose}
    >
      <div
        id="overall-container"
        className="relative flex size-full flex-col bg-white md:h-[446px] md:w-[700px] md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          id="title-and-image"
          className="flex h-3/5 flex-col justify-center bg-[#F58F1D] text-white md:h-full md:w-1/2 md:px-2 md:pt-4"
        >
          <div className="my-12 flex flex-col items-center justify-center  text-center font-bold">
            <button onClick={onClose} className="absolute right-6 top-2">
              <SquareX className="stroke-blue-primary" size={32} />
            </button>
            <h2 className="mb-4 text-[28px] leading-7 md:text-[27px]">
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
        <div id="form" className="m-4 bg-white md:w-1/2 md:p-8 md:pt-16">
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
        </div>
      </div>
    </div>
  );
};
