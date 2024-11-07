import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileIcon, PlusCircle } from "lucide-react";
import prisma from "@/utils/db";
import { currentUser } from "@/utils/current-user";
import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import DefaultImage from "@/public/default.png";
import EmptyState from "@/app/components/dashboard/empty-state";

async function getData(userId: string) {
  return await prisma.site.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function SitesPage() {
  const { user } = await currentUser();

  if (!user) {
    redirect("/");
  }
  const data = await getData(user.id);

  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href="/dashboard/sites/new">
            <PlusCircle className="mr-2 size-4" />
            Criar Site
          </Link>
        </Button>
      </div>

      {data === undefined || data.length === 0 ? (
        <EmptyState
          title="Você não tem Sites criados"
          description="Atualmente você não tem Sites. Crie alguns para poder vê-los aqui!"
          buttonText="Criar Site"
          href="/dashboard/sites/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.map((item) => (
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
      )}
    </>
  );
}
