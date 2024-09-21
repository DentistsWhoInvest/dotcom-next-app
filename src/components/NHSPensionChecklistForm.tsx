import { Button } from "./ui/button";

export default function NHSPensionChecklistForm() {
  return (
    <div className="m-4 flex flex-col justify-center bg-orange-400 p-4 text-white">
      <div className="text-center text-xl font-bold">
        Have you got your NHS Pension checklist yet?
      </div>
      <div>
        <p>First Name</p>
        <input
          type="text"
          placeholder="Type your first name"
          className="w-full rounded-sm p-1 text-black"
        />
        <p>Email*</p>
        <input
          type="email"
          placeholder="Type your email"
          className="w-full rounded-sm p-1 text-black"
        />
      </div>
      <Button className="m-4 bg-blue-secondary text-center ">
        SUBMIT & DOWNLOAD
      </Button>
      <div className="text-xs">
        Enter your details above to receive a link you can use to download your
        FREE checklist
      </div>
      
    </div>
  );
}
