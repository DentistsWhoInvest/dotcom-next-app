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
    <li className="bg-white rounded-sm border-solid border-2 shadow-md flex flex-col justify-center p-4 max-w-[300px]">
      <div className="bg-blue-primary text-white p-4 text-center font-bold">
        <h2 className="text-xl">{course.attributes.tagline}</h2>
      </div>
      <div className="relative">
        <Image
          src={course.attributes.on_the_day_photo.data.attributes.url}
          alt={course.attributes.title}
          width={300}
          height={200}
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
          <Image
            src="/DWI-logo-circle.webp"
            alt="Course Logo"
            width={40}
            height={40}
            className="rounded-full border-2 border-white"
          />
        </div>
      </div>
      <div className="p-4 pt-8 items-center flex flex-col">
        <Image
          src={course.attributes.cover.data.attributes.url}
          alt={course.attributes.title}
          width={180}
          height={440}
        />{" "}
        <p className="text-blue-primary text-sm mb-4">
          {course.attributes.description}
        </p>
        <Button
          asChild
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 rounded-md"
        >
          <Link href={course.attributes.navigation_url}>Learn More</Link>
        </Button>
      </div>
    </li>
  );
};
// const CourseCard = ({ course }: { course: any }) => {
//   console.log("course", course.attributes.cover);
//   return (
//     <li className="bg-white rounded-sm border-solid border-2 shadow-md flex flex-col justify-center p-4">
//       <p className="bg-blue-primary text-white font-bold text-center">
//         {course.attributes.tagline}
//         <br /> animation
//       </p>
//       <Image
//         src={course.attributes.on_the_day_photo.data.attributes.url}
//         alt={course.attributes.title}
//         width={320}
//         height={440}
//       />

//       <Image
//         src="/DWI-logo-circle.webp"
//         alt="Coruse Created By Dr. James Martin"
//         width={320}
//         height={440}
//       ></Image>
//       <Image
//         src={course.attributes.cover.data.attributes.url}
//         alt={course.attributes.title}
//         width={320}
//         height={440}
//       />
//       <p className="text-blue-primary text-center text-xs">
//         {course.attributes.description}
//       </p>
//       <Button className="bg-orange-400 text-white font-bold hover:text-blue-primary rounded-md px-4 py-3 m-2">
//         <Link href={`${course.attributes.navigation_url}`}>Learn More</Link>
//       </Button>
//     </li>
//   );
// };

export default function Courses({ pageData }: { pageData: any }) {
  console.log("page", pageData);
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

        <div className="absolute top-0 left-0 h-full flex items-left justify-center z-10 flex-col p-16">
          <span className="text-white text-3xl font-bold p-4">Courses </span>
          <span className="text-blue-light text-xl p-2">
            Complete courses for the dentist who wants to understand investing{" "}
          </span>
        </div>
      </div>

      <ul className="flex space-y-8 justify-center p-4 flex-col">
        {pageData.map((course: any) => {
          return <CourseCard key={course.attributes.id} course={course} />;
        })}
      </ul>
      <div className="shadow-md border-solid border-2 rounded-md m-4 bg-white">
        <Link
          href={"/100k"}
          className="text-blue-primary hover:text-orange-400 text-md text-wrap text-center flex p-4"
        >
          Psssssst – Principal dentists: want to add £100k to your turnover in
          the next 12 months..? ​
        </Link>
      </div>
    </main>
  );
}
