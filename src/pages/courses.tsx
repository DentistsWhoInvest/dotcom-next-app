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
    <li className="flex flex-col justify-center rounded-sm border-2 border-solid bg-white p-4 shadow-md">
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
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
        </div>
      </div>
      <div className="flex flex-col items-center p-4 pt-8">
        <Image
          src={course.attributes.cover.data.attributes.url}
          alt={course.attributes.title}
          width={180}
          height={440}
        />{" "}
        <p className="mb-4 text-sm text-blue-primary">
          {course.attributes.description}
        </p>
        <Button className="rounded-md bg-orange-400 px-6 py-4 font-bold text-white hover:bg-orange-500">
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
      <ul className="m-4 space-y-4">
        {pageData.courses.data.map((course: any) => {
          return <CourseCard key={course.id} course={course} />;
        })}
      </ul>
      <HundredKButton />
    </main>
  );
}
