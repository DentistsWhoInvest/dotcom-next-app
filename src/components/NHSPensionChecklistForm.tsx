import { Button } from "./ui/button";

export default function NHSPensionChecklistForm() {
  return (
    <div className="bg-orange-400 text-white flex flex-col justify-center m-4 p-4">
      <div className="text-center font-bold text-xl">
        Have you got your NHS Pension checklist yet?
      </div>
      <div>
        <p>First Name</p>
        <input
          type="text"
          placeholder="Type your first name"
          className="text-black w-full rounded-sm p-1"
        />
        <p>Email*</p>
        <input
          type="email"
          placeholder="Type your email"
          className="text-black w-full rounded-sm p-1"
        />
      </div>
      <Button className="bg-blue-secondary text-center m-4 ">
        SUBMIT & DOWNLOAD
      </Button>
      <div className="text-xs">
        Enter your details above to receive a link you can use to download your
        FREE checklist
      </div>
      
    </div>
  );
}
