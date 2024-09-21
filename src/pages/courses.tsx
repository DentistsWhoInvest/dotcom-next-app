import { fetchEndpointData } from "@/lib/fetchUtils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const getStaticProps = async () => {
  const result = await fetchEndpointData("/courses");
  return {
    props: { pageData: result.data },
  };
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
    <li className="flex max-w-[300px] flex-col justify-center rounded-sm border-2 border-solid bg-white p-4 shadow-md">
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
        <Button
          asChild
          className="w-full rounded-md bg-orange-400 py-2 font-bold text-white hover:bg-orange-500"
        >
          <Link href={course.attributes.navigation_url}>Learn More</Link>
        </Button>
      </div>
    </li>
  );
};

export default function Courses({ pageData }: { pageData: any }) {
  return (
    <main className="flex flex-col bg-[#f0f3f6] ">
      <div className="relative">
        <Image
          className="object-cover"
          src={
            "https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
          }
          alt={"Hero banner"}
          width={"375"}
          height={"440"}
        />

        <div className="absolute left-0 top-0 z-10 flex h-full flex-col justify-center p-16">
          <span className="p-4 text-3xl font-bold text-white">Courses </span>
          <span className="p-2 text-xl text-blue-light">
            Complete courses for the dentist who wants to understand investing{" "}
          </span>
        </div>
      </div>

      <ul className="flex flex-col justify-center space-y-8 p-4">
        {pageData.map((course: any) => {
          return <CourseCard key={course.attributes.id} course={course} />;
        })}
      </ul>
      <div className="m-4 rounded-md border-2 border-solid bg-white shadow-md">
        <Link
          href={"/100k"}
          className="text:md flex text-wrap p-4 text-center text-blue-primary hover:text-orange-400"
        >
          Psssssst – Principal dentists: want to add £100k to your turnover in
          the next 12 months..? ​
        </Link>
      </div>
    </main>
  );
}
