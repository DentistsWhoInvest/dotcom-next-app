import Link from "next/link";
import { fetchEndpointData } from "@/lib/fetchUtils";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";


interface StoreIntroProps {
  introCopy: any;
  ctaCopy: string;
  introVideo: any;
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
      <main className={`w-screen min-h-screen bg-gradient-to-b from-blue-secondary to-blue-primary flex flex-col justify-center`}>
        <section className="p-[20px] size-full flex flex-col content-center place-content-center items-center justify-items-center xl:max-w-[900px] xl:mx-auto">
          <div className="text-center  text-white">
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold">{introCopy[0].children[0].text}</h1>
            <h2 className="text-2xl md:text-3xl " style={{ marginTop: '20px', marginBottom: '20px' }}>{introCopy[1].children[0].text}</h2>
            <p className="text-lg md:text-xl mt-5 mb-5" style={{ marginTop: '20px', marginBottom: '20px' }}>{introCopy[2].children[0].text}</p>
          </div>
          
          {/* Video Player if Available */}
          {introVideo && (
            <video controls className="w-full max-w-3xl mx-auto mb-8" poster="https://assets.dentistswhoinvest.com/manually_managed_assets/intro-poster.webp">
              <source src={introVideo.data.attributes.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <Link href={"dwimarket-tutorial"} passHref>
            <button className="bg-orange-400 py-[8px] px-[30px] text-[25px] md:text-[35px] text-white">
              {ctaCopy}
            </button>
          </Link>
        </section>
      </main>
    );
}
