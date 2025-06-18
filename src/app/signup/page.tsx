// src/app/signup/page.tsx
'use client'; // This page needs client-side interactivity

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/authLayout'; // Adjusted path
import { signup as apiSignup } from '@/api/auth'; // Adjusted path
import { useAuth } from '@/hooks/useAuth'; // Adjusted path
import { SignUpRequestDto } from '@/types';
import {Button, Card, Form, FormProps, Input, Spin} from "antd"; // Adjusted path

const SignUpPage: FC = () => {
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState(''); // Maps to No_Telp (Field E)
    // const [address, setAddress] = useState(''); // Maps to Alamat (Field F)
    const [loading, setLoading] = useState(false);
    const { login: authLogin } = useAuth();
    const router = useRouter();

    type FieldType = {
        name: string;
        email: string;
        password: string;
        confirmPassword: string;
        phoneNumber: string;
        address: string;
    }

    const onFinish : FormProps<FieldType>["onFinish"] = async (values) => {
        console.log('Received values of form: ', values);
        const {name, email, password,confirmPassword, phoneNumber, address} = values;
        setLoading(true);

        if (password !== confirmPassword) {
            setLoading(false);
            return;
        }
        if (password.length < 6) {
            setLoading(false);
            return;
        }

        const signupData: SignUpRequestDto = {
            nama_Peminjam: name,
            email: email,
            password: password,
            no_Telp: phoneNumber || undefined, // Optional
            alamat: address || undefined,     // Optional
        };

        try {
            const response = await apiSignup(signupData);
            authLogin(response.token, response.userId, response.name, response.email, response.role);

            alert(`Sign Up Successful! Welcome, ${response.name}!`); // Using alert for notifications
            router.push('/user/dashboard'); // New users are typically regular users
        } catch (err: unknown) {
            alert(`Sign Up Failed: ${(err as Error).message || 'An unexpected error occurred.'}`);
        } finally {
            setLoading(false);
        }
    };
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    return (
        <AuthLayout>
            <Card title={"Sign Up"}>
                <Form
                    {...formItemLayout}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86'}}
                    style={{maxWidth: 600}}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Full name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        {...tailFormItemLayout}>
                        <Button block type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                        <a href="/login">Already have an account?</a>
                    </Form.Item>
                </Form>
            </Card>
            {loading && <Spin fullscreen/>}
        </AuthLayout>
    );
};

export default SignUpPage;