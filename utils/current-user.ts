import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { KindeRoles, KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { redirect } from "next/navigation";

export const currentUser = async (): Promise<{
  user: KindeUser<Record<string, any>>;
  role: "USER" | "ADMIN" | null;
}> => {
  const { getUser, getRoles } = getKindeServerSession();
  const user = await getUser();
  const roles = await getRoles();
  const userRole: "USER" | "ADMIN" | null =
    (roles?.[0].key as "USER" | "ADMIN" | null) ?? null;

  if (!user) return redirect("/api/auth/login");

  return {
    user,
    role: userRole ?? null,
  };
};
