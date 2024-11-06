import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import Image from "next/image";

export const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: any;
  index: number;
}) => {
  return (
    <Card
      className={`m-7 flex flex-col rounded-[2rem] border-0 bg-gradient-to-b from-blue-primary to-blue-secondary text-white shadow-2xl md:m-2 lg:col-span-1 ${
        index === 2 ? "md:col-span-2" : "col-span-1"
      }`}
    >
      <CardContent className="space-y-4 text-left md:flex md:grow md:flex-col">
        <CardTitle className="pt-[50px] text-xl font-semibold md:p-0 md:text-xl">
          <Image
            id="quote"
            src="/white-quote.png"
            alt="quote-mark"
            width={70}
            height={70}
          />
          <p className="my-4">{testimonial.attributes.title}</p>
        </CardTitle>
        <CardDescription>
          <p className="mb-4 text-justify text-base">
            {testimonial.attributes.review[0].children[0].text}
          </p>
          <div className="flex mb-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Image
                  key={i}
                  src="https://assets.dentistswhoinvest.com/image_f405c7fff6/image_f405c7fff6.webp"
                  alt="star"
                  height={20}
                  width={20}
                  className="lg:h-[26px] lg:w-[27px]"
                />
              ))}
          </div>
        </CardDescription>
        <div className="grow"></div>
        <CardFooter className="mb-4 mt-auto flex flex-col md:flex-row">
          <Image
            src={testimonial.attributes.author_thumbnail.data.attributes.formats
                .thumbnail.url}
            alt={testimonial.attributes.author_thumbnail.data.attributes
                .alternativeText}
            width={88}
            height={88}
            id="testimonial-profile"
            className="rounded-full"
          />
          <div className="flex flex-col md:mx-4">
            <p className="text-lg font-semibold">
              {testimonial.attributes.author}
            </p>
            <p>{testimonial.attributes.author_job_location}</p>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
