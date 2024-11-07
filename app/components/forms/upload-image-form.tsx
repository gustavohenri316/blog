"use client";

import { updateImage } from "@/actions/actions.service";
import { SubmitButton } from "@/components/submit-buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";

import { toast } from "sonner";

interface iAppProps {
  siteId: string;
}

export function UploadImageForm({ siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Imagem do Site</CardTitle>
        <CardDescription>
          Personalize a imagem que representa o seu site. Você pode alterá-la aqui a qualquer momento.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <div className="flex justify-center">
            <Image
              src={imageUrl}
              alt="Imagem do Site Enviada"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setImageUrl(res[0].url);
                toast.success("Imagem carregada com sucesso.");
              }}
              onUploadError={() => {
                toast.error("Ocorreu um erro ao carregar a imagem.");
              }}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {imageUrl && (
          <form action={updateImage}>
            <input type="hidden" name="siteId" value={siteId} />
            <input type="hidden" name="imageUrl" value={imageUrl} />
            <SubmitButton text="Atualizar Imagem" />
          </form>
        )}
      </CardFooter>
    </Card>
  );
}
