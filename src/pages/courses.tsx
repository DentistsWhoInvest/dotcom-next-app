import { fetchEndpointData } from "@/lib/fetchUtils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HundredKButton } from "@/components/HundredKButton";
import { HeroBanner } from "@/components/HeroBanner";

type CoursePageData = {
  title: string;
  subtext: string;
  hero_image: {
    data: {
      attributes: {
        url: string;
        alt: string;
      };
    };
  };
  courses: { data: Course[] };
};

interface Course {
  attributes: {
    title: string;
    tagline: string;
    description: string;
    navigation_url: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    on_the_day_photo: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <li className="my-4 flex h-[528px] flex-col justify-center rounded-[30px] border border-solid bg-white p-5 shadow-custom lg:h-[594px] lg:w-[422px] xl:h-[826px] xl:w-[570px] ">
      <div className="relative bg-blue-primary p-4 text-center font-bold text-white transition-all duration-300">
        <h2 className="text-xl xl:text-3xl">{course.attributes.tagline}</h2>

        <svg
          className="xl:pb-5 lg:py-3 absolute left-1/2 top-1/2 z-[2] lg:w-[calc(50%)] w-[calc(60%)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
        >
          <path
            d="M5,125.4c30.5-3.8,137.9-7.6,177.3-7.6c117.2,0,252.2,4.7,312.7,7.6"
            stroke-width="10px"
            fill="none"
            className="path-1 stroke-blue-secondary"
          ></path>
          <path
            d="M26.9,143.8c55.1-6.1,126-6.3,162.2-6.1c46.5,0.2,203.9,3.2,268.9,6.4"
            stroke-width="10px"
            fill="none"
            className="path-2 stroke-blue-secondary"
          ></path>
        </svg>
        <style jsx>{`
          @keyframes draw {
            0% {
              stroke-dasharray: 0, 2500; /* Start with no visible stroke */
              opacity: 0;
            }
            10% {
              stroke-dasharray: 0, 2500; /* Start with no visible stroke */
              opacity: 1;
            }
            20% {
              stroke-dasharray: 2500, 0; /* Complete visible stroke */
              opacity: 1;
            }
            80% {
              stroke-dasharray: 2500, 0; /* Keep the stroke */
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }

          .path-1 {
            animation: draw 8s forwards; /* Animate drawing and fading */
            animation-iteration-count: infinite;
          }

          .path-2 {
            animation: draw 8s forwards; /* Animate drawing and fading */
            animation-delay: 0.5s;
            animation-iteration-count: infinite;
          }
        `}</style>
      </div>
      <div className="relative">
        <Image
          src={course.attributes.on_the_day_photo.data.attributes.url}
          alt={course.attributes.title}
          width={300}
          height={200}
          className="h-[200px] w-full object-cover lg:h-[287px] xl:h-[353px]"
        />
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2">
          <Image
            src="/DWI-logo-circle.webp"
            alt="Course Logo"
            width={100}
            height={100}
            className="translate-y-8 rounded-full border-2 border-white"
          />
        </div>
      </div>
      <div className="flex flex-col items-center p-4 pb-5 pt-12">
        <Image
          src={course.attributes.cover.data.attributes.url}
          alt={course.attributes.title}
          width={255}
          height={100}
          className="xl:w-[455px]"
        />{" "}
        <p className="my-5 text-[20px]  font-medium leading-5 text-blue-primary">
          {course.attributes.description}
        </p>
        <Link href={course.attributes.navigation_url}>
          <Button className="rounded-sm bg-orange-400 px-[36px] py-6 text-white hover:bg-orange-500">
            Learn More
          </Button>
        </Link>
      </div>
    </li>
  );
};

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/courses-page", [
    "courses, hero_image",
    "courses.cover, courses.on_the_day_photo",
  ]);
  return {
    props: { pageData: result.data.attributes },
  };
};

export default function Courses({ pageData }: { pageData: CoursePageData }) {
  return (
    <main className="flex flex-col bg-[#f0f3f6] ">
      <HeroBanner
        bannerImage={pageData.hero_image.data.attributes}
        bannerText={pageData.title}
        subText={pageData.subtext}
      />
      <div className="md:mx-[50px] lg:mx-[150px]">
        <ul className="grid grid-cols-1 place-items-center justify-center gap-8 place-self-center md:grid-cols-2 lg:gap-40">
          {pageData.courses.data.map((course: any) => {
            return <CourseCard key={course.id} course={course} />;
          })}
        </ul>
      </div>
      <HundredKButton />
    </main>
  );
}
