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

export const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
  return (
    <Card className="m-6 flex flex-col rounded-[2rem] border-2 bg-gradient-to-b from-blue-primary to-blue-secondary text-white shadow-2xl">
      <CardContent className="space-y-4 text-left">
        <CardTitle className="p-2 text-lg font-bold">
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
          {testimonial.attributes.review[0].children[0].text}
          <p id="stars" className="flex space-x-1">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="gold"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L14.8536 8.71091L22 9.52786L17 14.4721L18.7071 21.4721L12 17.9442L5.29289 21.4721L7 14.4721L2 9.52786L9.14645 8.71091L12 2Z"
                  fill="gold"
                />
              </svg>
            ))}
          </p>
        </CardDescription>
        <CardFooter className="flex flex-col">
          <Image
            src={replaceImageDomain(
              testimonial.attributes.author_thumbnail.data.attributes.formats
                .small.url
            )}
            alt={
              testimonial.attributes.author_thumbnail.data.attributes
                .alternativeText
            }
            width={60}
            height={60}
            id="testimonial-profile"
            className="rounded-full"
          />

          <p className="text-lg font-semibold">
            {testimonial.attributes.author}
          </p>
          <p>{testimonial.attributes.author_job_location}</p>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
