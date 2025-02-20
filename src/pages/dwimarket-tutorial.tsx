import Link from "next/link";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface StoreTutorialProps {
  tutorialCopy: any;
  ctaCopy: string;
  video: any;
  ctaNavigationUrl: string;
}

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/page-store-tutorial");
  return {
    props: {
      tutorialCopy: pageData.data.attributes.tutorial_copy,
      ctaCopy: pageData.data.attributes.cta_copy,
      video: pageData.data.attributes.video,
      ctaNavigationUrl: pageData.data.attributes.cta_navigation_url
    },
  };
};

export default function StoreTutorial({ tutorialCopy, ctaCopy, video, ctaNavigationUrl }: StoreTutorialProps) {
  return (
    <main className="w-screen h-screen bg-gradient-to-b from-blue-secondary to-blue-primary flex items-center justify-center">
      <section className="p-[20px] text-center text-white max-w-[1140px]">
        {/* Dynamic Intro Copy */}
        <p className="font-bold md:text-[45px] md:leading-[54px] pb-[20px] text-[31px] leading-[43.4px]">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">{tutorialCopy[0].children[0].text}</h1>
        </p>

        {/* Video Player if Available */}
        {video && (
          <video controls className="w-full max-w-5xl mx-auto mb-6" poster="https://assets.dentistswhoinvest.com/manually_managed_assets/tutorial-poster.webp">
            <source src="https://assets.dentistswhoinvest.com/manually_managed_assets/store_tutorial.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        )}

        {/* CTA Button */}
        <Link href={ctaNavigationUrl} passHref>
          <button className="bg-orange-400 py-[15px] px-[30px] text-[25px] md:text-[45px] text-white">
            {ctaCopy}
          </button>
        </Link>
      </section>
    </main>
  );
}
