"use client";
import { navLinks } from "@/app/dashboard/layout";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export default function DashboardItems({}: Readonly<Props>) {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className={cn(
            pathname === item.href
              ? "bg-muted text-primary"
              : "bg-none text-muted-foreground",
            "flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary/70",
          )}
        >
          <item.icon className="mr-3 size-4" />
          {item.name}
        </Link>
      ))}
    </>
  );
}
