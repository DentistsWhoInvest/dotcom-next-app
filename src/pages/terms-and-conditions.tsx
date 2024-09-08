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
        title: "Terms and conditions",
        description:
          "Lorem ipsum...",
      },
    },
  ];

  return {
    props: {
      result: testResult,
    },
  };
};

export default function TermsAndConditions({ result }: { result: any[] }) {
  return (
    <main
      className={`flex flex-col`}
    >
      <Header />
      <div>
        <div>
          {result[0].attributes.title}
          {result[0].attributes.description}
        </div>
      </div>
      <Footer />
    </main>
  );
}
