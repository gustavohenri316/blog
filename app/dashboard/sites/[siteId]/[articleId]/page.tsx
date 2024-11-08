import { editPostActions } from "@/actions/actions.service";
import { ArticleForm } from "@/app/components/forms/article-form";
import { Button } from "@/components/ui/button";
import prisma from "@/utils/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: Promise<{ articleId: string; siteId: string }>;
}) {
  const { articleId, siteId } = await params;
  const data = await getData(articleId);
  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant="outline" asChild className="mr-3">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Editar Artigo</h1>
      </div>
      <ArticleForm handle={editPostActions} data={data} siteId={siteId} />
    </div>
  );
}
