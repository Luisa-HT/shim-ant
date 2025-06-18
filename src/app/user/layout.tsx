"use client"
import {AuthProvider} from "@/contexts/AuthContext";
import {AntdRegistry} from "@ant-design/nextjs-registry";
import privateLayout from "@/components/privateLayout";
import PrivateLayout from "@/components/privateLayout";

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