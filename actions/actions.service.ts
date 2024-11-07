"use server";
import { currentUser } from "@/utils/current-user";
import { parseWithZod } from "@conform-to/zod";
import { siteCreationSchema, siteSchema } from "@/schemas/site.schema";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { postSchema } from "@/schemas/post.schema";
import { stripe } from "@/utils/stripe";

export async function createSiteAction(prevState: any, formData: FormData) {
  const { user } = await currentUser();

  const [subStatus, sites] = await Promise.all([
    prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        status: true,
      },
    }),
    prisma.site.findMany({
      where: {
        userId: user.id,
      },
    }),
  ]);

  if (!subStatus || subStatus.status !== "active") {
    if (sites.length < 1) {
      const submission = await parseWithZod(formData, {
        schema: siteCreationSchema({
          async isSubdirectoryUnique() {
            const existingSubDirectory = await prisma.site.findUnique({
              where: {
                subdirectory: formData.get("subdirectory") as string,
              },
            });
            return !existingSubDirectory;
          },
        }),
        async: true,
      });

      if (submission.status !== "success") {
        return submission.reply();
      }

      await prisma.site.create({
        data: {
          description: submission.value.description,
          name: submission.value.name,
          subdirectory: submission.value.subdirectory,
          userId: user.id,
        },
      });

      return redirect("/dashboard/sites");
    } else {
      return redirect("/dashboard/pricing");
    }
  } else if (subStatus.status === "active") {
    const submission = await parseWithZod(formData, {
      schema: siteCreationSchema({
        async isSubdirectoryUnique() {
          const existingSubDirectory = await prisma.site.findUnique({
            where: {
              subdirectory: formData.get("subdirectory") as string,
            },
          });
          return !existingSubDirectory;
        },
      }),
      async: true,
    });

    if (submission.status !== "success") {
      return submission.reply();
    }

    await prisma.site.create({
      data: {
        description: submission.value.description,
        name: submission.value.name,
        subdirectory: submission.value.subdirectory,
        userId: user.id,
      },
    });
    return redirect("/dashboard/sites");
  }
}

export async function createPostAction(prevState: any, formData: FormData) {
  const { user } = await currentUser();
  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const { articleContent, title, slug, coverImage, smallDescription } =
    submission.value;
  await prisma.post.create({
    data: {
      title,
      slug,
      image: coverImage,
      smallDescription,
      articleContent: JSON.parse(articleContent),
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function deletePost(formData: FormData) {
  const { user } = await currentUser();

  const data = await prisma.post.delete({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function editPostActions(prevState: any, formData: FormData) {
  const { user } = await currentUser();

  const submission = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.post.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function updateImage(formData: FormData) {
  const { user } = await currentUser();

  await prisma.site.update({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
    data: {
      imageUrl: formData.get("imageUrl") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function deleteSite(formData: FormData) {
  const { user } = await currentUser();

  await prisma.site.delete({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
  });

  return redirect("/dashboard/sites");
}

export async function createSubscription() {
  const { user } = await currentUser();

  let stripeUserId = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      customerId: true,
      email: true,
      firstName: true,
    },
  });

  if (!stripeUserId?.customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: stripeUserId?.email,
      name: stripeUserId?.firstName,
    });

    stripeUserId = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        customerId: stripeCustomer.id,
      },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeUserId.customerId as string,
    mode: "subscription",
    currency: "brl",
    billing_address_collection: "auto",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    customer_update: {
      address: "auto",
      name: "auto",
    },
    shipping_address_collection: {
      allowed_countries: ["BR"],
    },
    success_url:
      process.env.NODE_ENV === "production"
        ? `${process.env.ENDPOINT_PROD_URL}/dashboard/payment/success`
        : `${process.env.ENDPOINT_LOCAL_URL}/dashboard/payment/success`,
    cancel_url:
      process.env.NODE_ENV === "production"
        ? `${process.env.ENDPOINT_PROD_URL}/dashboard/payment/cancelled`
        : `${process.env.ENDPOINT_LOCAL_URL}/dashboard/payment/cancelled`,
  });

  return redirect(session.url as string);
}
