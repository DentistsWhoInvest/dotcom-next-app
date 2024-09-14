import DWIBanner from "@/components/DWIBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  console.log("Reached a 404");
  return (
    <main className={`flex flex-col `}>
      <DWIBanner />
      <Header />
      <div className="bg-blue-primary text-white flex flex-col h-screen text-center justify-center ">
        <span className="text-5xl font-bold my-6">Oops! This page can&apos;t be found </span>
        <span>The content you&apos;re looking for may have moved</span>

        <Link
          href="/"
          className="border-white border-solid border-2 hover:text-blue-primary hover:bg-white transition-all duration-300
        max-w-xs mx-auto p-4 text-center bg-blue-800 m-4 ">
          <Button className="text-xl">Back To Home Page</Button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
