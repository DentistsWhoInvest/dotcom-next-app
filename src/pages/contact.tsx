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
      width={315}
      height={100}
    />
  );

  return (
    <Card className="m-[10px] flex h-[382px] flex-col justify-center space-y-5 rounded-[2rem] border-2 text-center shadow-2xl md:h-[463px] md:w-[226px] md:justify-between lg:h-[422px] lg:w-[328px]">
        <p className="mx-auto mt-8 size-[100px]">
          <Icon />
        </p>
        <CardTitle className="px-[80px] text-[20px] font-bold leading-[24px] text-blue-primary md:px-[20px]">
          {option.title}
        </CardTitle>
        <CardDescription className="px-5 text-base text-grey-primary">
          {option.description}
        </CardDescription>
        <Link href={option.navigation_url}>
          <button className="m-8 rounded-md bg-orange-400 px-[35px] py-3 text-white hover:text-blue-primary md:px-[20px]">
            {option.cta_text}
          </button>
        </Link>
    </Card>
  );
};

export default function Contact({ pageData }: { pageData: any }) {
  return (
    <main className={`flex flex-col`}>
      <HeroBanner
        bannerImage={{url: pageData.attributes.hero_cover.data.attributes.url, name: pageData.attributes.hero_cover.data.attributes.alt}}
        bannerText={pageData.attributes.hero_title}
        subText={pageData.attributes.hero_subtext}
      />
      <div className="bg-gray-100">
        <p className="px-16 py-8 text-center text-[30px] font-bold leading-[36px] text-blue-primary md:py-[50px] md:text-[35px] xl:text-[45px]">
          Get in touch with us
        </p>
        <div className="flex flex-col justify-center px-5 pb-5 md:flex-row">
          {pageData.attributes.contact_options.map((option: any) => (
            <ContactOptions key={option} option={option} />
          ))}
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1140px] justify-center px-5 pb-[100px] pt-[70px] text-blue-primary">
        <p className="text-center text-[30px] font-bold leading-[36px] md:mb-5">
          Frequently Asked Questions
        </p>
        {pageData.attributes.FAQs.map((FAQ: any) => {
          return (
            <Accordion key={FAQ} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="my-1 text-left text-[15px] md:text-[20px]">
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
