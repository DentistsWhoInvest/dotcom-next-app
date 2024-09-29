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
} from "@/components/ui/card";
import { HeroBanner } from "@/components/HeroBanner";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/contact-page");
  return {
    props: {
      pageData: pageData.data,
    },
  };
};

const ContactOptions = ({ option }: { option: any }) => {
  function chooseIcon(id: number) {
    switch (id) {
      case 1:
        return "https://storage.googleapis.com/dwi-dotcom-assets/call_f47e9e0be3/call_f47e9e0be3.svg";
      case 2:
        return "https://storage.googleapis.com/dwi-dotcom-assets/email_7cbf263306/email_7cbf263306.svg";
      case 3:
        return "https://storage.googleapis.com/dwi-dotcom-assets/follow_9f5618ae12/follow_9f5618ae12.svg";
      default:
        return "";
    }
  }
  const Icon = () => (
    <Image
      src={chooseIcon(option.id)}
      alt="contact icon"
      width={2500}
      height={2500}
    />
  );

  return (
    <Card className="m-6 flex h-96 flex-col justify-center rounded-[2rem] border-2 p-8 shadow-2xl">
      <CardContent className=" text-center">
        <p className="mx-auto my-4 size-20">
          <Icon />
        </p>
        <CardTitle className="p-2 text-lg font-bold text-blue-primary">
          {option.title}
        </CardTitle>
        <CardDescription className="p-2 text-grey-primary">
          {option.description}
        </CardDescription>
        <Link href={option.navigation_url}>
          <button className="m-2 rounded-md bg-orange-400 px-4 py-3 text-white hover:text-blue-primary">
            {option.cta_text}
          </button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default function Contact({ pageData }: { pageData: any }) {
  return (
    <main className={`flex flex-col`}>
      <HeroBanner
        bannerImage={pageData.attributes.hero_cover.data.attributes}
        bannerText={pageData.attributes.hero_title}
        subText={pageData.attributes.hero_subtext}
      />

      {/* <div className="relative h-[440px] w-full">
        <Image
          src={
            "https://storage.googleapis.com/dwi-dotcom-assets/Contact_Hero_Banner_scaled_ed1836dfed/Contact_Hero_Banner_scaled_ed1836dfed.webp"
          }
          alt={"Hero banner"}
          layout="fill"
          objectPosition="center"
          objectFit="cover"
          priority
        />

        <div className="absolute inset-0 z-10 flex h-full flex-col justify-center p-4 text-center">
          <p className="p-4 text-3xl font-bold text-white">
            {pageData.attributes.hero_title}
          </p>
          <p className="p-2 text-xl text-blue-light">
            {pageData.attributes.hero_subtext}
          </p>
        </div>
      </div> */}
      <div className="bg-gray-100">
        <p className="pt-8 text-center text-2xl font-bold text-blue-primary">
          Get in touch with us
        </p>
        <div className="flex flex-col">
          {pageData.attributes.contact_options.map((option: any) => (
            <ContactOptions key={option} option={option} />
          ))}
        </div>
      </div>
      <div className="p-5 text-blue-primary">
        <p className="text-center text-2xl font-bold">
          Frequently Asked Questions
        </p>
        {pageData.attributes.FAQs.map((FAQ: any) => {
          return (
            <Accordion key={FAQ} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  {FAQ.question}
                </AccordionTrigger>
                <AccordionContent className="text-[16px] text-black">
                  {FAQ.answer[0].children[0].text}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </main>
  );
}
