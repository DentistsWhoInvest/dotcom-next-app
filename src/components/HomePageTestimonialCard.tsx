import Image from "next/image";

export const HomePageTestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: any;
  index: number;
}) => {
  return (
    <div
      className="col-span-1 flex flex-col border-0 bg-white text-black shadow-xl"
    >
      <div className="flex flex-col items-center p-4">
        <Image
          src={
            testimonial.attributes.author_thumbnail.data.attributes.formats
              .thumbnail.url
          }
          alt={
            testimonial.attributes.author_thumbnail.data.attributes
              .alternativeText
          }
          width={88}
          height={88}
          id="testimonial-profile"
          className="rounded-full bg-blue-primary/60"
        />
        <p className="mt-2 text-lg text-blue-primary underline">
          {testimonial.attributes.author}
        </p>
      </div>

      <div className="flex grow flex-col p-4">
        <p className="text-center text-lg font-semibold text-blue-primary lg:text-left lg:text-xl">
          {testimonial.attributes.title}
        </p>
        <p className="mt-4 text-left text-sm lg:text-base">
          {testimonial.attributes.review[0].children[0].text}
        </p>
      </div>
    </div>
  );
};
