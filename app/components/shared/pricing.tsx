import { createSubscription } from "@/actions/actions.service";
import { SubmitButton } from "@/components/submit-buttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "O melhor plano de preços para quem está começando.",
    benefits: [
      "1 Site",
      "Até 1000 Visitantes",
      "Até 1000 Visitantes",
      "Até 1000 Visitantes",
    ],
    priceTitle: "Grátis",
  },
  {
    id: 1,
    cardTitle: "Startup",
    cardDescription: "O melhor plano de preços para profissionais.",
    priceTitle: "$29",
    benefits: [
      "Sites Ilimitados",
      "Visitantes Ilimitados",
      "Visitantes Ilimitados",
      "Visitantes Ilimitados",
    ],
  },
];

export function PricingTable() {
  return (
    <>
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-semibold text-primary">Preços</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Planos de Preços para todos e todos os orçamentos!
        </h1>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
  Oferecemos planos de assinatura flexíveis para atender às suas necessidades. Se você está começando ou já é um profissional experiente, temos a solução ideal para você. Escolha o plano que mais se adapta ao seu negócio e aproveite todos os benefícios de nossa plataforma, incluindo sites ilimitados, visitantes sem restrições e muito mais. Comece agora e leve sua presença online para o próximo nível!
</p>
      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Startup</h3>

                    <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">
                      Mais popular
                    </p>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {item.priceTitle}
              </p>

              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="size-5 text-primary" />

                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full" action={createSubscription}>
                  <SubmitButton text="Comprar Plano" className="mt-5 w-full" />
                </form>
              ) : (
                <Button variant="outline" className="mt-5 w-full" asChild>
                  <Link href="/dashboard">Tentar grátis</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
