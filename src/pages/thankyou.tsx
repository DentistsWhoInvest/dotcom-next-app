import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

export default function PodcastReport() {
  return (
    <main
      className={`size-full h-screen bg-gradient-to-b from-blue-secondary to-blue-primary `}
    >
      <section className="flex size-full flex-col place-content-center content-center items-center justify-items-center p-[40px] text-center text-white md:p-[20px] xl:mx-auto xl:max-w-[1140px]">
        <p className="pb-5 text-[45px] font-bold leading-[54px]">THANK YOU!</p>
        <p className="text-[29px] leading-[40.6px]">
          Your checklist will be sent to your email inbox within the next 5
          minutes (please check your promotional or spam folder too).
        </p>
      </section>
    </main>
  );
}
