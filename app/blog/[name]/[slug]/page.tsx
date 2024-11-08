import { RenderArticle } from "@/app/components/dashboard/render-article";
import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JSONContent } from "novel";

async function getData(slug: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    select: {
      articleContent: true,
      title: true,
      smallDescription: true,
      image: true,
      createdAt: true,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function SlugRoute({
  params,
}: {
  params: Promise<{ slug: string; name: string }>;
}) {
  const { slug, name } = await params;
  const data = await getData(slug);

  return (
    <>
      <div className="flex items-center gap-x-3 pb-5 pt-10">
        <Button size="icon" variant="outline" asChild>
          <Link href={`/blog/${name}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-medium">Voltar</h1>
      </div>

      <div className="mb-10 flex flex-col items-center justify-center">
        <div className="m-auto w-full text-center md:w-7/12">
          <p className="m-auto my-5 w-10/12 text-sm font-light text-muted-foreground md:text-base">
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "medium",
            }).format(data.createdAt)}
          </p>
          <h1 className="mb-5 text-3xl font-bold tracking-tight md:text-6xl">
            {data.title}
          </h1>
          <p className="m-auto line-clamp-5 w-10/12 text-muted-foreground">
            {data.smallDescription}
          </p>
        </div>
      </div>

      <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-[450px] md:w-5/6 md:rounded-2xl lg:w-2/3">
        <Image
          src={data.image}
          alt={data.title}
          width={1200}
          height={630}
          className="h-full w-full rounded-lg object-cover"
          priority
        />
      </div>

      <RenderArticle json={data.articleContent as JSONContent} />
    </>
  );
}
