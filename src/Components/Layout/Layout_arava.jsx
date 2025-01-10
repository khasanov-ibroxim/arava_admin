import React from 'react';
import { Layout, Menu } from 'antd';
import logo from '../../Assisstents/img/logo.svg';
import Nav from '../Nav/Nav.jsx';
import {Route, Routes, useNavigate, useNavigation, useParams} from 'react-router-dom';
import {AdminLayout, ModerateLayout, SellerLayout, SuperUserLayout} from "../../utils/consts.jsx";

const { Content, Sider } = Layout;

const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    background: 'rgb(15 23 42)',
};
const styleLogo = {
    display: 'flex',
    width: '125px',
    margin: 'auto',
    justifyContent: 'center',
    padding: '30px 0px'
};

const generateMenuItems = (layout) => {
    return layout.map(({ Path, Label, Icon }, index) => ({
        key: index + 1,
        icon: Icon,
        label: Label,
        path: Path
    }));
};

const Layout_arava = () => {
    const [layoutData , setLayoutData] = React.useState([]);
    const { user_id } = useParams();
    const User_type = "moderator";
    const navigation = useNavigate();


    React.useEffect(() => {
        if (User_type === "admin") setLayoutData(AdminLayout);
        else if (User_type === "moderator") setLayoutData(ModerateLayout);
        else if (User_type === "seller") setLayoutData(SellerLayout);
        else if (User_type === "superuser") setLayoutData(SuperUserLayout);
    }, [User_type]); // User_type o‘zgarganda qayta ishlaydi

    const itemsMenu = generateMenuItems(layoutData);

    const handleMenuClick = (e) => {
        const selectedItem = items.find(item => Number(item.key) === Number(e.key));
        if (selectedItem) {
            navigation(`/layout/${user_id}`+selectedItem.path);
        }
    };

    return (
            <Layout >
                <Sider style={siderStyle}>
                    <img style={styleLogo} src={logo} alt="" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={itemsMenu}
                        onClick={handleMenuClick}
                    />
                </Sider>
                <Layout style={{ marginInlineStart: 200, background: 'rgb(30 41 59 )' }}>
                    <Nav />
                    <Content
                        className={"overflow-hidden"}
                        style={{ margin: '10px 15px', height: "100vh" }}>
                        <div
                            style={{
                                padding: 24,
                                background: 'rgb(15 23 42)',
                                borderRadius: '15px',
                                border: '1px solid rgba(255 ,255, 255 , .2)',
                                height: '100%',
                                overflowY: "auto",
                                color: "white"
                            }}
                        >
                            <Routes>
                                {User_type === "moderator" &&
                                ModerateLayout.map(({Path ,Component})=><Route path={Path}  component={Component} />)
                                }
                            </Routes>
                        </div>
                    </Content>
                </Layout>
            </Layout>

    );
};

export default Layout_arava;
