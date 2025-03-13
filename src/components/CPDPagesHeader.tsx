/* eslint-disable @next/next/no-img-element */
export default function CPDPagesHeader({ title }: { title: string }) {
  const isCongratulations = title === "Congratulations";

  return (
    <div className="flex h-[100px] items-center justify-center bg-gradient-to-r from-blue-primary to-blue-secondary text-white ">
      {isCongratulations ? (
        <div className="mx-3 flex items-center py-4">
          <img
            className="size-10 md:mr-6 md:size-16"
            src="/party-popper.png"
            alt="party-popper"
          />
          <div className="flex-col text-center">
            <p className="text-xl font-semibold md:text-2xl">Congratulations!</p>

            <p className="pt-2 text-xs">You have successfully completed this CPD/CE</p>
          </div>
          <img
            className="size-10 -scale-x-100 md:ml-6 md:size-16"
            src="/party-popper.png"
            alt="party-popper"
          />
        </div>
      ) : (
        <p className="text-xl font-semibold">{title}</p>
      )}
    </div>
  );
}
