// src/components/PrivateLayout.tsx
'use client'; // This component needs client-side interactivity

import React, {createContext, FC, ReactNode, useState} from 'react';

import { useAuth } from '../hooks/useAuth';
import TopBar from "@/components/topBar";
import {Layout, theme} from "antd";
import Sidebar from "@/components/sidebar";
import {Content} from "antd/es/layout/layout"; // To check if user is authenticated at all

interface PrivateLayoutProps {
    children: ReactNode;
}


const PrivateLayout: FC<PrivateLayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { isAuthenticated, isLoading, user } = useAuth(); // Check authentication state


    const handleCollapse = (isCollapsed: boolean) => {
        setCollapsed(isCollapsed);
    };

    // If not authenticated or still loading, don't render the private layout.
    // The parent layout (e.g., admin/layout.tsx or a future user/layout.tsx)
    // or a ProtectedRoute component should handle redirection.
    // if (isLoading || !isAuthenticated) {
    //     return null; // Or a simple loading state if this is the top-most protected layout
    // }
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();


    return (
        <Layout style={{minHeight: "100vh"}}>
            <TopBar nameProp={user ? user.name : "Name"}></TopBar>
            <Layout style={{height: "100%"}}>
                <Sidebar></Sidebar>
                <Layout style={{padding: '24px 24px 24px'}}>

                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default PrivateLayout;