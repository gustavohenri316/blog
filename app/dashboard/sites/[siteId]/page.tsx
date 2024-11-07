
import EmptyState from "@/app/components/dashboard/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currentUser } from "@/utils/current-user";
import prisma from "@/utils/db";
import {
  Book,
  MoreHorizontal,
  PlusCircle,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function getData(userId: string, siteId: string) {
  return await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      subdirectory: true,
      posts: {
        select: {
          image: true,
          title: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}

export default async function SiteIdRoute({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;
  const { user } = await currentUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  const data = await getData(user.id, siteId);
  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="secondary">
          <Link href={`/blog/${data?.subdirectory}`}>
            <Book className="mr-2 size-4" />
            Ver Blog
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href={`/dashboard/sites/${siteId}/settings`}>
            <Settings className="mr-2 size-4" />
            Configurações
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${siteId}/create`}>
            <PlusCircle className="mr-2 size-4" />
            Criar Artigo
          </Link>
        </Button>
      </div>

      {data?.posts === undefined || data.posts.length === 0 ? (
        <EmptyState
          title="Você não tem artigos criados"
          description="Atualmente você não tem artigos. Crie alguns para vê-los aqui."
          buttonText="Criar Artigo"
          href={`/dashboard/sites/${siteId}/create`}
        />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Artigos</CardTitle>
              <CardDescription>
                Gerencie seus artigos em uma interface simples e intuitiva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagem</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.posts.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Image
                          src={item.image}
                          width={64}
                          height={64}
                          alt="Imagem do Artigo"
                          className="size-16 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-500/10 text-green-500"
                        >
                          Publicado
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("pt-BR", {
                          dateStyle: "medium",
                        }).format(item.createdAt)}
                      </TableCell>

                      <TableCell className="text-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${siteId}/${item.id}`}
                              >
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${siteId}/${item.id}/delete`}
                              >
                                Deletar
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
