import { Button } from "./ui/button";
import Image from "next/image";

export default function PodcastMarketingForm() {
  return (
    <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-b from-blue-primary to-black text-white  md:h-[500px] md:flex-row xl:mx-[100px] xl:h-[570px] ">
      <Image
        src="https://www.dentistswhoinvest.com/wp-content/uploads/2022/10/7-Costly-and-Potentially-Disastrous-Mistakes-eBook-Mockup.png"
        alt="checklist"
        width={1024}
        height={1340}
        className="mt-4 h-[380px] w-[280px] self-center md:h-[338px] md:w-[258px] lg:h-[492px] lg:w-[376px] xl:h-[544px] xl:w-[416px]"
      />

      <section className="mt-[-20px] space-y-2 px-[30px] py-[50px] md:ml-8 md:w-1/2">
        <div className="text-center text-xl font-bold lg:text-2xl xl:text-4xl">
          Never Miss A Dentists Who Invest Podcast Episode Again And Also
          Receive A Free Report On Investing​
        </div>
        <form action="" method="post">
          <div id="form" className="flex flex-col space-y-4">
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
              className="m-4 text-wrap rounded-sm bg-blue-primary px-6 py-4 text-center text-xl"
            />
          </div>
        </form>
        <p className="pt-4 text-center text-xs md:text-left lg:text-base">
          BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST EMAIL
          LIST. THIS LIST CAN BE LEFT AT ANY TIME.
        </p>
      </section>
    </div>
  );
}
