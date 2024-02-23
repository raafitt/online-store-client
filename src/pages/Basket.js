import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { fetchBasket,fetchBasketDevices, fetchDevices, removeBasketDevices } from '../http/deviceApi';
import { jwtDecode } from "jwt-decode";
import { json } from 'react-router-dom';
import DeviceList from '../components/DeviceList';
import { Spinner } from 'react-bootstrap';
import BasketList from '../components/BasketList';
import {Button} from 'react-bootstrap'
import { runInAction } from 'mobx';

const Basket = observer(() => {
    
    const {device}=useContext(Context)
    const user_id= jwtDecode(localStorage.getItem('token')).id
    
    const [basket_devices, setBasketDevices]=useState([])
    const[loading, setLoading]=useState(true)
    useEffect(()=>{
        fetchBasketDevices(user_id).then(basketDevices=>{
        device.setBasket(basketDevices)
        console.log(basketDevices)
        setLoading(false)              
    },[])
})

    const destroyDevices=async()=>{
        device.setIsSelecting(false);
        try {
            await removeBasketDevices(JSON.stringify(device.idsToDestroy),user_id);
            const basketDevices = await fetchBasketDevices(user_id);
            runInAction(() => {
                device.setBasket(basketDevices);
            })
            device.vacateIdsToDestroy();
        } catch (error) {
            console.error('Error destroying devices:', error);
        }
    }
    if(loading){
        return <Spinner animation="grow"/>
    }
    return (
        <div>
             
            <Button 
                className='m-2' 
                variant='outline-dark'
                onClick={device.isSelecting
                    ?()=>device.setIsSelecting(false)
                    :()=>device.setIsSelecting(true)}>
                {device.isSelecting?'Отменить':'Выбрать'}
            </Button>
                {device.isSelecting &&
                <Button 
                    className='m-2' 
                    variant='outline-dark'
                    onClick={destroyDevices}>Удалить</Button>
                
                }
            <BasketList/>
        </div>
    );
});

export default Basket;