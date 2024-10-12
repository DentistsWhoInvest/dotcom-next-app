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
  courses: {data: Course[]};
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
    <li className="m-5 flex h-[528px] flex-col justify-center rounded-[30px] border border-solid bg-white p-5 shadow-custom md:h-[498] ">
      <div className="bg-blue-primary p-4 text-center font-bold text-white">
        <h2 className="text-xl">{course.attributes.tagline}</h2>
      </div>
      <div className="relative">
        <Image
          src={course.attributes.on_the_day_photo.data.attributes.url}
          alt={course.attributes.title}
          width={300}
          height={200}
          className="h-[200px] w-full object-cover"
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
        />{" "}
        <p className="my-5 text-[20px] font-medium leading-5 text-blue-primary">
          {course.attributes.description}
        </p>
        <Button className="rounded-sm bg-orange-400 px-[36px] py-6 text-white hover:bg-orange-500">
          <Link href={course.attributes.navigation_url}>Learn More</Link>
        </Button>
      </div>
    </li>
  );
};

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/courses-page", ['courses, hero_image', 'courses.cover, courses.on_the_day_photo']);
  return {
    props: { pageData: result.data.attributes },
  };
};

export default function Courses({ pageData }: { pageData: CoursePageData }) {
  return (
    <main className="flex flex-col bg-[#f0f3f6] ">
      <HeroBanner bannerImage={pageData.hero_image.data.attributes} bannerText={pageData.title} subText={pageData.subtext}/>
      <ul className="m-2 grid grid-cols-1 gap-4 space-y-4 md:grid-cols-2 md:space-y-5">
        {pageData.courses.data.map((course: any) => {
          return <CourseCard key={course.id} course={course} />;
        })}
      </ul>
      <HundredKButton />
    </main>
  );
}
