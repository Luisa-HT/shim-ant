// src/app/login/page.tsx
'use client'; // This page needs client-side interactivity

import React, { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/authLayout'; // Adjusted path for App Router
import { login as apiLogin } from '@/api/auth'; // Adjusted path
import { useAuth } from '@/hooks/useAuth';
import {Button, Card, Form, FormProps, Input, Spin} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {Content} from "antd/es/layout/layout"; // Adjusted path

const LoginPage: FC = () => {

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login: authLogin } = useAuth();
    const router = useRouter();

    type FieldType ={
        email: string;
        password: string;
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async ({email, password}) => {
        console.log('Success:', {email, password});
        setError(null);
        setLoading(true);

        try {
            const response = await apiLogin({ email, password });
            authLogin(response.token, response.userId, response.name, response.email, response.role);

            alert(`Login Successful! Welcome, ${response.name}!`); // Using alert as per previous instruction for notifications

            if (response.role === 'Admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/user/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            alert(`Login Failed: ${err.message || 'An unexpected error occurred.'}`);
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <AuthLayout>
            <Card title={'Login'}>
                <Form
                    name="login"
                    style={{ maxWidth: 560}}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />

                    </Form.Item>

                    <Form.Item<FieldType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                         <a href="/signup">Don&#39;t have an account?</a>
                    </Form.Item>
                </Form>
            </Card>
            {loading && <Spin fullscreen />}
        </AuthLayout>
    );
};

export default LoginPage;