export default function CPDPagesHeader({ title }: { title: string }) {
  const isCongratulations = title === "Congratulations";

  return (
    <div className="flex h-[60px] items-center justify-center bg-gradient-to-r from-blue-primary to-blue-secondary text-white md:h-[100px]">
      {isCongratulations && (
        <img
          className="w-10 h-10 mr-4"
          src="https://static.vecteezy.com/system/resources/previews/006/600/009/non_2x/exploding-party-poppers-with-confetti-free-vector.jpg"
        />
      )}
      <div className="flex-col">
        <p className="text-xl font-semibold">{title}</p>
        {isCongratulations && (
          <p className="pt-2">You have successfully completed this CPD/CE</p>
        )}
      </div>
      {isCongratulations && (
        <img
          className="w-10 h-10 ml-4"
          src="https://static.vecteezy.com/system/resources/previews/006/600/009/non_2x/exploding-party-poppers-with-confetti-free-vector.jpg"
        />
      )}
    </div>
  );
}
