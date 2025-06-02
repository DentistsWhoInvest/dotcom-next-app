/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
import React, { useEffect, useState } from "react";
import { fetchEndpointData } from "@/lib/fetchUtils";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TextNode = {
  text: string;
  type: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type Paragraph = {
  type: "paragraph";
  children: TextNode[];
};

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
};

type ImageData = {
  data: {
    id: number;
    attributes: ImageAttributes;
  };
};

type InformedInvestorClub = {
  id: number;
  sales_part_1: Paragraph[];
  sales_part_2: any;
  sales_part_3_cost: any;
  description: any;
  sales_cards: {
    reason: string;
    image: ImageData;
  }[];
  video_club: ImageData;
};

type Testimonial = {
  data: {
    id: number;
    attributes: {
      title: string;
      // review: Paragraph[];
      review: any;
      author: string;
      author_job_location: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
    };
  };
};

type AcademyCoursePageData = {
  hero_text: string;
  second_hero_text: string;
  first_description: any;
  collective_content_description: any;
  second_description: any;
  summary: any;
  cta_text: string;
  cta_navigation_url: string;
  sign_off: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  hero_cover: ImageData;
  hero_logo_ribbon: ImageData;
  collective_content_image: ImageData;
  informed_investor_club: InformedInvestorClub;
  testimonial: Testimonial;
  sign_off_testimonial: Testimonial;
  sign_off_cover: ImageData;
  post_sign_off_description: any;
  james_intro: any;
  inflation: any;
  inflation_explainer: any;
  buying_power: any;
  compound_interest: any;
  small_details: any;
  no_wonder: any;
  no_one_cares: any;
  same_playbook_heading: any;
  same_playbook_list: any;
  the_academy_takes_you: any;
  instead_the_academy: any;
  secret_trade_handover: any;
  quick_question: any;
  quick_question_detail: any;
  companies_who_say: any;
  what_I_am_list: any;
  how_the_academy: any;
  testimonials_title: any;
  testimonials: any;
  testimonials_detail: any;
  faq_title: any;
  faq_details: any;
};

export const getStaticProps = async () => {
  const populateFields = [
    "hero_cover",
    "hero_logo_ribbon",
    "collective_content_image",
    "informed_investor_club",
    "informed_investor_club.sales_part_1",
    "informed_investor_club.sales_part_2",
    "informed_investor_club.sales_part_3_cost",
    "informed_investor_club.description",
    "informed_investor_club.sales_cards",
    "informed_investor_club.sales_cards.image",
    "informed_investor_club.video_club",
    "sign_off_cover",
    "faq_details",
  ];
  const pageData = await fetchEndpointData(`/dwi-academy-page`, populateFields);

  return {
    props: {
      courseData: pageData.data.attributes,
    },
  };
};

export default function DWIAcademySalesPage({
  courseData,
}: {
  courseData: AcademyCoursePageData;
}) {
  const router = useRouter();

  const [status, setStatus] = useState("loading"); // 'loading', 'valid', 'expired', 'invalid'

  useEffect(() => {
    if (!router.isReady) return;
    const emailAddress = router.query.email;
    const campaignId = Number(router.query.c);
    const offer = router.query.offer;

    if (offer !== undefined) {
      setStatus("valid");
      return;
    }

    if (!emailAddress || typeof emailAddress !== "string" || !campaignId) {
      console.error(
        "Invalid email or campaign parameter:",
        emailAddress,
        campaignId
      );
      setStatus("invalid");
      return;
    }

    const checkAccess = async () => {
      try {
        const res = await fetch(
          "https://europe-west2-electric-node-426223-s2.cloudfunctions.net/academy-offer-access-check/access-check",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emailAddress, campaignId }),
          }
        );
        const data = await res.json();

        if (data?.status === "granted") {
          setStatus("valid");
        } else if (data?.status === "expired") {
          setStatus("expired");
        } else if (data?.status === "invalid") {
          setStatus("invalid");
        } else {
          setStatus("valid"); // fail open
        }
      } catch (err) {
        console.error("API failed, showing page anyway", err);
        setStatus("valid"); // fail open
      }
    };

    checkAccess();
  }, [router]);

  // probably tweak the pages to have the DWI banner
  const LoadingPage = () => {
    return (
      <main className="flex h-dvh flex-col">
        <Header />
        <div className="flex h-full flex-col justify-center bg-blue-primary text-center text-white ">
          <p className="my-4 text-2xl font-bold">Loading...</p>
          <p className="my-4 text-lg">
            Please wait while we verify your access to this special offer.
          </p>
          <p className="my-4 size-12 animate-spin place-self-center rounded-full border-b-2 border-white"></p>
        </div>
        <Footer />
      </main>
    );
  };

  const MissingEmail = () => {
    return (
      <main className="flex h-dvh flex-col">
        <Header />
        <div className="flex h-full flex-col justify-center bg-blue-primary text-center text-white ">
          <span className="my-8 text-5xl font-bold">
            Sorry, this link is not valid.{" "}
          </span>
          <span>You can view the Dentists Who Invest Academy here:</span>

          <Link
            href="/the-academy"
            className="mx-auto mt-8 max-w-xs bg-orange-400
        px-4 py-2 text-center transition-all duration-300 hover:bg-white hover:text-blue-primary "
          >
            <Button className="text-xl">Click Here</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  };

  const ExpiredOffer = () => {
    return (
      <main className="flex h-dvh flex-col">
        <Header />
        <div className="flex h-full flex-col justify-center bg-blue-primary text-center text-white ">
          <span className="my-8 text-5xl font-bold">
            Sorry, this offer has expired.{" "}
          </span>
          <span>You can view the Dentists Who Invest Academy here:</span>

          <Link
            href="/the-academy"
            className="mx-auto mt-8 max-w-xs bg-orange-400
      px-4 py-2 text-center transition-all duration-300 hover:bg-white hover:text-blue-primary "
          >
            <Button className="text-xl">Click Here</Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  };


  if (status === "loading") return LoadingPage();
  if (status === "invalid") return MissingEmail();
  if (status === "expired") return ExpiredOffer();

  const ButASeeminglysplitIndex = courseData.james_intro.findIndex(
    (obj: { children: { text: string | string[] }[] }) =>
      obj.children.some((child: { text: string | string[] }) =>
        child.text.includes("But A Seemingly Innocent Game Of Football")
      )
  );
  const firstDescJames = courseData.james_intro.slice(
    0,
    ButASeeminglysplitIndex
  );
  const firstDescRest = courseData.james_intro.slice(ButASeeminglysplitIndex);

  const importantSplit = courseData.summary.findIndex(
    (obj: { children: { text: string | string[] }[] }) =>
      obj.children.some((child: { text: string | string[] }) =>
        child.text.includes("IMPORTANT")
      )
  );
  const summaryIntro = courseData.summary.slice(0, importantSplit);
  const summaryRest = courseData.summary.slice(importantSplit);

  const targetTextSpecial = "This Special £1000+Vat Offer… ";
  const specialOffer = summaryRest.findIndex(
    (obj: { children: { text: string | string[] }[] }) =>
      obj.children.some(
        (child: { text: string | string[] }) => child.text === targetTextSpecial // Direct match of the exact text
      )
  );
  const summaryImportantText = summaryRest.slice(0, specialOffer);
  const summarySpecialOfferRest = summaryRest.slice(specialOffer);

  const specialOfferDetailTarget =
    "You won’t find this offer on our main website.";

  const specialOfferDetailSplit = summarySpecialOfferRest.findIndex(
    (obj: { children: any[] }) =>
      obj.children?.some((child) => child.text === specialOfferDetailTarget)
  );
  const summarySpecialOffer = summarySpecialOfferRest.slice(
    0,
    specialOfferDetailSplit
  );
  const summarySpecialOfferDetail = summarySpecialOfferRest.slice(
    specialOfferDetailSplit
  );

  const noWonderTarget = "(I certainly did until I knew better)";

  const noWonder_splitIndex = courseData.no_wonder.findIndex(
    (obj: { children: { text: string | string[] }[] }) =>
      obj.children.some((child: { text: string | string[] }) =>
        child.text.includes(noWonderTarget)
      )
  );
  const noWonderHeader = courseData.no_wonder.slice(0, noWonder_splitIndex);
  const noWonderDetail = courseData.no_wonder.slice(noWonder_splitIndex);


  // const whatIwantTarget = "'And that’s what I want for you:'";

  // const WhatIwantSplit = noWonderDetail.findIndex(
  //   (obj: { children: { text: string | string[] }[] }) =>
  //     obj.children.some((child: { text: string | string[] }) =>
  //       child.text.includes(whatIwantTarget)
  //     )
  // );
  const IcertainlyDid = noWonderDetail.slice(0, 6);
  const whatIwantDetail = noWonderDetail.slice(6);

  const same_playbook_image_urls = [
    "https://assets.dentistswhoinvest.com/1_7f95d90946/1_7f95d90946.webp",
    "https://assets.dentistswhoinvest.com/2_5156297d3a/2_5156297d3a.webp",
    "https://assets.dentistswhoinvest.com/3_8897df434d/3_8897df434d.webp",
  ];

  const testimonialImages = [
    "https://assets.dentistswhoinvest.com/2_1_39fa6f5dba/2_1_39fa6f5dba.webp",
    "https://assets.dentistswhoinvest.com/1_1_5f35c428d8/1_1_5f35c428d8.webp",
    "https://assets.dentistswhoinvest.com/4_31caf2f764/4_31caf2f764.webp",
    "https://assets.dentistswhoinvest.com/5_c7af1c19c7/5_c7af1c19c7.webp",
    "https://assets.dentistswhoinvest.com/Testimonials_1_a9fb002db7/Testimonials_1_a9fb002db7.webp",
  ];

  return (
    <>
      <main className="mx-4 text-lg md:mx-10 lg:mx-40">
        <section id="topbanner">
          <div className="relative z-10 -mx-4 h-[680px] w-screen overflow-hidden md:-mx-10 md:h-[602px] lg:-mx-40 lg:h-[542px]">
            <Image
              src={courseData.hero_cover.data.attributes.url}
              alt={"mobile"}
              layout="fill"
              objectFit="cover"
              className="inset-0 object-[left_70%] md:object-[right_50%] lg:object-[center_0%] lg:pr-0"
            />
            <div className="relative z-10 flex size-full flex-col items-center justify-center px-5 text-center md:mx-auto md:max-w-[800px] md:items-start md:px-0 md:text-left lg:w-[1140px]">
              <div className="-mt-4 mb-5 text-3xl font-bold text-white md:my-0 md:pl-[40px] md:text-[35px] lg:pl-0 lg:text-[45px] lg:leading-[54px]">
                <div className=" md:w-[60.833%] lg:w-[71.833%]">
                  <div className="p-[10px]">
                    <Image
                      src={courseData.hero_logo_ribbon.data.attributes.url}
                      alt={"ribbon"}
                      height={125}
                      width={640}
                      objectFit="cover"
                      className="sm:aspect-auto md:h-[53px] md:w-[272px] lg:h-[71px] lg:w-[365px]"
                    />
                    <h1 className="mt-[32px] text-left text-[30px] font-bold text-white [text-shadow:_0_0_10px_rgb(0_0_0_/_30%)] md:w-4/5 md:text-[25px] md:leading-[35px] lg:text-[30px]">
                      {courseData.hero_text}
                    </h1>
                    <h1 className="mt-[32px] text-left text-[30px] font-bold text-white [text-shadow:_0_0_10px_rgb(0_0_0_/_30%)] md:w-[65%] md:text-[25px] md:leading-[35px] lg:text-[30px]">
                      {courseData.second_hero_text}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="first-description">
          <div
            id="james"
            className="my-6 space-y-4 bg-blue-primary text-base text-white md:my-8"
          >
            <div className="grid grid-cols-1 items-center px-6 py-4 text-base md:grid-cols-2 md:gap-0 md:space-x-4 md:space-y-0 xl:gap-8">
              <Image
                src="https://assets.dentistswhoinvest.com/image_2_b16a366e12/image_2_b16a366e12.webp"
                alt="James in Dubai"
                width={315}
                height={315}
                className="h-auto w-full md:size-[264px] md:place-self-center lg:size-[342px] xl:size-[350px]"
              />
              <div className="space-y-3 lg:pl-[20px] lg:pr-[120px] xl:pr-[100px]">
                <BlocksRenderer content={firstDescJames} />{" "}
              </div>
            </div>
          </div>
          <div
            id="seemingly"
            className="dwiH5 articleContent my-6 space-y-4 text-lg md:my-8"
          >
            <BlocksRenderer content={firstDescRest} />
          </div>
          <div className="relative z-10 -mx-4 h-[180px] w-screen overflow-hidden md:-mx-10 md:h-[202px] lg:-mx-40 lg:h-[282px]">
            <Image
              src="https://assets.dentistswhoinvest.com/image_3_0a8019a594/image_3_0a8019a594.webp"
              alt={"inflation background"}
              layout="fill"
              objectFit="cover"
              className="inset-0"
            />

            <div
              id="inflation"
              className="articleContent relative m-[50px] justify-self-center bg-white text-center text-lg font-bold leading-10 md:w-[30%]"
            >
              <BlocksRenderer content={courseData.inflation} />
            </div>
          </div>
          <div
            id="not always"
            className="dwiH5 articleContent my-6 space-y-4 text-lg md:my-8"
          >
            <BlocksRenderer content={courseData.inflation_explainer} />
          </div>
          <div className="relative z-10 -mx-4 h-[840px] w-screen overflow-hidden md:-mx-10 md:h-[582px] lg:-mx-40 lg:h-[452px]">
            <Image
              src="https://assets.dentistswhoinvest.com/Group_11_47373f98dd/Group_11_47373f98dd.png"
              alt={"buying power decreasing background"}
              layout="fill"
              objectFit="cover"
              className="inset-0"
            />

            <div
              id="inflation"
              className="dwiH5 articleContent relative m-8 space-y-2 text-lg text-white md:m-[50px]"
            >
              <BlocksRenderer content={courseData.buying_power} />
            </div>
          </div>
          <div
            id="compound"
            className="dwiH5 articleContent my-6 space-y-4 text-lg md:my-8"
          >
            <BlocksRenderer content={courseData.compound_interest} />
          </div>
          <div
            id="small"
            className="dwiH5 articleContent -mx-4 space-y-4 bg-blue-secondary px-12 py-8 text-lg text-white md:-mx-10 lg:-mx-40"
          >
            <BlocksRenderer content={courseData.small_details} />
          </div>
          <div
            id="james"
            className="dwiH5 articleContent my-6 space-y-8 text-lg md:my-8 lg:-mx-20"
          >
            <div>
              {" "}
              <BlocksRenderer content={noWonderHeader} />
            </div>
            <div className="grid grid-cols-1 items-center space-y-4 text-lg leading-6 md:grid-cols-2 md:gap-4 md:space-y-0 lg:gap-8">
              <div className="space-y-2 md:py-2 ">
                <BlocksRenderer content={IcertainlyDid} />
              </div>
              <Image
                src="https://assets.dentistswhoinvest.com/wrap_up_founder_226931dc58/wrap_up_founder_226931dc58.webp"
                alt="James speaking"
                width={315}
                height={315}
                objectFit="cover"
                className=" aspect-[4/5] h-[420px] place-self-center md:h-[434px] lg:h-auto"
              />
            </div>
            <div className="space-y-2">
              <BlocksRenderer content={whatIwantDetail} />
            </div>
          </div>
        </section>
        <section id="collective-content" className="">
          <div className="relative z-10 -mx-4 mt-4 h-[360px] w-screen overflow-hidden md:-mx-10 md:h-[222px] lg:-mx-40 lg:h-[342px]">
            <Image
              src="https://assets.dentistswhoinvest.com/Group_36_8ab2aba150/Group_36_8ab2aba150.webp"
              alt={"James and Luke"}
              layout="fill"
              objectFit="cover"
              className="inset-0"
            />

            <div
              id=""
              className="articleContent relative m-4 w-4/5 space-y-4 justify-self-center text-center text-xl font-semibold leading-8 text-white md:m-8 lg:m-24 lg:text-2xl"
            >
              <BlocksRenderer
                content={courseData.collective_content_description}
              />{" "}
            </div>
          </div>
          <div
            id=""
            className="dwiH5 articleContent relative my-6 mt-4 w-full space-y-4 bg-white text-lg md:my-8"
          >
            <BlocksRenderer content={courseData.no_one_cares} />{" "}
          </div>
          <div
            id="same playbook header"
            className="dwiH5 articleContent relative my-6 w-full space-y-4 bg-white text-lg md:my-8"
          >
            <BlocksRenderer content={courseData.same_playbook_heading} />{" "}
          </div>
          <div
            id="inflation"
            className="dwiH5 articleContent relative my-6 w-full space-y-4 bg-white text-lg md:my-8"
          >
            <ul>
              {courseData.same_playbook_list[0].children.map(
                (item: { children: any[] }, index: number) => {
                  const text = item.children.map((child, i) => {
                    return child.bold ? (
                      <strong key={i}>{child.text}</strong>
                    ) : (
                      child.text
                    );
                  });

                  return (
                    <li
                      key={index}
                      className="mb-8 flex items-center justify-start"
                    >
                      <Image
                        src={same_playbook_image_urls[index]}
                        alt={`icon-${index + 1}`}
                        width={80}
                        height={80}
                        className="mr-4"
                      />
                      <span className="w-5/6 text-wrap">{text}</span>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </section>
        <section className="-mx-4 my-6 bg-[#EFF3F6] py-4 md:-mx-10 md:my-8 lg:-mx-40">
          <div
            id="the academy takes you"
            className="dwiH5  articleContent relative mx-4 my-6 w-fit space-y-4 py-4 text-lg md:mx-10 md:my-8 lg:mx-40 "
          >
            <BlocksRenderer content={courseData.the_academy_takes_you} />{" "}
          </div>
          <div
            id="james"
            className="dwiH5 articleContent mx-4 space-y-4 text-lg md:mx-10 lg:mx-40 "
          >
            <div className="my-4 grid grid-cols-1 items-center space-y-8 text-lg md:grid-cols-2 md:gap-4 md:space-x-4 md:space-y-0 xl:gap-8">
              <div className="space-y-8 text-blue-primary lg:pl-[20px] lg:pr-[120px] lg:text-2xl xl:pr-[100px]">
                <BlocksRenderer content={courseData.instead_the_academy} />
              </div>
              <Image
                src="https://assets.dentistswhoinvest.com/image_19_0880e64b1a/image_19_0880e64b1a.png"
                alt="Course image"
                width={315}
                height={315}
                className="h-auto w-full md:size-[264px] lg:size-[392px] xl:size-[450px] xl:place-self-center"
              />
            </div>
          </div>
          <div
            id="same playbook header"
            className="dwiH5 articleContent relative mx-4 my-6 w-fit space-y-4 text-lg md:mx-10 md:my-8 lg:mx-40"
          >
            <BlocksRenderer content={courseData.secret_trade_handover} />{" "}
          </div>
        </section>
        <section id="second-description">
          <div className="dwiH5 articleContent mt-4 space-y-4 text-lg">
            <BlocksRenderer content={courseData.quick_question} />
          </div>
          <div id="james" className="dwiH5 articleContent space-y-4 text-lg">
            <div className="grid grid-cols-1 items-center space-y-8 px-6 py-4 text-lg md:grid-cols-2 md:gap-4 md:space-x-4 md:space-y-0 xl:gap-8">
              <Image
                src="https://assets.dentistswhoinvest.com/Group_4_9a98ec265b/Group_4_9a98ec265b.jpg"
                alt="James speaking"
                width={315}
                height={315}
                objectFit="cover"
                className=" aspect-square h-[420px] place-self-center md:h-[434px] lg:h-auto"
              />
              <div className="space-y-8 leading-5">
                <BlocksRenderer content={courseData.quick_question_detail} />
              </div>
            </div>
          </div>
          <div className="dwiH5 articleContent my-6 space-y-4 text-lg md:my-8">
            <BlocksRenderer content={courseData.companies_who_say} />
          </div>
          <div className="dwiH5 articleContent mt-4 space-y-4 text-lg">
            {courseData.what_I_am_list[0].children.map(
              (item: { children: any[] }, index: number) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 rounded-lg p-4 ${
                    index % 2 === 0 ? "bg-[#65ADC1]" : "bg-[#E1EBF0]"
                  }`}
                >
                  <div className="leading-relaxed">
                    {item.children.map((child, i) => {
                      if (child.bold) {
                        return (
                          <strong key={i} className="font-semibold">
                            {child.text}
                          </strong>
                        );
                      } else {
                        return <span key={i}>{child.text}</span>;
                      }
                    })}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="dwiH5 articleContent my-6 space-y-4 text-lg md:my-10 lg:w-[90%] lg:justify-self-center">
            <BlocksRenderer content={courseData.how_the_academy} />
          </div>
        </section>
        <section className="-mx-4 my-6 flex justify-center bg-blue-secondary p-2 md:-mx-10 md:my-8 lg:-mx-40">
          <Image
            src="https://assets.dentistswhoinvest.com/on_the_call_photo_d885beeb5c/on_the_call_photo_d885beeb5c.webp"
            alt="Collective content image"
            width={courseData.collective_content_image.data.attributes.width}
            height={courseData.collective_content_image.data.attributes.height}
          />
        </section>

        <section id="informed-investor-club">
          <div className="my-6 flex flex-col items-center space-y-2 md:my-8">
            <div className="grid grid-cols-1 gap-2">
              <div className="space-y-2 text-center font-bold">
                <p className="flex flex-row justify-center text-xl text-blue-secondary md:text-[30px] md:leading-9">
                  {courseData.informed_investor_club.sales_part_1.map(
                    (item: any, index: number) => {
                      return (
                        <p key={index}>
                          <span>{item.children[0].text}</span>
                          <span
                            id="wrapper"
                            className="relative inline-block overflow-visible"
                          >
                            <span className="text-orange-400">
                              {item.children[1].text}
                            </span>
                            <svg
                              className="absolute left-1/2 top-1/2 z-[2] size-[calc(100%+20px)] -translate-x-1/2 -translate-y-1/2 overflow-visible"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 500 150"
                              preserveAspectRatio="none"
                            >
                              <path
                                d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"
                                stroke="red"
                                stroke-width="9"
                                fill="none"
                                // eslint-disable-next-line tailwindcss/no-custom-classname
                                className="path-1"
                              ></path>
                            </svg>
                            <style jsx>{`
                              @keyframes draw {
                                0% {
                                  stroke-dasharray: 0, 1500; /* Start with no visible stroke */
                                  opacity: 0;
                                }
                                10% {
                                  stroke-dasharray: 0, 1500; /* Start with no visible stroke */
                                  opacity: 1;
                                }
                                30% {
                                  stroke-dasharray: 1500, 0; /* Complete visible stroke */
                                  opacity: 1;
                                }
                                80% {
                                  stroke-dasharray: 1500, 0; /* Keep the stroke */
                                  opacity: 1;
                                }
                                100% {
                                  opacity: 0;
                                }
                              }

                              .path-1 {
                                animation: draw 5s forwards; /* Animate drawing and fading */
                                animation-iteration-count: infinite;
                              }
                            `}</style>
                          </span>
                          <span>{item.children[2].text}</span>
                        </p>
                      );
                    }
                  )}
                </p>
                <p className="text-3xl text-blue-primary md:m-[-20px] md:text-[45px]">
                  <BlocksRenderer
                    content={courseData.informed_investor_club.sales_part_2}
                  />
                </p>
                <p className="font-semibold text-orange-400 md:text-2xl">
                  <BlocksRenderer
                    content={
                      courseData.informed_investor_club.sales_part_3_cost
                    }
                  />
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 lg:mx-[120px] lg:space-y-8 lg:py-5 xl:mx-auto">
                <BlocksRenderer
                  content={courseData.informed_investor_club.description}
                />
              </div>
            </div>
            <div className="m-[10px] grid size-full grid-cols-1 justify-center gap-4 space-y-4 md:grid-cols-4 md:space-y-0 lg:gap-8 lg:px-[50px] xl:px-[200px]">
              {courseData.informed_investor_club.sales_cards.map(
                (card: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="flex h-[266] w-[295] flex-col items-center space-y-4 rounded-lg bg-blue-secondary p-8 md:h-[266] md:w-[162] md:px-4 md:py-8 xl:px-4"
                    >
                      <Image
                        src={card.image.data.attributes.url}
                        alt="Sales card image"
                        width={90}
                        height={90}
                      />
                      <span className="size-full text-center text-lg font-bold text-white">
                        {card.reason}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>

        <section id="sign off" className="my-4 space-y-8 bg-[white]">
          <div className="m-auto flex-col space-y-8 lg:flex lg:justify-center">
            <div id="summary intro" className="dwiH5 articleContent space-y-4">
              <BlocksRenderer content={summaryIntro} />
            </div>
          </div>
        </section>
        <section
          id="sign off"
          className="-mx-10 space-y-8 bg-blue-secondary pb-0.5 text-white lg:-mx-40"
        >
          <div className="m-10 flex-col space-y-8 lg:flex lg:justify-center ">
            <div
              id="summary important text & Luke image"
              className="mt-4 grid grid-cols-1 items-center space-y-8 text-lg md:grid-cols-2 md:gap-4 md:space-x-4 md:space-y-0 xl:gap-8"
            >
              <div className="mt-8 space-y-2 justify-self-end font-normal md:mb-4 lg:w-2/3">
                {/* <BlocksRenderer content={summaryImportantText} /> */}
                <p className="text-xl font-bold text-blue-primary lg:text-2xl">
                  IMPORTANT!
                </p>
                <p className="font-semibold">
                  You Also Get A Special One Hour Call With Financial Planner
                  Luke Hurley
                </p>
                <div>
                  <p className="mt-2">The call is to:</p>
                  <ul className="mb-4">
                    <li className="font-semibold">
                      ✅ Answer your key questions in private
                    </li>
                    <li>
                      ✅ Get you started on the right track without wasting any
                      time
                    </li>
                    <li className="font-semibold">
                      ✅ Put your mind at ease around any steps you’ve already
                      taken
                    </li>
                  </ul>
                  <p>
                    Because when it comes to investing, wise counsel can only
                    help.
                  </p>{" "}
                  <p>
                    And even after all these years the depth of Luke’s knowledge
                    continues to blow me away.{" "}
                  </p>
                  <p>
                    I guess that’s what happens after having helped hundreds of
                    dentists already.
                  </p>
                </div>
              </div>
              <Image
                src="https://assets.dentistswhoinvest.com/image_5_b78d4e0009/image_5_b78d4e0009.webp"
                alt="Luke"
                width={315}
                height={315}
                objectFit="cover"
                className=" aspect-[4/5] h-[350px] place-self-center md:h-[434px] lg:h-auto"
              />
            </div>
          </div>
        </section>
        <section id="sign off" className="space-y-8 bg-[white] ">
          <div className="m-auto flex-col space-y-8 lg:flex lg:justify-center">
            <div
              id="summary special offer"
              className="grid grid-cols-1 items-center space-y-8 bg-white pt-4 text-lg md:grid-cols-2 md:gap-4 md:space-x-4 md:space-y-0 xl:gap-8"
            >
              <Image
                src="https://assets.dentistswhoinvest.com/special_offe_2_0cb8cb0a04/special_offe_2_0cb8cb0a04.png"
                alt="Special Offer"
                width={315}
                height={315}
                className="h-auto w-full md:size-[264px] md:place-self-center lg:size-[492px] xl:size-[550px]"
              />
              <div className="space-y-8 lg:pl-[20px] lg:pr-[120px] xl:pr-[100px]">
                {/* <BlocksRenderer content={summarySpecialOffer} /> */}

                <p className="text-xl font-bold text-orange-400 lg:text-2xl">
                  This Special £1000+Vat Offer…
                </p>
                <p className="text-xl font-semibold text-blue-primary lg:text-2xl">
                  With The Informed Investors Club Included… & One Hour Call
                  With Luke… Is Reserved For The Dentists Who Invest Email
                  Community <span className="underline">Only</span>
                </p>
              </div>
            </div>

            <div id="summary special offer detail" className="">
              {/* <BlocksRenderer content={summarySpecialOfferDetail} /> */}
              <p className="-mt-8 mb-4">
                You won’t find this offer on our main website. And when the
                deadline arrives, you won’t find it anywhere. So, if you’re
                ready to get the playbook, here’s what to do:
              </p>
              <div className="space-y-3 text-base leading-relaxed text-black">
                <div className="flex items-start">
                  <span className="mr-2 text-xl text-orange-500">➜</span>
                  <span className="font-bold">
                    Click the big, orange button below that says “Add To Cart”
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 text-xl text-orange-500">➜</span>
                  <span>
                    On the next page, enter your regular details and complete
                    your payment using a credit card or debit card…
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 text-xl text-orange-500">➜</span>
                  <span className="font-bold">
                    Within minutes, you’ll receive your confirmation and login
                    credentials via email (normally takes 3 minutes to arrive in
                    your inbox)…
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 text-xl text-orange-500">➜</span>
                  <span>
                    I’ll be in touch with further details about your call with
                    Luke…
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 text-xl text-orange-500">➜</span>
                  <span className="font-bold">
                    From there all you do is show up to the call.
                  </span>
                </div>
              </div>
            </div>
            <Link
              href={courseData.cta_navigation_url}
              className="flex justify-center"
            >
              <Button className="size-full rounded-md bg-orange-400 p-4 text-xl text-white hover:text-blue-primary md:size-1/2 lg:size-1/3 lg:px-[60px] lg:py-8 lg:text-[33px]">
                {courseData.cta_text}
              </Button>
            </Link>
            <div className="flex flex-col items-center space-y-8 md:pb-8">
              <BlocksRenderer content={courseData.sign_off} />
            </div>
          </div>
        </section>
        <section
          id="testimonials"
          className="-mx-4 bg-[#E1EBF0] py-2 md:-mx-10 lg:-mx-40"
        >
          <div className="articleContent mx-4 mt-4 w-1/2 space-y-4 justify-self-center text-center text-xl font-bold md:mx-10 lg:mx-40">
            <p>{courseData.testimonials_title}</p>
          </div>
          <div className="mx-4 grid grid-cols-1 gap-6 md:mx-10 md:grid-cols-2 lg:grid-cols-3">
            {testimonialImages.slice(0, 3).map((image, index) => (
              <div key={index} className="flex flex-col items-center">
                <Image
                  src={image}
                  alt={`Testimonial author ${index + 1}`}
                  width={315}
                  height={315}
                  className="object-cover lg:size-[452px]"
                />
              </div>
            ))}

            {/* Wrap last two items in a flex container and center them */}
            <div className="hidden lg:col-span-3 lg:flex lg:justify-center lg:gap-6">
              {testimonialImages.slice(3).map((image, index) => (
                <div key={index + 3} className="flex flex-col items-center">
                  <Image
                    src={image}
                    alt={`Testimonial author ${index + 4}`}
                    width={315}
                    height={315}
                    className="object-cover lg:size-[452px]"
                  />
                </div>
              ))}
            </div>

            {/* For mobile and tablet: just show all items normally */}
            {testimonialImages.slice(3).map((image, index) => (
              <div
                key={`mobile-${index + 3}`}
                className={`
        flex flex-col items-center lg:hidden
        ${index === 1 ? "md:col-span-2 md:justify-self-center " : ""}
      `}
              >
                <Image
                  src={image}
                  alt={`Testimonial author ${index + 4}`}
                  width={315}
                  height={315}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="dwiH5 articleContent mx-4 space-y-4 text-lg md:mx-10 lg:mx-40">
            {/* <BlocksRenderer content={courseData.testimonials_detail} /> */}
            <div className="rounded-lg p-6 text-black">
              <h2 className="mb-6 text-center text-lg font-bold md:text-xl">
                Dr Max Al–Nakib is an experienced implant dentist who <br />
                enrolled in the Dentists Who Invest Academy in 2024
              </h2>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Before the course */}
                <div>
                  <h3 className="mb-4 font-bold">Before the course:</h3>
                  <ul className="list-inside list-disc space-y-2">
                    <li>
                      Max had a series of investments that were managed by a
                      financial adviser including a pension and an ISA
                    </li>
                    <li>
                      Max was paying high fees with little explanation as to
                      what his money was invested
                    </li>
                    <li>Was not gaining much returns on his investments</li>
                    <li>Had no clear idea of when he could retire</li>
                  </ul>
                </div>

                {/* After the course */}
                <div>
                  <h3 className="mb-4 font-bold">After the course:</h3>
                  <ul className="list-inside list-disc space-y-2">
                    <li>
                      Max now manages his own ISA and Pension after informing
                      his adviser that he is no longer required
                    </li>
                    <li>
                      Frequently attends the financial coaching calls asking
                      questions each time his circumstances change/he learns
                      something new
                    </li>
                    <li>Is working towards a clear retirement date</li>
                    <li>
                      No more high fees meaning he can reinvest these into his
                      portfolio and boost its growth
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-10">
          <p className="mt-8 text-center text-xl font-bold">
            {courseData.faq_title}
          </p>
          <div className="w-full max-w-[1140px] justify-self-center">
            {courseData.faq_details.map((FAQ: any) => {
              return (
                <Accordion key={FAQ} type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="my-2 text-left text-[15px] md:text-[20px]">
                      {FAQ.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-[16px] text-black">
                      {FAQ.description[0].children[0].text}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
          <div className="m-auto flex-col space-y-8 py-8 lg:flex lg:justify-center">
            <Link
              href={courseData.cta_navigation_url}
              className="flex justify-center"
            >
              <Button className="size-full rounded-md bg-orange-400 p-4 text-xl text-white hover:text-blue-primary md:size-1/2 lg:size-1/3 lg:px-[60px] lg:py-8 lg:text-[33px]">
                {courseData.cta_text}
              </Button>
            </Link>
          </div>
        </section>

        <section id="sign off" className="-mx-4 md:-mx-10 lg:-mx-40">
          <div className="relative h-[420px] w-full md:h-[300px] lg:h-[250px]">
            <div className="absolute inset-0 ">
              <Image
                src={courseData.sign_off_cover.data.attributes.url}
                alt={"Sign off image"}
                layout="fill"
                objectPosition="center"
                objectFit="cover"
                priority
              />
              <div className="absolute inset-0 bg-blue-primary opacity-70"></div>
              <div className="relative m-8 space-y-4 text-sm text-white md:m-[50px]">
                <BlocksRenderer
                  content={courseData.post_sign_off_description}
                />
              </div>
            </div>
          </div>
        </section>
      </main>{" "}
    </>
  );
}
