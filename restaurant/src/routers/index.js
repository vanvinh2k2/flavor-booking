import Login from "../container/Login/Login";
import ManageOrder from "../container/ManageOrder/ManageOrder"
import Table from "../container/Table/Table";
import Dish from "../container/Dish/Dish";
import ContactUs from "../container/ContactUs/ContactUs";
import Review from "../container/Review/Review";
import Setting from "../container/Setting/Setting";
import ChatMessage from "../container/ChatMessage/ChatMessage";
import AddDish from "../container/AddDish/AddDish";
import UpdateDish from "../container/UpdateDish/UpdateDish";
import AddTable from "../container/AddTable/AddTable";
import UpdateTable from "../container/UpdateTable/UpdateTable";
import OrderDetail from "../container/OrderDetail/OrderDetail";
import HistoryOrder from "../container/HistoryOrder/HistoryOrder";
import HistoryDetail from "../container/HistoryDetail/HistoryDetail";
import NotFound from "../container/NotFound";
import Account from "../container/Account/Account";
import Dashboard from "../container/Dashboard/Dashboard";
import RegisterRes from "../container/RegisterRes/RegisterRes";

const publicRouter = [
    {path: '/', component: Login, layout: null},
    {path: '*', component: NotFound},
    {path: 'register/:uid', component: RegisterRes, layout: null},
    // {path: 'restaurant/manage-order', component: ManageOrder},
    // {path: 'restaurant/dish', component: Dish},
    // {path: 'restaurant/table', component: Table},
    // {path: 'restaurant/contact-us', component: ContactUs},
    // {path: 'restaurant/review', component: Review},
    // {path: 'restaurant/setting', component: Setting},
    // {path: 'restaurant/add-dish', component: AddDish},
    // {path: 'restaurant/order-detail/:oid', component: OrderDetail},
    // {path: 'restaurant/update-dish/:did', component: UpdateDish},
    // {path: 'restaurant/add-table', component: AddTable},
    // {path: 'restaurant/update-table/:tid', component: UpdateTable},
    // {path: 'restaurant/chat-message', component: ChatMessage},
    // {path: 'restaurant/history-order', component: HistoryOrder},
    // {path: 'restaurant/history-detail/:oid', component: HistoryDetail},
    // {path: 'restaurant/account', component: Account},
]

const privateRouter = [
    {path: 'restaurant/', component: Dashboard},
    {path: 'restaurant/manage-order', component: ManageOrder},
    {path: 'restaurant/dish', component: Dish},
    {path: 'restaurant/table', component: Table},
    {path: 'restaurant/contact-us', component: ContactUs},
    {path: 'restaurant/review', component: Review},
    {path: 'restaurant/setting', component: Setting},
    {path: 'restaurant/add-dish', component: AddDish},
    {path: 'restaurant/order-detail/:oid', component: OrderDetail},
    {path: 'restaurant/update-dish/:did', component: UpdateDish},
    {path: 'restaurant/add-table', component: AddTable},
    {path: 'restaurant/update-table/:tid', component: UpdateTable},
    {path: 'restaurant/chat-message', component: ChatMessage},
    {path: 'restaurant/history-order', component: HistoryOrder},
    {path: 'restaurant/history-detail/:oid', component: HistoryDetail},
    {path: 'restaurant/account', component: Account},
]

export {publicRouter, privateRouter};