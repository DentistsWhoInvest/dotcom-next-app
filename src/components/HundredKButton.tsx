import Link from "next/link";

export const HundredKButton = () => {
  return (
    <div className="m-4 rounded-lg border-2 border-solid bg-white shadow-xl transition-all duration-300 hover:bg-orange-400">
      <Link
        href={"/100k"}
        className="flex text-wrap p-4 text-center text-xl font-semibold text-blue-primary  "
      >
        Psssssst – Principal dentists: want to add £100k to your turnover in the
        next 12 months..? ​
      </Link>
    </div>
  );
};
