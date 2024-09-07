import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps = async () => {
  const resulting = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/blogs`); // e.g. http://localhost:1337/api

  const result = await resulting.json();
  console.log("result", result);

  return {
    props: {
      result: result.data,
    },
  };
};

export default function Home({ result }: { result: any[] }) {
  return (
    <main>
      <div>
        <Header />

        <h1>Blog Post Links:</h1>
        <div>
          {result.map((result) => {
            return (
              <div key={result.id}>
                <Link href={`/blog/${result.id}`}>
                  <Image
                    src={`${result.attributes.imageUrl}`}
                    alt="blog-post"
                    priority={true}
                    className="rounded-full"
                    width={300}
                    height={300}
                  />
                  <h2>{result.attributes.title}</h2>
                  <div>
                    <p>{result.attributes.description}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}