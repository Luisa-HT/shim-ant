"use client"
import {FC} from "react";
import {Tag} from "antd";

interface StatusTagProps {
    status: string; // The status string (e.g., "Pending", "Approved", "Available", "Damaged")
}

const StatusTag: FC<StatusTagProps> = ({ status }) => {
    let tagColor: string;
     // Default text is the status itself
    switch (status.toLowerCase()) {
        case 'available':
        case 'tersedia':
        case 'good':
        case 'approved':
        case 'completed':
        case 'returned':
            tagColor = "success"; // Light green background, dark green text
            break;
        case 'booked':
        case 'pending':
            tagColor = 'processing'; // Light blue background, dark blue text
            break;
        case 'declined':
        case 'unavailable':
        case 'damaged':
        case 'maintenance':
            tagColor = 'error'; // Light red background, dark red text
            break;
        default:
            tagColor = 'default'; // Default grey
            break;
    }

    return (
        <Tag color={tagColor}>
            {status}
        </Tag>
    );
};

export default StatusTag;