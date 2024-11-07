import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from "@/public/logo.svg";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DefaultImage from "@/public/default.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import prisma from "@/utils/db";

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      imageUrl: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data = await getData(name);
  return (
    <>
      <nav className="my-10 grid grid-cols-3">
        <div className="col-span-1" />
        <div className="flex items-center justify-center gap-x-4">
          <Image
            src={data.imageUrl ?? Logo}
            className="rounded-lg"
            alt="Logo"
            width={40}
            height={40}
          />
          <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        </div>

        <div className="col-span-1 flex w-full justify-end">
          <ModeToggle />
        </div>
      </nav>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {data.posts.map((item) => (
          <Card key={item.id}>
            <Image
              src={item.image ?? DefaultImage}
              alt={item.title}
              className="h-[200px] w-full rounded-t-lg object-cover"
              width={400}
              height={200}
            />
            <CardHeader>
              <CardTitle className="truncate">{item.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {item.smallDescription}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/blog/${name}/${item.slug}`}>Leia mais</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
