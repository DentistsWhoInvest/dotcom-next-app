import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/about");
  // console.log('pageData', pageData)

  const testResult = [
    {
      id: 1,
      attributes: {
        title: "The Core Mission...",
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
        description1:
          "By directing this content to suit the requirements of the dental profession, James helps dentists understand and take charge of their finances.",
        description2:
          "This means they are equipped to consistently grow their capital by opening up another revenue stream besides their own income. This permits them to protect their wealth and achieve financial freedom.",
        description3:
          "To provide his network with reliable and factual and tailored knowledge, James has created an expansive library of content and also courses specifically for the dental community.",
        imageUrl: "https://picsum.photos/200/300",
      },
    },
  ];

  return {
    props: {
      result: testResult,
      pageData: pageData.data,
    },
  };
};

export default function ErrorPage({
  result,
  pageData,
}: {
  result: any[];
  pageData: any;
}) {
  console.log("Reached a 404");
  return (
    <main className={`flex flex-col `}>
      <Header />

      <div>404</div>

      <Footer />
    </main>
  );
}
