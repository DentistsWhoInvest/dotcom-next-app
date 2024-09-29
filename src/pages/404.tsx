import DWIBanner from "@/components/DWIBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className={`flex flex-col `}>
      <DWIBanner />
      <Header />
      <div className="flex h-screen flex-col justify-center bg-blue-primary text-center text-white ">
        <span className="my-6 text-5xl font-bold">Oops! This page can&apos;t be found </span>
        <span>The content you&apos;re looking for may have moved</span>

        <Link
          href="/"
          className="m-4 mx-auto max-w-xs border-2 border-solid border-white bg-blue-primary
        p-4 text-center transition-all duration-300 hover:bg-white hover:text-blue-primary ">
          <Button className="text-xl">Back To Home Page</Button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}
