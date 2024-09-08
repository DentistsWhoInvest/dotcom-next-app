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
    {
      id: 2,
      attributes: {
        title: "Manifesto",
        text1:
          "Empower dentists to take charge of their financial future in an ethical and principled way.​",
        text2:
          "Give dentists the knowledge and tools required to no longer exchange time for money.​",
        text3:
          "Provide dentists with a platform and community which contains everything required to support growth both financially and on an individual and holistic basis​",
      },
    },
    {
      id: 3,
      attributes: {
        title: "Our story",
        description1:
          "Founded in 2020 by dentist and investor Dr. James Martin, Dentists Who Invest is a thriving community of dentists who have a keen interest in growing and sharing their knowledge on finance and wealth.",
        description2:
          "Through the Dentists Who Invest platform, James makes his broad knowledge of investing easy to understand, tangible and accessible by serving this community with an expansive repertoire of resources.",
      },
    },
    {
      id: 4,
      attributes: {
        title: "Man",
        description:
          "By directing this content to suit the requirements of the dental profession, James helps dentists understand and take charge of their finances. This means they are equipped to consistently grow their capital by opening up another revenue stream besides their own income. This permits them to protect their wealth and achieve financial freedom. To provide his network with reliable and factual and tailored knowledge, James has created an expansive library of content and also courses specifically for the dental community.",
        imageUrl:
          "https://picsum.photos/200/300",
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
        <p>{result[1].attributes.title}</p>
        <ul>
          <li>{result[1].attributes.text1}</li>
          <li>{result[1].attributes.text2}</li>
          <li>{result[1].attributes.text3}</li>
        </ul>
        <div>{result[2].attributes.title}</div>
        <div>{result[2].attributes.description1}</div>
        <div>{result[2].attributes.description2}</div>
        <Image width={50} height={50} src={result[3].attributes.imageUrl} alt={"guy"} />
        <div>{result[3].attributes.description}</div>
      </div>
      <Footer />
    </main>
  );
}
