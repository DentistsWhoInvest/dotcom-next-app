import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Link from "next/link";

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/podcasts");
  return {
    props: { pageData: result.data },
  };
};

export default function Podcasts({ pageData }: { pageData: any }) {
  return (
    <main className={`flex flex-col`}>
      <Header />
      <ul>
        {pageData.map((page: any) => {
          return (
            <li key={page.id}>
              <h1>Episode {page.id}</h1>
              <Link href={`/podcasts/e${page.id}`}>
                {page.attributes.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <Footer />
    </main>
  );
}
