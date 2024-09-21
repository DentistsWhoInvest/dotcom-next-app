import { Button } from "./ui/button";

export default function PodcastMarketingForm() {
  return (
    <div className="m-4 flex flex-col justify-center bg-blue-primary p-4 text-white">
      <div className="text-center text-xl font-bold">
        Never Miss A Dentists Who Invest Podcast Episode Again And Also Receive
        A Free Report On Investing​
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
        BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST EMAIL
        LIST. THIS LIST CAN BE LEFT AT ANY TIME.
      </div>
    </div>
  );
}
