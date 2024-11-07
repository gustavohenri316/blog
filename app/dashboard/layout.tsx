import Link from "next/link";
import React, { type ReactNode } from "react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import DashboardItems from "../components/dashboard/dashboard-items";
import {
  CircleUser,
  DollarSign,
  ExternalLink,
  Globe,
  Home,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

type Props = {
  children: ReactNode;
};

export const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Sites", href: "/dashboard/sites", icon: Globe },
  { name: "Pricing", href: "/dashboard/pricing", icon: DollarSign },
];

export default async function DashboardLayout({ children }: Readonly<Props>) {
  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href={"/"} className="flex items-center gap-2 font-semibold">
              <Image src={Logo} alt="Logo" className="h-8 w-8 font-bold" />
              <h3 className="text-2xl">
                Blog<span className="text-primary">Gust</span>
              </h3>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-4">
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="ml-auto flex items-center gap-x-5">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <LogoutLink>Log Out</LogoutLink>
                  <DropdownMenuShortcut>
                    <ExternalLink />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </section>
  );
}