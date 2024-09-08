import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { signJwt } from "@/lib/signJwt";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/page-informed-investors-club");

  return {
    props: {
      pageData: pageData.data,
    },
  };
};

export default function InformedInvestorsLandingPage({ pageData }: { pageData: any }) {
    console.log('pageData', pageData);
  return (
    <main className={`flex flex-col`}>
      <Header />
      <div>
        {pageData.attributes.hero_title}
        {pageData.attributes.sales_title}
        {pageData.attributes.sales_subtext}
      </div>
      <Footer />
    </main>
  );
}
