import Admin_dashboard from "../Pages/ADMIN/Admin_dashboard/Admin_dashboard.jsx";
import ModerateDashboard from "../Pages/MODERATE/Moderate_dashboard/Moderate_dashboard.jsx";
import Seller_dashboard from "../Pages/SELLER/Seller_dashboard/Seller_dashboard.jsx";
import SuperUserDashboard from "../Pages/SUPERUSER/SuperUser_dashboard/SuperUser_dashboard.jsx";
import Shops from "../Pages/MODERATE/shops/shops.jsx";
import {HomeOutlined, ShopOutlined} from "@ant-design/icons";
import SingleShop from "../Pages/MODERATE/shops/single_shop/single_shop.jsx";



export const LOGIN = "/"
export const LAYOUT = "/layout/:user_id"

// ADMIN ROUTER
export const ADMIN_DASHBOARD = "/dashboard"


// MODERATOR ROUTER
export const MODERATOR_DASHBOARD = "/dashboard"
export const MODERATOR_SHOPS = "/shops"
export const MODERATOR_SINGLE_SHOP = "/shops/:shop_id"


// SELLER ROUTER
export const SELLER_DASHBOARD = "/dashboard"


// SUPER USER ROUTER
export const SUPERUSER_DASHBOARD = "/dashboard"






// ROUTERS LAYOUT
export const AdminLayout = [
    {
        Path: ADMIN_DASHBOARD,
        Component: Admin_dashboard,
        Icon: <HomeOutlined />,
        Label: "Dashboard"
    },
]
export const AdminRouter = [
    {
        Path: ADMIN_DASHBOARD,
        Component: Admin_dashboard,
    },
]

export const ModerateLayout = [
    {
        Path: MODERATOR_DASHBOARD,
        Component: ModerateDashboard,
        Icon: <HomeOutlined />,
        Label: "Dashboard"
    },
    {
        Path: MODERATOR_SHOPS,
        Component: Shops,
        Icon: <ShopOutlined />,
        Label: "Shops"
    },

]

export const ModeratorRouter = [
    {
        Path: MODERATOR_DASHBOARD,
        Component: ModerateDashboard,
    },
    {
        Path: MODERATOR_SHOPS,
        Component: Shops,
    },
    {
        Path: MODERATOR_SINGLE_SHOP,
        Component: SingleShop,
    },
]

export const SellerLayout = [
    {
        Path: SELLER_DASHBOARD,
        Component: Seller_dashboard,
        Icon: <HomeOutlined />,
        Label: "Dashboard"
    },
]
export const SellerRouter = [
    {
        Path: SELLER_DASHBOARD,
        Component: Seller_dashboard,
    },
]

export const SuperUserLayout = [
    {
        Path: SUPERUSER_DASHBOARD,
        Component: SuperUserDashboard,
        Icon: <HomeOutlined />,
        Label: "Dashboard"
    },
]
export const SuperUserRouter = [
    {
        Path: SUPERUSER_DASHBOARD,
        Component: SuperUserDashboard,
    },
]