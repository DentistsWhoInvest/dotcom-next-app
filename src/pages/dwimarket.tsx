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
  console.log(`pageData: \n`, pageData);
  console.log(`introCopy: \n`, pageData.data.attributes.intro_copy);
  console.log(`introCopy 0 children: \n`, pageData.data.attributes.intro_copy[0].children);
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
      <main
        className={`w-screen h-screen bg-gradient-to-b from-blue-secondary to-blue-primary `}
      >
        <section className="p-[20px] size-full flex flex-col content-center place-content-center items-center justify-items-center xl:max-w-[1440px] xl:mx-auto">
          <div className="text-center  text-white">
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>{introCopy[0].children[0].text}</h1>
            <h2 style={{ fontSize: '3rem' }}>{introCopy[1].children[0].text}</h2>
            <p style={{ fontSize: '1.5rem', marginTop: '20px', marginBottom: '20px' }}>{introCopy[2].children[0].text}</p>
          </div>
          
          {/* Video Player if Available */}
          {introVideo && (
            <video controls className="w-full max-w-2xl mx-auto mb-6">
              <source src={introVideo.data.attributes.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <Link href={"dwimarket-tutorial"} passHref>
            <button className="bg-orange-400 py-[15px] px-[30px] text-[25px] md:text-[45px] text-white">
              {ctaCopy}
            </button>
          </Link>
        </section>
      </main>
    );
}
