import React from 'react';
import {Layout, Menu} from 'antd';
import logo from '../../Assisstents/img/logo.svg';
import Nav from '../Nav/Nav.jsx';
import {Route, Routes, useNavigate, useParams, useLocation} from 'react-router-dom';
import {
    AdminLayout,
    AdminRouter,
    ModerateLayout,
    ModeratorRouter,
    SellerLayout,
    SellerRouter,
    SuperUserLayout,
    SuperUserRouter
} from "../../utils/consts.jsx";

const {Content, Sider} = Layout;

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
    padding: '30px 0px',
    color: "white"
};

// Menu elementlari uchun noyob key yaratish
const generateMenuItems = (layout) => {
    return layout.map(({Path, Label, Icon}, index) => ({
        key: `${Path}-${index}`, // Noyob key yaratildi
        icon: Icon,
        label: Label,
        path: Path
    }));
};

const Layout_arava = () => {
    const [layoutData, setLayoutData] = React.useState([]);
    const {user_id} = useParams();
    const location = useLocation();
    const User_type = "moderator";
    const navigation = useNavigate();

    React.useEffect(() => {
        if (User_type === "admin") setLayoutData(AdminLayout);
        else if (User_type === "moderator") setLayoutData(ModerateLayout);
        else if (User_type === "seller") setLayoutData(SellerLayout);
        else if (User_type === "superuser") setLayoutData(SuperUserLayout);
    }, [User_type]);

    const itemsMenu = generateMenuItems(layoutData);

    // Joriy URL bo'yicha aktiv menyu elementni aniqlash
    const activeKey = React.useMemo(() => {
        const basePath = `/layout/${user_id}`;
        const currentPath = location.pathname.replace(basePath, '');
        const activeItem = itemsMenu.find(item => item.path === currentPath);
        return activeItem ? activeItem.key : '';
    }, [location.pathname, itemsMenu, user_id]);

    // Menyu elementini bosganda yo'naltirish
    const handleMenuClick = (e) => {
        const selectedItem = itemsMenu.find(item => item.key === e.key); // Number o'chirildi
        if (selectedItem) {
            navigation(`/layout/${user_id}${selectedItem.path}`);
        }
    };

    return (
        <Layout style={{overflow: "hidden", height: "100vh"}}>
            <Sider style={siderStyle}>
                <div style={styleLogo}>
                    <h1>Arava logo</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[activeKey]}
                    items={itemsMenu}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout style={{marginInlineStart: 200, background: 'rgb(30 41 59 )'}}>
                <Nav/>
                <Content
                    className={"overflow-hidden"}
                    style={{margin: '10px 15px', height: "100vh"}}
                >
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
                                ModeratorRouter.map(({Path, Component}) => (
                                    <Route key={Path} path={Path} element={<Component/>}/>
                                ))
                            }
                            {User_type === "admin" &&
                                AdminRouter.map(({Path, Component}) => (
                                    <Route key={Path} path={Path} element={<Component/>}/>
                                ))
                            }
                            {User_type === "seller" &&
                                SellerRouter.map(({Path, Component}) => (
                                    <Route key={Path} path={Path} element={<Component/>}/>
                                ))
                            }
                            {User_type === "superuser" &&
                                SuperUserRouter.map(({Path, Component}) => (
                                    <Route key={Path} path={Path} element={<Component/>}/>
                                ))
                            }
                        </Routes>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Layout_arava;
