import { currentUser } from "@/utils/current-user";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  const { user, role } = await currentUser();

  if (!user || user === null || !user.id) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        role: role ?? "USER",
      },
    });
  }

  if (role !== dbUser.role) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: role ?? "USER" },
    });
  }

  return NextResponse.redirect(`${process.env.ENDPOINT_LOCAL_URL}/dashboard`);
}
