// "use client"
// import {Breadcrumb, Layout, Menu, MenuProps, theme} from "antd";
// import {BookOutlined, HomeOutlined, UserOutlined} from "@ant-design/icons";
// import React from "react";
// import {Content, Header} from "antd/es/layout/layout";
// import Sider from "antd/es/layout/Sider";
//
// const MenuData: MenuProps['items'] = [
//     {
//         key: "1",
//         icon: React.createElement(HomeOutlined),
//         label: "Overview",
//     },
//     {
//         key: "2",
//         icon: React.createElement(UserOutlined),
//         label: "Account Info",
//         children: [
//             {
//                 key: "3",
//                 icon: React.createElement(UserOutlined),
//                 label: "Manage"
//             }
//         ]
//     },
//     {
//         key: "4",
//         icon: React.createElement(BookOutlined),
//         label: "Booking",
//         children: [
//             {
//                 key: "5",
//                 icon: React.createElement(BookOutlined), label: "Make A Booking"
//             },
//             {
//                 key: "6",
//                 icon: React.createElement(UserOutlined), label: "Booking History"
//             }]
//     },
// ]
// const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
//     key,
//     label: `nav ${key}`,
// }));
//
//
// export default function Home() {
//     const {
//         token: {colorBgContainer, borderRadiusLG},
//     } = theme.useToken();
//     return (
//
//         <Layout>
//             <Header style={{display: 'flex', alignItems: 'center'}}>
//                 <div className="demo-logo"/>
//                 <Menu
//                     theme="dark"
//                     mode="horizontal"
//                     defaultSelectedKeys={['2']}
//                     items={items1}
//                     style={{flex: 1, minWidth: 0}}
//                 />
//             </Header>
//             <Layout>
//                 <Sider width={200} style={{background: colorBgContainer}}>
//                     <Menu
//                         mode="inline"
//                         defaultSelectedKeys={['1']}
//                         defaultOpenKeys={['sub1']}
//                         style={{height: '100%', borderRight: 0}}
//                         items={MenuData}
//                     />
//                 </Sider>
//                 <Layout style={{padding: '0 24px 24px'}}>
//                     <Breadcrumb
//                         items={[{title: 'Home'}, {title: 'List'}, {title: 'App'}]}
//                         style={{margin: '16px 0'}}
//                     />
//                     <Content
//                         style={{
//                             padding: 24,
//                             margin: 0,
//                             minHeight: 280,
//                             background: colorBgContainer,
//                             borderRadius: borderRadiusLG,
//                         }}
//                     >
//                         Content
//                     </Content>
//                 </Layout>
//             </Layout>
//         </Layout>
//
//
//
//
//
//
//
//
//
export default function Home(){
    return (
        <div>
            <h1>hello</h1>
        </div>
    )
}