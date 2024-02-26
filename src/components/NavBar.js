import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import {Button} from 'react-bootstrap'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/routes';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../index';
import {observer} from 'mobx-react-lite'
import { jwtDecode } from 'jwt-decode';

const NavBar = observer(() => {
    const {user} =useContext(Context)
    const route=useNavigate()
    if(localStorage.getItem('token')!=='null'){
        var role= jwtDecode(localStorage.getItem('token')).role
    }else localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWYiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MDg5NTY3MDAsImV4cCI6MTcwOTA0MzEwMH0.4CGljFFxI9Rw3oD-RMLIzUFHmUL0NQvq9HjSjAjnUUg')
    
    console.log(role)
    const logOut=()=>{
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to={SHOP_ROUTE}>ONLINE STORE</NavLink>
                {user.isAuth
                    ?<Nav className="ml-auto">
                        {role==='ADMIN'
                        ?
                        <Button className='m-2' variant='outline-light' onClick={()=>route(ADMIN_ROUTE)}>Панель админа</Button>
                        :<></>}
                        <Button className='m-2' variant='outline-light' onClick={()=>route(BASKET_ROUTE)}>Корзина</Button>
                        <Button className='m-2' variant='outline-light' onClick={()=>logOut()}>Выйти</Button>
                    </Nav>
                    :<Nav className="ml-auto">
            
                        <Button className='m-2' variant='outline-light' onClick={()=>route(LOGIN_ROUTE)}>Войти</Button>
                    </Nav>}
                    
          </Container>
      </Navbar>
    );
}
);

export default NavBar;