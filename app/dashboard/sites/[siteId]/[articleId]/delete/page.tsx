import { deletePost } from "@/actions/actions.service";
import { SubmitButton } from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function DeleteForm({
  params,
}: {
  params: Promise<{ siteId: string; articleId: string }>;
}) {
  const { siteId, articleId } = await params;
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Você tem certeza absoluta?</CardTitle>
          <CardDescription>
            Esta ação não pode ser desfeita. Isso excluirá este artigo e
            removerá todos os dados do nosso servidor.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-between">
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/sites/${siteId}`}>Cancelar</Link>
          </Button>
          <form action={deletePost}>
            <input type="hidden" name="articleId" value={articleId} />
            <input type="hidden" name="siteId" value={siteId} />
            <SubmitButton variant="destructive" text="Excluir Artigo" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
