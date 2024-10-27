import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import Image from "next/image";

let assetDomain = "https://assets.drjamesmartin.co.uk";
function replaceImageDomain(url: string): string {
  return url.replace(
    "https://storage.googleapis.com/dwi-dotcom-assets",
    assetDomain
  );
}

export const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: any;
  index: number;
}) => {
  return (
    <Card
      className={`m-6 flex flex-col rounded-[2rem] border-2 bg-gradient-to-b from-blue-primary to-blue-secondary text-white shadow-2xl md:m-2 xl:col-span-1 ${
        index === 2 ? "md:col-span-2" : "col-span-1"
      }`}
    >
      <CardContent className="space-y-4 text-left md:flex md:grow md:flex-col">
        <CardTitle className="p-2 text-lg font-semibold md:p-0 md:text-xl">
          <Image
            id="quote"
            src="/white-quote.png"
            alt="quote-mark"
            width={100}
            height={100}
          />
          <p>{testimonial.attributes.title}</p>
        </CardTitle>
        <CardDescription>
          <p className="md:text-base">{testimonial.attributes.review[0].children[0].text}</p>
          <p id="stars" className="flex space-x-1">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#ffd700"
                xmlns="http://www.w3.org/2000/svg"
                className="md:size-12"
              >
                <path
                  d="M12 2L14.8536 8.71091L22 9.52786L17 14.4721L18.7071 21.4721L12 17.9442L5.29289 21.4721L7 14.4721L2 9.52786L9.14645 8.71091L12 2Z"
                  fill="#ffd700"
                />
              </svg>
            ))}
          </p>
        </CardDescription>
        <div className="grow"></div>
        <CardFooter className="mb-4 mt-auto flex flex-col md:flex-row">
          <Image
            src={replaceImageDomain(
              testimonial.attributes.author_thumbnail.data.attributes.formats.
                thumbnail.url
            )}
            alt={
              testimonial.attributes.author_thumbnail.data.attributes
                .alternativeText
            }
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
