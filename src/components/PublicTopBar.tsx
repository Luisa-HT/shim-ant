"use client"
import {Button, Flex,  Menu, MenuProps} from "antd";
import {Header} from "antd/es/layout/layout";
import React from "react";
import {
 ContactsOutlined,
    HomeOutlined,
    InfoCircleOutlined,

} from "@ant-design/icons";

const items: MenuProps['items'] = [
    {
        key : "1",
        icon : React.createElement(HomeOutlined),
        label : "Home"
    },
    {
        key : "2",
        icon : React.createElement(InfoCircleOutlined),
        label: "About"

    },
    {
        key : "3",
        icon : React.createElement(ContactsOutlined),
        label: "Contact"

    }
]

export default function PublicTopBar() {

    return (
        <Header>
            <Flex  align={'center'} justify={'space-between'}>
                {/*<div className="demo-logo" style={{display: 'flex', height: "100%", width: "auto", alignItems: 'center', justifyContent:'center' }}>*/}
                <div className="demo-logo" />

                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={items}
                    disabledOverflow

                    // style={{flex: 1, minWidth: 0}}
                />
                <Flex gap={"small"}>
                <Button type={'primary'}>
                Log In
            </Button>
                <Button type={'default'}>
                    Sign Up
                </Button>
                </Flex>
            </Flex>

            {/*</div>*/}
        </Header>
    )
}