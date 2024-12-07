export const FrontSectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="mb-6 flex w-full items-center justify-between bg-blue-primary p-2 shadow-custom lg:bg-transparent lg:shadow-none">
      <h2
        className={`mx-3 lg:mx-0 whitespace-nowrap text-lg lg:text-xl lg:font-semibold ${
          title === "Latest Contents"
            ? "text-white"
            : "text-white lg:text-blue-primary"
        }`}
      >
        {title}
      </h2>
      <div
        className={`ml-4 hidden h-[0.5px] max-w-[66%] grow lg:block ${
          title === "Latest Contents" ? " md:bg-white" : "bg-blue-primary"
        }`}
      ></div>
    </div>
  );
};
