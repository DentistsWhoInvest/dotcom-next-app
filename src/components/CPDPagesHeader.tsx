/* eslint-disable @next/next/no-img-element */
export default function CPDPagesHeader({ title }: { title: string }) {
  const isCongratulations = title === "Congratulations";

  return (
    <div className="flex h-[60px] items-center justify-center bg-gradient-to-r from-blue-primary to-blue-secondary text-white md:h-[120px]">
      {isCongratulations ? (
        <div className="flex items-center py-4">
          <img
            className="mr-6 size-16"
            src="/party-popper.png"
            alt="party-popper"
          />
          <div className="flex-col text-center">
            <p className="text-2xl font-semibold">Congratulations!</p>

            <p className="pt-2">You have successfully completed this CPD/CE</p>
          </div>
          <img
            className="ml-6 size-16 -scale-x-100"
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
