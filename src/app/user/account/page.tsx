// src/app/user/account/page.tsx
'use client'; // This page needs client-side interactivity

import React, {FC, useState, useEffect} from 'react';
import {useAuth} from '@/hooks/useAuth'; // Adjusted path
import {getUserProfile, updateUserProfile, updateUserEmail, updateUserPassword} from '@/api/users'; // Adjusted path
import {UserProfileDto, UpdateUserProfileDto, UpdateEmailDto, UpdatePasswordDto} from '@/types';
import {Button, Card, Divider, Flex, Form, Input, Modal, notification, NotificationArgsProps, Space, Spin} from "antd"; // Adjusted path
type NotificationPlacement = NotificationArgsProps['placement'];
import {Typography} from 'antd';

const {Title} = Typography;

const UserAccountPage: FC = () => {
    const {user, login: authLogin} = useAuth();
    const [profile, setProfile] = useState<UserProfileDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false); // State to toggle edit mode for profile fields
    const [emailModalVisible, setEmailModalVisible] = useState(true);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    // State for form inputs
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [api, contextHolder] = notification.useNotification();

    const [message, setMessage] = useState('');
    const [description, setDescription] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [placement, setPlacement] = useState<NotificationPlacement>('top');

    const openNotification = (placement: NotificationPlacement, message: string, description: string) => {
        console.log(message);
        setMessage(message);
        setDescription(description);
        setPlacement(placement);
        setShowNotification(true);
    };
    useEffect(() => {
        if (showNotification)
            api.info({
                message: message,
                description: description,
                placement,
            });
        setMessage('')
        setDescription('')
        setPlacement('top')
        setShowNotification(false)
    }, [message, description, showNotification, api]);

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
                setNewEmail(fetchedProfile.email || '');
            } catch (err: any) {
                setError(err.message || 'Failed to fetch user profile.');
                // alert(`Error: ${err.message || 'Failed to fetch user profile.'}`);
                openNotification("top", 'Error: ', err.message || 'Failed to fetch user profile.');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user]);


    const handleProfileUpdate = async (e: React.FormEvent) => {
        console.log('sucess');
        setLoading(true);
        setError(null);
        try {
            const updateData: UpdateUserProfileDto = {
                nama_Peminjam: name,
                no_Telp: phone || undefined,
                alamat: address || undefined,
            };

            if (user) {
                const {email} = user;
                if (email !== newEmail) {
                    const emailUpdateData: UpdateEmailDto = {newEmail};
                    await updateUserEmail(emailUpdateData);
                    // alert('Email Updated: Your email address has been successfully updated. You may need to re-login.');
                }

            }
            await updateUserProfile(updateData);
            // alert('Profile Updated: Your profile information has been successfully updated.');
            openNotification('top', 'Profile Updated:', 'Your profile information has been successfully updated.')
            setEditMode(false);
            if (profile) {
                setProfile({...profile, ...updateData, email: newEmail});
                if (user && (user.name !== name || user.email !== newEmail)) {
                    authLogin(user.token, user.userId, name, newEmail, user.role);
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


    const handlePasswordUpdate = async () => {
        // e.preventDefault();
        setLoading(true);
        setError(null);

        if (newPassword !== confirmNewPassword) {
            openNotification('top', 'Error : ', 'New passwords do not match.')
            setLoading(false);
            return;
        }
        // if (newPassword.length < 6) {
        //     openNotification('top', 'Error : ', 'New password must be at least 6 characters long.')
        //     setLoading(false);
        //     return;
        // }

        try {
            const updateData: UpdatePasswordDto = {
                currentPassword,
                newPassword,
            };
            await updateUserPassword(updateData);
            openNotification('top', 'Password Updated: ', 'Your password has been successfully updated.')
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

    // const handleOk = async () => {
    //     setConfirmLoading(true);
    //     setTimeout(async () => {
    //         await handlePasswordUpdate();
    //         setPasswordModalVisible(false);
    //         setEmailModalVisible(false);
    //         setConfirmLoading(false);
    //     }, 2000);
    // };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setPasswordModalVisible(false);
        setEmailModalVisible(false);
    };

    if (loading || !profile) {
        return <Spin fullscreen/>;
    }

    return (
        <div>
            {contextHolder}
            <Title level={3} type={'secondary'}>
                Account Info
            </Title>
            <Space direction="vertical" size="middle" style={{display: 'flex'}}>
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
                                    defaultValue={profile.nama_Peminjam}
                                    onChange={x => {
                                        setName(x.target.value);
                                    }}
                                />
                            ) : (
                                <p>{profile.nama_Peminjam}</p>)
                            }
                        </Form.Item>
                        <Divider/>
                        <Form.Item
                            label="Email">
                            {editMode ? (
                                <Input
                                    defaultValue={profile.email}
                                    onChange={x => {
                                        setNewEmail(x.target.value);
                                    }}
                                />
                            ) : (
                                <p>{profile.email}</p>
                            )
                            }
                        </Form.Item>
                        <Divider/>
                        <Form.Item
                            label="Phone Number"
                        >
                            {editMode ? (
                                <Input
                                    defaultValue={profile.no_Telp}
                                    onChange={x => {
                                        setPhone(x.target.value);
                                    }}
                                />
                            ) : (
                                <p>{profile.no_Telp}</p>)
                            }
                        </Form.Item>
                        <Divider/>
                        <Form.Item
                            label="Address">
                            {editMode ? (
                                <Input.TextArea
                                    defaultValue={profile.alamat}
                                    onChange={x => {
                                        setAddress(x.target.value);
                                    }}
                                />
                            ) : (
                                <p>{profile.alamat}</p>)
                            }
                        </Form.Item>
                        {editMode ? (
                            <Flex justify={'flex-end'}>
                                <Space.Compact>
                                    <Button block color={'primary'}
                                            variant={"solid"}
                                            htmlType="submit">
                                        Save
                                    </Button>

                                    <Button block color={'default'} onClick={() => setEditMode(false)}>
                                        Cancel
                                    </Button>
                                </Space.Compact>
                            </Flex>
                        ) : (
                            <Button block color={'primary'} variant={'outlined'} onClick={() => setEditMode(true)}>
                                Edit Profile
                            </Button>
                        )}

                    </Form>
                </Card>
                <Card
                    title={'Security Settings'}
                >
                    <Form
                        colon={false}
                        labelAlign={'left'}
                        labelCol={{span: 12}}
                        wrapperCol={{span: 12}}
                    >

                        <Form.Item
                            label="Password">
                            <Button block color={'primary'} variant={'outlined'}
                                    onClick={() => setPasswordModalVisible(true)}>
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>

            {/* Password Update Modal */}
            {passwordModalVisible && (
                <Modal
                    title="Change Password"
                    open={passwordModalVisible}
                    // onOk={handleOk}
                    okText="Confirm"
                    okButtonProps={{htmlType: 'submit'}}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    destroyOnHidden
                    modalRender={(dom) => (
                        <Form
                            onFinish={handlePasswordUpdate}
                            labelCol={{span: 4}}
                            wrapperCol={{span: 20}}
                            layout="vertical"

                        >
                            {dom}
                            </Form>
                        )}
                >

                            <Form.Item
                                label="Current Password"
                                name="currentPassword"
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your current password!'
                                    }
                                ]}
                            >
                                <Input.Password
                                    onChange={x => {setCurrentPassword(x.target.value);}}
                                />
                            </Form.Item>
                            <Form.Item
                                label="New Password"
                                name="newPassword"
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input new password!'
                                    },
                                    ({  }) => ({
                                        validator(_, value) {
                                            if (!value || (value as string).length >= 6) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password must be at least 6 characters long!'));
                                        },
                                    })
                                ]}
                            >
                                <Input.Password
                                onChange={x => {setNewPassword(x.target.value);}}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Confirm New Password"
                                name="confirmPassword"
                                labelCol={{span: 24}}
                                wrapperCol={{span: 24}}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                onChange={x => {setConfirmNewPassword(x.target.value);}}
                                />
                            </Form.Item>

                </Modal>
            )}
            {loading && <Spin fullscreen/>}
        </div>
    );
};

export default UserAccountPage;
