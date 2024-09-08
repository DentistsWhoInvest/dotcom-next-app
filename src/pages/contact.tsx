import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {

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

export default function About({ result }: { result: any[] }) {
  return (
    <main className={`flex flex-col`}>
      <Header />
      <div>contact info</div>
      <div>FAQ</div>
      <Footer />
    </main>
  );
}
