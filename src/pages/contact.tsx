import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/contact-page");
  return {
    props: {
      pageData: pageData.data,
    },
  };
};

// <>
//       <Card className="m-6 justify-center border-2 border-blue-secondary">
//         <Link href={`/videos/${slug}`}>
//           <Image
//             src="https://picsum.photos/200/150"
//             alt={page.attributes.name}
//             width={200}
//             height={200}
//             className="w-full rounded-t-md object-cover"
//           />
//         </Link>
//         <CardContent className="p-2 text-center">
//           <CardTitle className="p-2 text-blue-primary">
//             <Link href={`/videos/${slug}`}>{page.attributes.name}</Link>
//           </CardTitle>
//           <CardDescription className="p-2 text-grey-primary">
//             {page.attributes.description}
//           </CardDescription>
//         </CardContent>
//         <CardFooter className="justify-center">
//           <Link
//             className={"text-xs font-semibold text-blue-secondary"}
//             href={`/videos/${slug}`}
//           >
//             WATCH HERE
//           </Link>
//         </CardFooter>
//       </Card>
//     </>

const ContactOptions = ({ option }: { option: any }) => {
  console.log("option", option);
  return (
    <Card className="m-6 justify-center border-2 border-blue-secondary">
      <div className="flex flex-col">
        <CardContent className="p-2 text-center">
          <p>icon</p>
          <CardTitle className="p-2 text-blue-primary">
            {option.title}
          </CardTitle>
          <CardDescription className="p-2 text-grey-primary">
            {option.description}
          </CardDescription>
          <Link href={option.navigation_url}>
            <button className="m-2 rounded-md bg-orange-400 px-4 py-3 font-bold text-white hover:text-blue-primary">
              {option.cta_text}
            </button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
};

export default function Contact({ pageData }: { pageData: any }) {
  return (
    <main className={`flex flex-col`}>
      <div className="relative ">
        <Image
          className="w-full object-cover"
          src={
            "https://storage.googleapis.com/dwi-dotcom-assets/About_Hero_Banner_4def146800/About_Hero_Banner_4def146800.webp"
          }
          alt={"Hero banner"}
          width={"320"}
          height={"440"}
        />

        <div className="absolute left-0 top-0 z-10 flex size-full flex-col justify-center p-16">
          <p className="p-4 text-3xl font-bold text-white">
            {pageData.attributes.hero_title}
          </p>
          <p className="p-2 text-xl text-blue-light">
            {pageData.attributes.hero_subtext}
          </p>
        </div>
      </div>
      <div>Get in touch with us</div>
      <div className="flex flex-row">
        {pageData.attributes.contact_options.map((option: any) => (
          <ContactOptions key={option} option={option} />
        ))}
      </div>
      <div>FAQ</div>
      {pageData.attributes.FAQs.map((FAQ: any) => {
        return (
          <Accordion key={FAQ} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{FAQ.question}</AccordionTrigger>
              <AccordionContent>{FAQ.answer[0]}</AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </main>
  );
}
