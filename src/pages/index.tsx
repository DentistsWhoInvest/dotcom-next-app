import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";

import lottieProject from "../../public/animations/project.json";
import lottieRocket from "../../public/animations/rocket.json";
import lottieTreasure from "../../public/animations/treasure.json";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/home");
  console.log("pageData");
  console.log(JSON.stringify(pageData, null, 2));
  return {
    props: {
      pageData: pageData.data.attributes,
    },
  };
};

function replaceImageDomain(url: string): string {
  return url.replace("https://storage.googleapis.com/dwi-dotcom-assets", "https://assets.drjamesmartin.co.uk");
}

export default function Home({ pageData }: { pageData: any }) {
  return (
    <main>
      <div>
        <Image src={replaceImageDomain(pageData.hero_cover.data.attributes.formats.large.url)}
               alt={pageData.hero_cover.data.attributes.alternativeText}
               width={pageData.hero_cover.data.attributes.width}
               height={pageData.hero_cover.data.attributes.height} />
        <h2>{pageData.hero_text}</h2>
        <p>{pageData.hero_subtext}</p>
        <a href="https://us02web.zoom.us/meeting/register/tZIsde2orTwvHNW7CqRlCrXcrOgn2vO3xOlG" target="_blank" rel="noopener noreferrer">
          {pageData.hero_button_text}
        </a>
               
        <Image src={replaceImageDomain(pageData.founder_image.data.attributes.formats.large.url)}
                alt={pageData.founder_image.data.attributes.alternativeText}
                width={pageData.founder_image.data.attributes.width}
                height={pageData.founder_image.data.attributes.height} />
        <h3>{pageData.founder_text}</h3>
        <h6>{pageData.founder_subtext}</h6>
        <BlocksRenderer content={pageData.founder_description} />
        <Link href="/about">
          {pageData.founder_cta_text}
        </Link>

        <h2>{pageData.what_we_do_title}</h2>
        <div>
          {pageData.what_we_do_reasons.map((reason: any) => {
            let lottieVar;
            if (reason.lottie_name === "treasure") {
              lottieVar = lottieTreasure;
            } else if (reason.lottie_name === "project") {
              lottieVar = lottieProject;
            } else {
              lottieVar = lottieRocket;
            }
            return (
              <div key={reason.id}>
                {/* learn to choose correct import */}
                <Lottie animationData={lottieVar} loop={true} width="200" height="200" style={{ width: 200, height: 200 }}/> 
                <h3>{reason.title}</h3>
                <BlocksRenderer content={reason.description} />
                {/* todo: need a dynamic variable for the link here */}
                <Link href={`/about`}>
                  {reason.cta_text}
                </Link>
              </div>
            );
          })}
        </div>

        <h2>Here's Why The Right People Want To Continue Reading</h2>
        <div>
          {pageData.why_you_reasons.map((reason: any) => {
            return (
              <p key={reason.id}>{reason.reason}</p>
            )
          })}
        </div>
      </div>
    </main>
  );
}
