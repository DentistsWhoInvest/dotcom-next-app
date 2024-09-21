import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const getStaticProps = async () => {
  const pageData = await fetchEndpointData("/contact-page");
  return {
    props: {
      pageData: pageData.data,
    },
  };
};

const ContactOptions = ({ option }: { option: any }) => {
  return <div>test</div>;
};

export default function Contact({ pageData }: { pageData: any }) {
  console.log("pageData", pageData);
  console.log("pageData", pageData.attributes.contact_options);
  const faqs = pageData.attributes.FAQs;
  console.log("faqs", faqs);
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
      <div>
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
