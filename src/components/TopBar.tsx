"use client"
import {Flex, Menu, MenuProps} from "antd";
import {Header} from "antd/es/layout/layout";
import React from "react";
import { InfoCircleOutlined, UserOutlined} from "@ant-design/icons";



export default function TopBar({ nameProp = "Name"} : { nameProp?: string}) {

    const items: MenuProps['items'] = [
        {
            key : "1",
            icon : React.createElement(InfoCircleOutlined),
            label : "Info"
        },
        {
            key : "2",
            icon : React.createElement(UserOutlined),
            label: nameProp
        }
    ]

    return (
        <Header>
            <Flex  align={'center'} justify={'flex-end'}>
                {/*<div className="demo-logo" style={{display: 'flex', height: "100%", width: "auto", alignItems: 'center', justifyContent:'center' }}>*/}
                <Menu
                    theme="dark"

                    mode="horizontal"
                    items={items}
                    disabledOverflow

                    // style={{flex: 1, minWidth: 0}}
                />
            </Flex>
            {/*</div>*/}
        </Header>
    )
}