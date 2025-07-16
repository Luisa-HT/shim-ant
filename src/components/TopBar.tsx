"use client"
import {Col, Flex, Menu, MenuProps, Row} from "antd";
import {Header} from "antd/es/layout/layout";
import React from "react";
import { InfoCircleOutlined, UserOutlined} from "@ant-design/icons";
import {Image} from "antd";


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
            <Row>
                <Col span={4}><Image

                    src="/shimLogo.png" // The path to your logo in the `public` folder
                    alt="SHIM Logo"
                    width={120} // Specify the desired width
                    height={50}  // Specify the desired height
                    style={{margin: 7}}
                    preview={false}
                /></Col>
            <Col span={20}>
            <Flex  align={'center'} justify={'flex-end'}>
                <div className="logo-container" style={{ cursor: 'pointer' }}>

                    <Menu
                    theme="dark"

                    mode="horizontal"
                    items={items}
                    disabledOverflow

                    // style={{flex: 1, minWidth: 0}}
                />
                </div>
            </Flex>
            </Col>
            </Row>
        </Header>
    )
}