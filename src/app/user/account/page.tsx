// src/app/user/account/page.tsx
'use client'; // This page needs client-side interactivity

import React, { FC, useState, useEffect } from 'react';
import PrivateLayout from '../../../../src/components/PrivateLayout'; // Adjusted path
import { useAuth } from '@/hooks/useAuth'; // Adjusted path
import { getUserProfile, updateUserProfile, updateUserEmail, updateUserPassword } from '@/api/users'; // Adjusted path
import { UserProfileDto, UpdateUserProfileDto, UpdateEmailDto, UpdatePasswordDto } from '@/types';
import {Button, Card, Divider, Flex, Form, Input, Modal, notification, NotificationArgsProps, Space, Spin} from "antd"; // Adjusted path
type NotificationPlacement = NotificationArgsProps['placement'];
import { Typography } from 'antd';
import {offset} from "antd/es/tree/utils/dropIndicator";

const { Title } = Typography;

const UserAccountPage: FC = () => {
    const { user, login: authLogin } = useAuth();
    const [profile, setProfile] = useState<UserProfileDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false); // State to toggle edit mode for profile fields
    const [emailModalVisible, setEmailModalVisible] = useState(true);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [open, setOpen] = useState(false);




    // State for form inputs
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [api, contextHolder] = notification.useNotification();



    const openNotification = (placement: NotificationPlacement, message: string, description: string) => {
        api.info({
            message: message,
            description:description,
            placement,
        });
    };

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedProfile = await getUserProfile();
                setProfile(fetchedProfile);
                setName(fetchedProfile.nama_Peminjam);
                setPhone(fetchedProfile.no_Telp || '');
                setAddress(fetchedProfile.alamat || '');
            } catch (err: any) {
                setError(err.message || 'Failed to fetch user profile.');
                // alert(`Error: ${err.message || 'Failed to fetch user profile.'}`);
                openNotification("top",'Error: ', err.message || 'Failed to fetch user profile.');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const updateData: UpdateUserProfileDto = {
                nama_Peminjam: name,
                no_Telp: phone || undefined,
                alamat: address || undefined,
            };
            await updateUserProfile(updateData);
            // alert('Profile Updated: Your profile information has been successfully updated.');
            openNotification('top', 'Profile Updated:', 'Your profile information has been successfully updated.')
            setEditMode(false);
            if (profile) {
                setProfile({ ...profile, ...updateData });
                if (user && user.name !== name) {
                    authLogin(user.token, user.userId, name, user.email, user.role);
                }
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            openNotification('top', 'Update Failed: ', err.message || 'An unexpected error occurred.')
            // alert(`Update Failed: ${err.message || 'An unexpected error occurred.'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const updateData: UpdateEmailDto = { newEmail };
            await updateUserEmail(updateData);
            openNotification('top', 'Email Updated:', 'Your email has been successfully updated.You may need to re-login.')
            // alert('Email Updated: Your email address has been successfully updated. You may need to re-login.');
            setEmailModalVisible(false);
            if (profile && user) {
                setProfile({ ...profile, email: newEmail });
                authLogin(user.token, user.userId, user.name, newEmail, user.role);
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            openNotification('top','Email Update Failed:', err.message || 'An unexpected error occurred.')
            // alert(`Email Update Failed: ${err.message || 'An unexpected error occurred.'}`);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async () => {
        // e.preventDefault();
        setLoading(true);
        setError(null);

        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            setLoading(false);
            return;
        }
        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters long.');
            setLoading(false);
            return;
        }

        try {
            const updateData: UpdatePasswordDto = {
                currentPassword,
                newPassword,
            };
            await updateUserPassword(updateData);
            openNotification('top', 'Password Updated: ','Your password has been successfully updated.')
            // alert('Password Updated: Your password has been successfully updated.');
            setPasswordModalVisible(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            openNotification('top', 'Password Update Failed: ', err.message || 'An unexpected error occurred.')
            // alert(`Password Update Failed: ${err.message || 'An unexpected error occurred.'}`);
        } finally {
            setLoading(false);
        }
    };
    // const showModal = () => {
    //     setOpen(true);
    // };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setPasswordModalVisible(false);
            setEmailModalVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setPasswordModalVisible(false);
        setEmailModalVisible(false);
    };

    if (loading || !profile) {
        return <Spin fullscreen />;
    }

    return (
        <div>
            <Title level={2}>
                Account Info
            </Title>
            <Card
                title={'Personal Info'}
            >
                <Form
                onFinish={handleProfileUpdate}
                colon={false}
                labelAlign={'left'}
                labelCol={{span: 12}}
                wrapperCol={{span: 12}}
                >

                    <Form.Item
                        label="Name">
                        {editMode ? (
                        <Input
                            value={profile.nama_Peminjam}
                        />
                        ):(
                            <p>{profile.nama_Peminjam}</p>)
                        }
                    </Form.Item>
                    <Divider/>
                    <Form.Item
                            label="Email">
                        {editMode ? (
                            <Input
                                value={profile.email}
                            />
                        ):(
                            <p>{profile.email}</p>)
                        }
                        </Form.Item>
                    <Divider/>
                    <Form.Item
                        label="Phone Number"
                    >
                        {editMode ? (
                            <Input
                                value={profile.no_Telp}
                            />
                        ):(
                            <p>{profile.no_Telp}</p>)
                        }
                    </Form.Item>
                    <Divider/>
                    <Form.Item
                        label="Address">
                        {editMode ? (
                            <Input.TextArea
                                value={profile.alamat}
                            />
                        ):(
                            <p>{profile.alamat}</p>)
                        }
                    </Form.Item>
                    {editMode ? (
                        <Flex justify={'flex-end'}>
                        <Space.Compact >
                        <Button block color={'primary'} variant ={"solid"} onClick={() => setEditMode(false)} htmlType={"submit"}>
                            Save
                        </Button>

                        <Button block color={'default'} onClick={() => setEditMode(false)}>
                        Cancel
                        </Button>
                        </Space.Compact>
                        </Flex>
                    ):(
                        <Button block color={'default'} onClick={() => setEditMode(true)}>
                            Edit Profile
                        </Button>
                        )}

                </Form>
            </Card>



            {/* Password Update Modal */}
            {passwordModalVisible && (
                <Modal
                    title="Change Password"
                    open={passwordModalVisible}
                    onOk={handleOk}
                    okText="Confirm"
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <Card>
                <Form
                    onFinish = {handlePasswordUpdate}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    layout="vertical"

                >
                    <Form.Item
                        label="Current Password"
                        name="currentPassword"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Confirm New Password"
                        name="confirmPassword"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                    </Card>
                </Modal>
            )}
            {loading && <Spin fullscreen />}
        </div>
    );
};

export default UserAccountPage;
