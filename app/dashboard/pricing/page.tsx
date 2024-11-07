import { PricingTable } from "@/app/components/shared/pricing";
import { SubmitButton } from "@/components/submit-buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@/utils/current-user";
import prisma from "@/utils/db";
import { stripe } from "@/utils/stripe";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      user: {
        select: {
          customerId: true,
        },
      },
    },
  });

  return data;
}

export default async function PricingPage() {
  const { user } = await currentUser();
  const data = await getData(user.id);

  async function createCustomerPortal() {
    "use server";

    const session = await stripe.billingPortal.sessions.create({
      customer: data?.user?.customerId as string,
      return_url:
        process.env.NODE_ENV === "production"
          ? `${process.env.ENDPOINT_PROD_URL}/dashboard`
          : `${process.env.ENDPOINT_LOCAL_URL}/dashboard`,
    });

    return redirect(session.url);
  }

  if (data?.status === "active") {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Editar Assinatura</CardTitle>
          <CardDescription>
            Clique no botão abaixo, isso lhe dará a oportunidade de
            alterar seus dados de pagamento e visualizar sua fatura ao
            mesmo tempo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCustomerPortal}>
            <SubmitButton text="Ver Detalhes da Assinatura" />
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <PricingTable />
    </div>
  );
}
