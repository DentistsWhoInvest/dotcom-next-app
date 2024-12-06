export const FrontSectionTitle = ({ title }: { title: string }) => {
  switch (title) {
    case "Latest Contents":
      return (
        <div className="flex w-full items-center justify-between pb-[50px]">
          <h2 className="whitespace-nowrap text-xl font-semibold text-white">
            {title}
          </h2>
          <div className="ml-4 h-[0.5px] max-w-[66%] grow bg-white"></div>
        </div>
      );

    default:
      return (
        <div className="flex w-full items-center justify-between pb-[50px]">
          <h2 className="whitespace-nowrap text-xl font-semibold text-blue-primary">
            {title}
          </h2>
          <div className="ml-4 h-[0.5px] max-w-[66%] grow bg-blue-primary"></div>
        </div>
      );
  }
};
