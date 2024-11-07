import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import DefaultImage from "@/public/default.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/utils/db";
import { currentUser } from "@/utils/current-user";
import EmptyState from "../components/dashboard/empty-state";

async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return { sites, articles };
}

export default async function DashboardIndexPage() {
  const { user } = await currentUser();
  const { articles, sites } = await getData(user.id);
  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold">Seus Sites</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {sites.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? DefaultImage}
                alt={item.name}
                className="h-[200px] w-full rounded-t-lg object-cover"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>
                    Ver Artigos
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Você não tem sites criados"
          description="Atualmente você não tem Sites. Crie alguns para poder vê-los aqui."
          href="/dashboard/sites/new"
          buttonText="Criar Site"
        />
      )}

      <h1 className="mb-5 mt-10 text-2xl font-semibold">Artigos Recentes</h1>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {articles.map((item) => (
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
                  <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                    Editar Artigo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Você não tem artigos criados"
          description="Atualmente você não tem artigos criados. Crie alguns para poder vê-los aqui."
          buttonText="Criar Artigo"
          href="/dashboard/sites"
        />
      )}
    </div>
  );
}
