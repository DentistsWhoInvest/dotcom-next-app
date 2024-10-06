export default function NHSPensionChecklistForm() {
  return (
    <section className="m-4 mt-[-20px]  space-y-1 bg-orange-400 p-[20px] text-white md:ml-8 md:w-1/2">
      <div className="mb-4 text-center text-2xl font-bold xl:text-4xl">
        Have you got your NHS Pension checklist yet?
      </div>
      <form action="" method="post">
        <div id="form" className="space-y-4">
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
            className="rounded-sm bg-blue-secondary px-4 py-2 text-center "
          />
        </div>
      </form>
      <p className="pt-4 text-xs md:text-left lg:text-base">
        Enter your details above to receive a link you can use to download your
        FREE checklist
      </p>
    </section>
  );
}
