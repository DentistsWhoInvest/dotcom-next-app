import Link from "next/link";
import Image from "next/image";

export default function PodcastReport() {
  return (
    <main
      className={`w-full h-full md:h-screen bg-gradient-to-b from-blue-secondary to-blue-primary `}
    >
      <section className="md:p-[20px] p-[40px] text-white size-full flex flex-col md:flex-row content-center place-content-center items-center justify-items-center xl:max-w-[1140px] xl:mx-auto">
        <Image
          src="https://www.dentistswhoinvest.com/wp-content/uploads/2022/10/7-Costly-and-Potentially-Disastrous-Mistakes-eBook-Mockup.png"
          alt="7-costly-mistakes"
          width={1024}
          height={1340}
          className="size-full rounded-xl object-cover max-h-[800px] max-w-[600px] md:max-h-[533px] md:max-w-[399px] lg:max-w-1/2 lg:w-1/2 lg:mr-[50px]"
        />

        <div className="space-y-2 md:ml-8 md:w-1/2">
          <div className="text-center">
            <p className="font-bold lg:text-[30px] lg:leading-[42px] md:text-xl text-[25px] leading-[29px]">
              Never Miss A Dentists Who Invest Podcast Episode Again And Also
              Receive A Free Report On Investing
            </p>
            <p className="lg:text-[20px] lg:leading-[28px] lg:block md:hidden text-[18px] leading-[25px]">
              Type your details below to download your FREE report
            </p>
          </div>
          <form action="" method="post">
            <div id="form" className="flex flex-col space-y-4">
              <p>TODO get actual form</p>
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
            BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST
            EMAIL LIST. THIS LIST CAN BE LEFT AT ANY TIME.
          </p>
        </div>
      </section>
    </main>
  );
}
