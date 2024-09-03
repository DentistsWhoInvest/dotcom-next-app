import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

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

export default function Videos({ result }: { result: any[] }) {
  return (
    <main
      className={`flex flex-col`}
    >
      <Header />
      <div>Links to all videos</div>
      <Footer />
    </main>
  );
}
