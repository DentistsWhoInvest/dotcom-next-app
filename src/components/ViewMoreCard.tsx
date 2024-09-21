import { Button } from "./ui/button";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { processDate } from "@/lib/dateUtils";

export const ViewMoreCard = ({
  page,
  contentType,
  slug,
}: {
  page: any;
  contentType: string;
  slug: string;
}) => {
  const { publishedDate } =
    contentType === "article"
      ? processDate(page.attributes.publish_date)
      : processDate(page.attributes.publishedAt);

  function getHrefStarter(contentType: string) {
    switch (contentType) {
      case "video":
        return "videos";
      case "article":
        return "blog-posts";
      case "podcast":
        return "podcasts";
      default:
        return "";
    }
  }
  const hrefStarter = getHrefStarter(contentType);

  return (
    <>
      <Card className="justify-start border-2">
        <Link href={`/${hrefStarter}/${slug}`}>
          <Image
            src="https://picsum.photos/200/150"
            alt={page.attributes.name}
            width={200}
            height={200}
            className="w-full rounded-t-md object-cover"
          />
        </Link>
        <CardContent className="p-2 text-left">
          <CardTitle className="p-2 text-blue-primary">
            <Link href={`/${hrefStarter}/${slug}`}>
              {page.attributes.title}
            </Link>
          </CardTitle>
          <CardDescription className="p-2 text-grey-primary">
            {page.attributes.excerpt}
          </CardDescription>
          <Link
            className={"text-xs font-semibold text-blue-secondary"}
            href={`/${hrefStarter}/${slug}`}
          >
            <span className="flex p-2">
              READ MORE <ChevronsRight size={13} />
            </span>
          </Link>
        </CardContent>
        <CardFooter className=" justify-start border-t-2 p-4 text-xs">
          {publishedDate}
        </CardFooter>
      </Card>
    </>
  );
};
