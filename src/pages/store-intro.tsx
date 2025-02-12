import Link from "next/link";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface StoreIntroProps {
  introCopy: string;
  ctaCopy: string;
  introVideo: string;
}

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/page-store-intro");
  return {
    props: {
      introCopy: pageData.data.attributes.intro_copy,
      ctaCopy: pageData.data.attributes.cta_copy,
      introVideo: pageData.data.attributes.intro_video
    },
  };
};

export default function StoreIntro({ introCopy, ctaCopy, introVideo }: StoreIntroProps) {
  return (
    <main className="w-screen h-screen bg-gradient-to-b from-blue-secondary to-blue-primary flex items-center justify-center">
      <section className="p-[20px] text-center text-white max-w-[1140px]">
        {/* Dynamic Intro Copy */}
        <p className="font-bold md:text-[45px] md:leading-[54px] pb-[20px] text-[31px] leading-[43.4px]">
          <BlocksRenderer content={introCopy} />
        </p>

        {/* Video Player if Available */}
        {introVideo && (
          <video controls className="w-full max-w-2xl mx-auto mb-6">
            <source src={introVideo.data.attributes.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* CTA Button */}
        <Link href={"store-tutorial"} passHref>
          <button className="bg-orange-400 py-[15px] px-[30px] text-[25px] md:text-[45px] text-white">
            {ctaCopy}
          </button>
        </Link>
      </section>
    </main>
  );
}
