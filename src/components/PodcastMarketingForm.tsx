import { Button } from "./ui/button";

export default function PodcastMarketingForm() {
  return (
    <div className="bg-blue-primary text-white flex flex-col justify-center m-4 p-4">
      <div className="text-center font-bold text-xl">
        Never Miss A Dentists Who Invest Podcast Episode Again And Also Receive
        A Free Report On Investing​
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
        BY SUBMITTING MY EMAIL I CONSENT TO JOIN THE DENTISTS WHO INVEST EMAIL
        LIST. THIS LIST CAN BE LEFT AT ANY TIME.
      </div>
    </div>
  );
}
