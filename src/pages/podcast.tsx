import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps = async () => {
  // const endpoint = `${process.env.NEXT_PUBLIC_STRAPI_URL}`;

  // const headers = {
  //     "Authorization": `Bearer ${process.env.API_KEY}`,
  //     "Content-Type": "application/json",
  // };

  // const resulting = await fetch(endpoint, { method: "GET", headers });

  //   const resulting = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`); // e.g. http://localhost:1337/api

  //   const result = await resulting.json();

  const testResult = [
    {
      id: 1,
      attributes: {
        title: "Core mission",
        description:
          "...to create and share resources specifically designed to give dentists financial freedom",
      },
    },
  ];

  return {
    props: {
      result: testResult,
    },
  };
};

export default function Podcast({ result }: { result: any[] }) {
  return (
    <main
      //   className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      className={`flex flex-col ${inter.className}`}
    >
      <Header />
      <div>Paginated pages linking to all podcasts</div>
      <Footer />
    </main>
  );
}
