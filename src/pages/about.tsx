import Image from "next/image";
import { fetchEndpointData } from "@/lib/fetchUtils";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/about");

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

export default function About({
  result,
  pageData,
}: {
  result: any[];
  pageData: any;
}) {
  return (
    <main className={`flex flex-col `}>
      <div className="relative ">
        <Image
          className="h-[440px] w-[320px] object-cover "
          src={
            "https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
          }
          alt={"Hero banner"}
          width={"320"}
          height={"440"}
        />

        <div className="absolute left-0 top-0 z-10 flex size-full flex-col items-center justify-center p-16">
          <span className="p-4 text-3xl font-bold text-white">
            {pageData.attributes.hero_title}
          </span>
          <span className="p-2 text-xl text-blue-light">
            {pageData.attributes.hero_subtext}
          </span>
        </div>
      </div>

      <div className="flex size-full flex-col items-center justify-center p-8 text-center">
        <p className="text-2xl font-bold text-blue-primary">
          {result[1].attributes.title}
        </p>
        <span className="m-4 h-0.5 w-full bg-blue-primary" />
        <ul className="p-4">
          <li>
            <p className="text-2xl text-blue-secondary">01</p>
            <p className="text-left text-xl text-grey-primary">
              {result[1].attributes.text1}
            </p>
          </li>
          <li>
            <p className="text-2xl text-blue-secondary">02</p>
            <p className="text-left text-xl text-grey-primary">
              {result[1].attributes.text2}
            </p>
          </li>
          <li>
            <p className="text-2xl text-blue-secondary">03</p>
            <p className="text-left text-xl text-grey-primary">
              {result[1].attributes.text3}
            </p>
          </li>
        </ul>
      </div>

      <div className="relative">
        <Image
          className="h-[533.58px] w-[320px] object-cover "
          src={
            "https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
          }
          alt={"Hero banner"}
          width={"320"}
          height={"534"}
        />

        <div className="absolute left-0 top-0 z-10 flex size-full flex-col items-center p-10 text-white">
          <p className="p-4 text-3xl font-bold">{result[2].attributes.title}</p>
          <p>{result[2].attributes.description1}</p>
          <p>{result[2].attributes.description2}</p>
        </div>

        <div className="flex size-full flex-col items-center justify-center space-y-2 p-8 text-left">
          <Image
            className="m-4 h-[364px] w-[280px] rounded-3xl object-cover"
            width={280}
            height={364}
            src={
              "https://storage.googleapis.com/dwi-dotcom-assets/wrap_up_founder_62d6e45255/wrap_up_founder_62d6e45255.webp"
            }
            alt={"guy"}
          />
          <p>{result[3].attributes.description1}</p>
          <p>{result[3].attributes.description2}</p>
          <p>{result[3].attributes.description3}</p>
        </div>
      </div>
    </main>
  );
}
