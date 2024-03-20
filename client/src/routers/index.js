import Home from '../container/Home/Home'
import NotFound from '../container/NotFound';
import Login from '../container/Login/Login'
import SignUp from '../container/SignUp/SignUp';
import Dish from '../container/Dish/Dish';
import DetailDish from '../container/DetaiDish/DetaiDish'
import DetailOrder from '../container/DetailOrder/DetailOrder';
import Bill from '../container/Bill/Bill';
import SearchAI from '../container/SearchAI/SearchAI';
import Account from '../container/Account/Account'
import ForgetUser from '../container/ForgetUser/ForgetUser';
import HistoryOrder from '../container/HistoryOrder/HistoryOrder';
import DetailHistory from '../container/DetailHistory/DetailHistory';
import Contact from '../container/Contact/Contact';
import LikeRestaurant from '../container/LikeRestaurant/LikeRestaurant';
import DetailRestaurant from '../container/DetailRestaurant/DetaiRestaurant';

const publicRouter = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/sign-up', component: SignUp},
    {path: '/detail-restaurant/:rid', component: DetailRestaurant},
    {path: '/detail-dish/:did', component: DetailDish},
    {path: '/dish', component: Dish},
    {path: '/search-ai', component: SearchAI},
    {path: '/contact', component: Contact},
    {path: '/forget-password', component: ForgetUser},
    {path: '*', component: NotFound},
]

const privateRouter = [
    {path: '/account', component: Account},
    {path: '/detail-order/:rid', component: DetailOrder},
    {path: '/detail-history-order/:oid', component: DetailHistory},
    {path: '/history-order', component: HistoryOrder},
    {path: '/love-restaurant', component: LikeRestaurant},
    {path: '/bill/:oid', component: Bill},
    {path: '/love-restaurant', component: LikeRestaurant},
]

export {publicRouter, privateRouter};