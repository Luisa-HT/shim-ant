// src/app/user/bookings/make/page.tsx
'use client'; // This page needs client-side interactivity

import React, {FC, useState, useEffect, useMemo} from 'react';
import { useRouter } from 'next/navigation';
import PrivateLayout from '@/components/PrivateLayout'; // Adjusted path
import { createBooking } from '@/api/bookings'; // Adjusted path
import { getAvailableInventory } from '@/api/inventory'; // Adjusted path
import { CreateBookingRequestDto, BarangDto, PaginationParams, PaginatedResponse } from '@/types';
import {Button, Cascader, DatePicker, Form, Input, Select, Spin} from "antd";
import {Typography} from 'antd';
import TextArea from "antd/es/input/TextArea";

const {Title} = Typography;


const MakeBookingPage: FC = () => {
    const [selectedItem, setSelectedItem] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [items, setItems] = useState<BarangDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [itemsLoading, setItemsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    useEffect(() => {
        const fetchAvailableItems = async () => {
            setItemsLoading(true);
            setError(null);
            try {
                const response: PaginatedResponse<BarangDto> = await getAvailableInventory({ pageNumber: 1, pageSize: 1000 });
                setItems(response.items);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch available items.');
                alert(`Error: ${err.message || 'Failed to fetch available items.'}`);
            } finally {
                setItemsLoading(false);
            }
        };

        fetchAvailableItems();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        setError(null);
        setLoading(true);
        console.log(e);

        if (!selectedItem || !startDate || !endDate || !reason) {
            setError('Please fill all required fields.');
            setLoading(false);
            return;
        }
        console.log('here');

        const bookingData: CreateBookingRequestDto = {
            id_Barang: parseInt(selectedItem),
            start_Date: new Date(startDate).toISOString(),
            end_Date: new Date(endDate).toISOString(),
            deskripsi: reason,
        };

        try {
            await createBooking(bookingData);
            alert('Booking Request Submitted: Your request has been successfully submitted for review.');
            router.push('/user/bookings/history');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred during booking.');
            alert(`Booking Failed: ${err.message || 'An unexpected error occurred.'}`);
        } finally {
            setLoading(false);
        }
    };
    const itemOptions = useMemo(() =>
            items.map((item) => ({
                value: item.id_Barang,
                label: `${item.nama_Barang} (${item.status_Kondisi})`,
            })),
        [items]);
    return (
        <div>
            <Title level={3}>Make a Booking</Title>
            <Form
                onFinish={handleSubmit}
                layout={'vertical'}

            >

                <Form.Item
                    label="Item"
                >
                    <Select
                    options={itemOptions}
                    placeholder={'Select an Item'}
                    onChange={(e) => setSelectedItem(e)}
                    />
                </Form.Item>
                <Form.Item label="Date & Time">
                <Form.Item
                    style={{display: 'inline-block', width: '100%'}}
                    // label="Start Date & Time"
                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
                    onChange={(e) => setStartDate(e.toISOString())}
                    />
                </Form.Item>
                <Form.Item
                    // label="End Date & Time"
                    style={{display: 'inline-block', width: '100%'}}

                >
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"
                                onChange={(e) => setEndDate(e.toISOString())}
                    />
                </Form.Item>
                </Form.Item>
                <Form.Item
                label="Reason"
                >
                    <Input.TextArea onChange={(e) => setReason(e.target.value)}/>

                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            {(loading || itemsLoading) && <Spin fullscreen />}
        </div>
    );
};

export default MakeBookingPage;