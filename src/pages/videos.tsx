import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/videos");
  return {
    props: { pageData: result.data },
  };
};

export default function Videos({ pageData }: { pageData: any }) {
  return (
    <main className={`flex flex-col`}>
      <Header />
      <ul>
        {pageData.map((page: any) => {
          return (
            <li key={page.id}>
              <h1>Episode {page.id}</h1>
              <Link href={`/videos/${page.id}`}>
                {page.attributes.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Footer />
    </main>
  );
}

