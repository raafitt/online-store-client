import React, { useContext, useState } from 'react';
import {Route, Routes} from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../utils/routes';
import { Context } from '../index';


const AppRouter = () => {
    const {user}=useContext(Context)
    return (
       user.isAuth
       ?<Routes>{privateRoutes.map(route=><Route path={route.patch} element={<route.element/>} exact={route.exact}/>)}</Routes>
       :<Routes>{publicRoutes.map(route=><Route path={route.patch} element={<route.element/>} exact={route.exact}/>)}</Routes>
    );
};

export default AppRouter;