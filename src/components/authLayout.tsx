// src/components/AuthLayout.tsx
'use client'; // This component needs client-side interactivity for navigation

import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {Col, Flex, Layout, Row, theme} from "antd";
import PublicTopBar from "@/components/publicTopBar";
import {Content} from "antd/es/layout/layout"; // For active link styling

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    // const pathname = usePathname();

    // const navLinkClasses = (path: string) =>
    //     `text-gray-700 hover:text-blue-600 text-base font-medium transition-colors ${
    //         pathname === path ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
    //     }`;
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <PublicTopBar></PublicTopBar>
            <Layout style={ {padding: '24px 24px 24px'}}>
                <Content
                        style={{
                            // padding: 10,
                            margin: 'auto',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            width: "35%",
                            height: "fit-content",
                            maxHeight: "fit-content",
                        }}
                    >
                        {children}
                    </Content>

            </Layout>
        </Layout>

    //     <Row>
        //     <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        //       Col
        //     </Col>
        //     <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        //       Col
        //     </Col>
        //     <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
        //       Col
        //     </Col>
        //   </Row>
    );
};

export default AuthLayout;