"use client";
import { createSiteAction } from "@/actions/actions.service";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/schemas/site.schema";
import { SubmitButton } from "@/components/submit-buttons";

export default function NewSite() {
  const [lastResult, action] = useActionState(createSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: siteSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>Criar Site</CardTitle>
          <CardDescription>
            Crie seu Site aqui. Clique no botão abaixo quando terminar...
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-2">
                <Label>Nome do Site</Label>
                <Input
                  name={fields.name.name}
                  key={fields.name.key}
                  defaultValue={fields.name.initialValue}
                  placeholder="Nome do Site"
                />
                <p className="text-sm text-red-500">{fields.name.errors}</p>
              </div>
              <div className="grid gap-2">
                <Label>Subdiretório</Label>
                <Input
                  name={fields.subdirectory.name}
                  key={fields.subdirectory.key}
                  defaultValue={fields.subdirectory.initialValue}
                  placeholder="Subdiretório"
                />
                <p className="text-sm text-red-500">
                  {fields.subdirectory.errors}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Descrição</Label>
                <Textarea
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={fields.description.initialValue}
                  placeholder="Pequena descrição para seu site"
                />
                <p className="text-sm text-red-500">
                  {fields.description.errors}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-end">
              <SubmitButton text="Criar Site" />
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
