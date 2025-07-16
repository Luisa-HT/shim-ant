// src/app/user/bookings/history/page.tsx
'use client'; // This page needs client-side interactivity

import React, {FC, useState, useEffect} from 'react';
import PrivateLayout from '@/components/PrivateLayout'; // Adjusted path
import LoadingSpinner from '@/components/LoadingSpinner'; // Adjusted path
import StatusTag from '@/components/StatusTag'; // Adjusted path
// import Pagination from '@/components/Pagination'; // Adjusted path
import {getMyBookingHistory} from '@/api/bookings'; // Adjusted path
import {BookingHistoryDto, PaginatedResponse, PaginationParams} from '@/types'; // Adjusted path
import {formatDateTime, formatRupiah} from '@/utils/helpers';
import {Empty, Spin, Table, TableProps, Typography} from "antd"; // Adjusted path
import type {PaginationProps} from 'antd';
import {Pagination} from 'antd';
const { Title } = Typography;

const UserBookingHistoryPage: FC = () => {
    const [bookingHistory, setBookingHistory] = useState<BookingHistoryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationParams>({pageNumber: 1, pageSize: 10});
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchBookingHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const response: PaginatedResponse<BookingHistoryDto> = await getMyBookingHistory(pagination);
                setBookingHistory(response.items);
                setTotalRecords(response.totalRecords);
                setTotalPages(response.totalPages);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch booking history.');
                alert(`Error: ${err.message || 'Failed to fetch booking history.'}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, [pagination]);

    // const handlePageChange = (page: number, pageSize: number) => {
    //     setPagination({ pageNumber: page, pageSize: pageSize });
    // };
    //
    // const paginatedResponseForComponent: PaginatedResponse<BookingHistoryDto> = {
    //     items: bookingHistory,
    //     pageNumber: pagination.pageNumber || 1,
    //     pageSize: pagination.pageSize || 10,
    //     totalRecords: totalRecords,
    //     totalPages: totalPages,
    //     hasPreviousPage: (pagination.pageNumber || 1) > 1,
    //     hasNextPage: (pagination.pageNumber || 1) < totalPages,
    // };
    const columns: TableProps<BookingHistoryDto>['columns'] = [
            {
                title: 'ITEM NAME',
                dataIndex: 'nama_Barang',
                key: 'nama_Barang',
            },

            {
                title: 'TIME OF BOOKING',
                key: 'timeofBooking',
                render: (_, record) => (
                    <span>
                    {`${formatDateTime(record.start_Date)} - ${formatDateTime(record.end_Date)}`}
                </span>
                ),
            },

            {
                title: 'STATUS',
                dataIndex: 'status_Peminjaman',
                key: 'status_Peminjaman',
                render: (status) => <StatusTag status={status ?? ""}/>,
            },

            {
                title: 'REASON',
                key: 'reason',
                dataIndex: 'deskripsi',
            },
            {
                title: 'REQUEST DATE',
                key: 'requestedDate',
                render: (_, record) =>
                    <span>{record.tanggal_Pengajuan ? formatDateTime(record.tanggal_Pengajuan) : 'N/A'}</span>
            },
            {
                title: 'APPROVAL DATE',
                key: 'approvalDate',
                render: (_, record) =>
                    <span>{record.tanggal_Approval ? formatDateTime(record.tanggal_Approval) : 'N/A'}</span>
            },
            {
                title: 'RETURN DATE',
                key: 'returnDate',
                render: (_, record) =>
                    <span>{record.tanggal_Pengembalian_Aktual ? formatDateTime(record.tanggal_Pengembalian_Aktual) : 'N/A'}</span>
            },
            {
                title: 'FINE',
                key: 'fine',
                render: (_, record) =>
                    <span>{record.denda ? formatRupiah(record.denda) : 'N/A'}</span>

            },
            {
                title: 'DECLINE REASON',
                key: 'declineReason',
                align: 'center',
                render: (_, record) =>
                    <span>{record.alasan_Penolakan ? record.alasan_Penolakan : ' - '}</span>
            }
        ]
    ;
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div>
                <Title level={2}>Booking History</Title>
                {loading ? (
                    <Spin/>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : bookingHistory.length === 0 ? (
                    <Empty
                        description={
                            <Typography.Text>
                                No bookings found.
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

                    </div>
                    )}
                </div>
            {totalRecords > 0 && (
                // <Pagination
                //     paginationData={paginatedResponseForComponent}
                //     onPageChange={handlePageChange}
                // />
                <Pagination
                    pageSize={10}
                    total={totalRecords}
                />
            )}
        </div>
    );
};

export default UserBookingHistoryPage;
