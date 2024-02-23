import Admin from '../pages/Admin';
import Basket from '../pages/Basket';
import DevicePage from '../pages/DevicePage';
import Shop from '../pages/Shop';
import Auth from '../pages/Auth';

export const ADMIN_ROUTE='/admin'
export const BASKET_ROUTE='/basket'
export const SHOP_ROUTE='/shop'
export const DEVICE_ROUTE='/device'
export const LOGIN_ROUTE='/login'
export const REGISTRATION_ROUTE='/registration'
export const ANY_ROUTE='*'

export const privateRoutes=[
    {patch:ADMIN_ROUTE, element:Admin, exact:true},
    {patch:BASKET_ROUTE, element:Basket, exact:true},
    {patch:ANY_ROUTE, element:Shop, exact:true},
    {patch:SHOP_ROUTE, element:Shop, exact:true},
    {patch:DEVICE_ROUTE+'/:id', element:DevicePage, exact:true},
    {patch:LOGIN_ROUTE, element:Auth, exact:true},
    {patch:REGISTRATION_ROUTE, element:Auth, exact:true},
    ]

export const publicRoutes=[
    {patch:LOGIN_ROUTE, element:Auth, exact:true},
    {patch:REGISTRATION_ROUTE, element:Auth, exact:true},
    {patch:SHOP_ROUTE, element:Shop, exact:true},
    {patch:DEVICE_ROUTE+'/:id', element:DevicePage, exact:true},
    {patch:ANY_ROUTE, element:Shop, exact:true}
]