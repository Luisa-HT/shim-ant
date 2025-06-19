"use client"

import PrivateLayout from "@/components/PrivateLayout";
import React from "react";

export default function UserLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <PrivateLayout>
            {children}
        </PrivateLayout>
    );
}