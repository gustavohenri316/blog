import { deleteSite } from "@/actions/actions.service";
import { UploadImageForm } from "@/app/components/forms/upload-image-form";
import { SubmitButton } from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function SettingsSiteRoute({
  params,
}: {
  params: Promise<{ siteId: string }>;
}) {
  const { siteId } = await params;
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon">
          <Link href={`/dashboard/sites/${siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Voltar</h3>
      </div>

      <UploadImageForm siteId={siteId} />

      <Card className="border-red-500 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-500">Perigo</CardTitle>
          <CardDescription>
            Isso irá deletar seu site e todos os artigos associados a ele.
            Clique no botão abaixo para deletar tudo
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={deleteSite}>
            <input type="hidden" name="siteId" value={siteId} />
            <SubmitButton text="Deletar Tudo" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
