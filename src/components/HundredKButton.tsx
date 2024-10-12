import Link from "next/link";
import Image from "next/image";

export const HundredKButton = () => {
  return (
    <div className="mx-4 mb-12 mt-8 self-center rounded-lg border-2 border-solid bg-white shadow-custom transition-all duration-300 hover:bg-orange-400 xl:max-w-[1140px]">
      <Link
        href={"/100k"}
        className="justify-center text-wrap p-4 text-center text-xl font-semibold text-blue-primary"
      >
             <span className="relative z-[1]">
        Psssssst – Principal dentists: want to add{" "}
      </span>
      <span id="wrapper" className="relative inline-block overflow-visible">
        <span className="relative left-0 top-0 z-[1] inline-block">£100k</span>
        <svg
          className="absolute left-1/2 top-1/2 z-[2] size-[calc(100%+20px)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          fill="red"
        >
          <path d="M5,125.4c30.5-3.8,137.9-7.6,177.3-7.6c117.2,0,252.2,4.7,312.7,7.6"></path>
          <path d="M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4"></path>
        </svg>
      </span>
      <span className="relative z-[1]"> to your turnover in the next 12 months..? </span>
      </Link>
      <div className="">
      </div>
      <br />
      <div> ​</div>

    </div>
  );
};
