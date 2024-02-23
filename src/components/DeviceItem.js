import React, { useContext, useState } from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import { useNavigate } from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/routes";
import { Context } from '../index';
import Form from 'react-bootstrap/Form';
import { observer } from 'mobx-react-lite';

const DeviceItem = observer(({deviceItem}) => {
    const router=useNavigate()
    const {device}=useContext(Context)
    const [selected, setSelected]=useState(false)
    
    if(device.isSelecting){
        return (
            <Col md={3} className={"mt-3"} onClick={selected
                ?() =>{setSelected(false); device.removeIdToDestroy(deviceItem.id)}
                :()=>{setSelected(true); device.pushIdsToDestroy(deviceItem.id)}}>
            <Form.Check 
            type='checkbox'
            id={deviceItem.id}
            checked={selected?true:false}
          />
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + deviceItem.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>Samsung...</div>
                    <div className="d-flex align-items-center">
                        <div>{deviceItem.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{deviceItem.name}</div>
            </Card>
        </Col>
        )
    }
    
    
    
    
    return (
        <Col md={3} className={"mt-3"} onClick={()=>router(DEVICE_ROUTE + '/' + deviceItem.id)}>
        
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + deviceItem.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{deviceItem.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })} </div>
                    <div className="d-flex align-items-center">
                        <div>{deviceItem.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{deviceItem.name.length>20?deviceItem.name.substring(0, 15) + '...':deviceItem.name}</div>
            </Card>
        </Col>
    );
});

export default DeviceItem;