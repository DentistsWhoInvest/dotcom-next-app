import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { signJwt } from "@/lib/signJwt";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/privacy-policy");

  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function PrivacyPolicy({ pageData }: { pageData: any }) {
  return (
    <main className={`flex flex-col`}>
      <Header />
      <div>
        {pageData.attributes.policy.map(
          (policy: { children: { text: any }[] }) => {
            return policy.children[0].text;
          }
        )}
      </div>
      <Footer />
    </main>
  );
}
