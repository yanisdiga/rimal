"use client";

import { usePathname } from "next/navigation";
import { NavbarAndMenu } from "./Menu";
import type { ModeleVoiture } from "@prisma/client";

interface NavbarWrapperProps {
    voitures: ModeleVoiture[];
}

export default function NavbarWrapper({ voitures }: NavbarWrapperProps) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) return null;

    return <NavbarAndMenu voitures={voitures} />;
}