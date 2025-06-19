'use client';


import {Spin} from "antd";
import PrivateLayout from "@/components/PrivateLayout";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            // Still loading auth state, do nothing yet
            return;
        }

        if (!isAuthenticated) {
            // Not authenticated, redirect to login
            router.push('/login');
            return;
        }

        if (user?.role !== 'Admin') {
            // Authenticated but not an Admin, redirect to user dashboard or an unauthorized page
            alert('Access Denied: You do not have administrator privileges.');
            router.push('/user/dashboard'); // Or '/unauthorized'
            return;
        }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading || !isAuthenticated || user?.role !== 'Admin') {
        // Show a loading spinner while checking auth or if redirecting
        // We render children only when authorized to prevent flickering of unauthorized content
        return <Spin fullscreen tip="Verifying admin access..." />;
    }

    // If authenticated as Admin, render the PrivateLayout and children
    return (
        <PrivateLayout>
            {children}
        </PrivateLayout>
    );
}