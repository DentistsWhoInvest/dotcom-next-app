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
    </main>
  );
}
