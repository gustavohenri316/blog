"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Atom } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { useActionState, useState } from "react";
import { JSONContent } from "novel";
import { useForm, type SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import slugify from "react-slugify";
import { postSchema } from "@/schemas/post.schema";
import TailwindEditor from "@/components/editor-wrapper";
import { SubmitButton } from "@/components/submit-buttons";
import { UploadDropzone } from "@/utils/uploadthing";

interface iAppProps {
  handle: (
    prevState: any,
    formData: FormData,
  ) => Promise<SubmissionResult<string[]>>;
  data?: {
    slug: string;
    title: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
  siteId: string;
}

export function ArticleForm({ data, siteId, handle }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(data?.image);
  const [value, setValue] = useState<JSONContent | undefined>(data?.articleContent);
  const [slug, setSlugValue] = useState<undefined | string>(data?.slug);
  const [title, setTitle] = useState<undefined | string>(data?.title);

  const [lastResult, action] = useActionState(handle, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleSlugGeneration() {
    const titleInput = title;

    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Por favor, crie um título primeiro");
    }

    setSlugValue(slugify(titleInput));

    return toast.success("Slug foi gerado com sucesso");
  }

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Detalhes do Artigo</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec justo id felis tincidunt fermentum non eget dui.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-6"
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
        >
          <input type="hidden" name="articleId" value={data?.id} />
          <input type="hidden" name="siteId" value={siteId} />
          
          <div className="grid gap-2">
            <Label>Título</Label>
            <Input
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              placeholder="Aplicativo de blog em Next.js"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="text-sm text-red-500">{fields.title.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input
              key={fields.slug.key}
              name={fields.slug.name}
              defaultValue={fields.slug.initialValue}
              placeholder="Slug do Artigo"
              onChange={(e) => setSlugValue(e.target.value)}
              value={slug}
            />
            <Button
              onClick={handleSlugGeneration}
              className="w-fit"
              variant="secondary"
              type="button"
            >
              <Atom className="mr-2 size-4" /> Gerar Slug
            </Button>
            <p className="text-sm text-red-500">{fields.slug.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Descrição Curta</Label>
            <Textarea
              key={fields.smallDescription.key}
              name={fields.smallDescription.name}
              defaultValue={data?.smallDescription}
              placeholder="Descrição curta para seu artigo de blog..."
              className="h-32"
            />
            <p className="text-sm text-red-500">{fields.smallDescription.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Imagem de Capa</Label>
            <input
              type="hidden"
              name={fields.coverImage.name}
              key={fields.coverImage.key}
              defaultValue={fields.coverImage.initialValue}
              value={imageUrl}
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Imagem Enviada"
                className="h-[200px] w-[200px] rounded-lg object-cover"
                width={200}
                height={200}
              />
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].url);
                  toast.success("Imagem carregada com sucesso");
                }}
                endpoint="imageUploader"
                onUploadError={() => {
                  toast.error("Ocorreu um erro ao carregar a imagem...");
                }}
              />
            )}

            <p className="text-sm text-red-500">{fields.coverImage.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Conteúdo do Artigo</Label>
            <input
              type="hidden"
              name={fields.articleContent.name}
              key={fields.articleContent.key}
              defaultValue={fields.articleContent.initialValue}
              value={JSON.stringify(value)}
            />
            <TailwindEditor onChange={setValue} initialValue={value} />
            <p className="text-sm text-red-500">{fields.articleContent.errors}</p>
          </div>

          <SubmitButton text="Editar Artigo" />
        </form>
      </CardContent>
    </Card>
  );
}
