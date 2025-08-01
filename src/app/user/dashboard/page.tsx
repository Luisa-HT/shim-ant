// src/app/user/dashboard/page.tsx
'use client'; // This page needs client-side interactivity

import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { getMyBookingHistory } from '@/api/bookings'; // Adjusted path
import { BookingHistoryDto, PaginatedResponse, PaginationParams } from '@/types'; // Adjusted path
import { formatDateTime, formatRupiah } from '@/utils/helpers';
import {Spin, Table, Typography, TableProps, Empty, Button} from "antd";
import StatusTag from "@/components/StatusTag";

const { Title } = Typography;
const UserDashboardPage: FC = () => {
    const [bookingHistory, setBookingHistory] = useState<BookingHistoryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination] = useState<PaginationParams>({ pageNumber: 1, pageSize: 5 }); // Show 5 recent bookings


    useEffect(() => {
        const fetchBookingHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const response: PaginatedResponse<BookingHistoryDto> = await getMyBookingHistory(pagination);
                setBookingHistory(response.items);
            } catch (asyncErr: unknown) {
                const err = asyncErr as Error;
                setError(err.message || 'Failed to fetch booking history.');
                alert(`Error: ${err.message || 'Failed to fetch booking history.'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, [pagination]);

    const  columns : TableProps<BookingHistoryDto>['columns']=[
        {
            title : 'ITEM NAME',
            dataIndex : 'nama_Barang',
            key: 'nama_Barang',
        },

        {
            title : 'TIME OF BOOKING',
            key: 'timeofBooking',
            render: (_, record) => (
                <span>
                    {`${formatDateTime(record.start_Date)} - ${formatDateTime(record.end_Date)}`}
                </span>
            ),
        },

        {
            title : 'STATUS',
            dataIndex : 'status_Peminjaman',
            key: 'status_Peminjaman',
            render: (status) => <StatusTag status={status ?? ""} />,
        },

        {
            title : 'ACTION',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="link"
                    onClick={() => alert(`Viewing details for booking ID: ${record.id_Peminjaman}\nReason: ${record.deskripsi || 'N/A'}\nFine: ${formatRupiah(record.denda)}`)}
                >
                    View Details
                </Button>
            ),
        }
    ];
    return (
        <div>
            <div>
            {/*<h1 >Welcome, {user?.name || 'User'}!</h1>*/}
            </div>
            <div >
                <Title level={2}>Recent Bookings</Title>
                {loading ? (
                    <Spin/>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : bookingHistory.length === 0 ? (
                    <Empty
                        description={
                            <Typography.Text>
                                No recent bookings found.
                            </Typography.Text>
                    }
                    > </Empty>
                ) : (
                    <div>
                    <div className="overflow-x-auto">
                    <Table

                        columns={columns}
                        dataSource={bookingHistory}
                        loading={loading}
                        rowKey="id_Peminjaman"
                        pagination={false}/>
                    </div>
                    <div className="text-right mt-4">

                        <Button
                        href="/user/bookings/history"
                        type="link"
                        >
                            View All Booking History

                        </Button>
                    </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default UserDashboardPage;