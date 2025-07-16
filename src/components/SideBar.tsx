"use client"

import {Menu, MenuProps, theme} from "antd";
import React from "react";
import {
    AuditOutlined,
    BookOutlined, ContainerOutlined,
    FormOutlined, GifOutlined, GiftOutlined,
    HistoryOutlined,
    HomeOutlined, HourglassOutlined,
    ToolOutlined,
    UserOutlined
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";

const MenuData: MenuProps['items'] = [
    {
        key: "/user/dashboard",
        icon: React.createElement(HomeOutlined),
        label: "Overview",
    },
    {
        key: "1",
        icon: React.createElement(UserOutlined),
        label: "Account Info",
        children: [
            {
                key: "/user/account",
                icon: React.createElement(ToolOutlined),
                label: "Manage",
            }
        ]
    },
    {
        key: "2",
        icon: React.createElement(BookOutlined),
        label: "Booking",
        children: [
            {
                key: "/user/bookings/make",
                icon: React.createElement(FormOutlined), label: "Make A Booking"
            },
            {
                key: "/user/bookings/history",
                icon: React.createElement(HistoryOutlined), label: "Booking History"
            }]
    },
]

const AdminMenuData: MenuProps['items'] = [
    {
        key: "/admin/dashboard",
        icon: React.createElement(HomeOutlined),
        label: "Dashboard",
    },
    {
        key: "1",
        icon: React.createElement(UserOutlined),
        label: "Account Info",
        children: [
            {
                key: "/admin/account",
                icon: React.createElement(ToolOutlined),
                label: "Manage",
            }
        ]
    },
    {
        key: "2",
        icon: React.createElement(BookOutlined),
        label: "Manage Bookings",
        children: [
            {
                key: "/admin/booking-requests",
                icon: React.createElement(HourglassOutlined), label: "Request"
            },
            {
                key: "/admin/booking-history",
                icon: React.createElement(HistoryOutlined), label: "History"
            }]
    },
    {
        icon: React.createElement(ContainerOutlined),
        label: "Manage Inventory",
        key: "/admin/inventory",
    },
    {
        icon: React.createElement(GiftOutlined),
        label: "Manage Grants",
        key: "/admin/grants",
    }
]

export default function SideBar() {
    const {user} = useAuth();
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const router = useRouter();
    const pathname = usePathname();

    // The onClick handler is now just one line!
    const onClick: MenuProps['onClick'] = (e) => {
        router.push(e.key);
    };
    return (

        <Sider width={200} style={{background: colorBgContainer}}>
            {user?.role === 'User' && (

                <Menu
                    onClick={onClick}
                    mode="inline"
                    selectedKeys={[pathname]}
                    // defaultOpenKeys={['sub1']}
                    style={{height: '100%', borderRight: 0}}
                    items={MenuData}
                />
            )}
            {user?.role === 'Admin' && (
                <Menu
                    onClick={onClick}
                    mode="inline"
                    selectedKeys={[pathname]}
                    // defaultOpenKeys={['sub1']}
                    style={{height: '100%', borderRight: 0}}
                    items={AdminMenuData}
                />
            )}
        </Sider>

    )

}