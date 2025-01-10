import Admin_dashboard from "../Pages/ADMIN/Admin_dashboard/Admin_dashboard.jsx";
import ModerateDashboard from "../Pages/MODERATE/Moderate_dashboard/Moderate_dashboard.jsx";
import Seller_dashboard from "../Pages/SELLER/Seller_dashboard/Seller_dashboard.jsx";
import { IconBuildingStore , IconHome } from '@tabler/icons-react';
import SuperUserDashboard from "../Pages/SUPERUSER/SuperUser_dashboard/SuperUser_dashboard.jsx";
import Shops from "../Pages/MODERATE/shops/shops.jsx";



export const LOGIN = "/"
export const LAYOUT = "/layout/:user_id/*"

// ADMIN ROUTER
export const ADMIN_DASHBOARD = "/admin/dashboard"


// MODERATOR ROUTER
export const MODERATOR_DASHBOARD = "/moderator/dashboard"
export const MODERATOR_SHOPS = "/moderator/shops"


// SELLER ROUTER
export const SELLER_DASHBOARD = "/seller/dashboard"


// SUPER USER ROUTER
export const SUPERUSER_DASHBOARD = "/superUser/dashboard"






// ROUTERS LAYOUT
export const AdminLayout = [
    {
        Path: ADMIN_DASHBOARD,
        Component: Admin_dashboard,
        Icon: <IconHome/>,
        Label: "Dashboard"
    },
]

export const ModerateLayout = [
    {
        Path: MODERATOR_DASHBOARD,
        Component: ModerateDashboard,
        Icon: <IconHome/>,
        Label: "Dashboard"
    },
    {
        Path: MODERATOR_SHOPS,
        Component: Shops,
        Icon: <IconBuildingStore/>,
        Label: "Shops"
    },
]

export const SellerLayout = [
    {
        Path: SELLER_DASHBOARD,
        Component: Seller_dashboard,
        Icon: <IconHome/>,
        Label: "Dashboard"
    },
]

export const SuperUserLayout = [
    {
        Path: SUPERUSER_DASHBOARD,
        Component: SuperUserDashboard,
        Icon: <IconHome/>,
        Label: "Dashboard"
    },
]