import React, { useContext, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import EditType from '../components/modals/EditType';
import { Context } from '../index';



const Admin = () => {
    const [brandVisible, setBrandVisible]=useState(false)
    const [typeVisible,setTypeVisible]=useState(false)
    const [deviceVisible, setDeviceVisible]=useState(false)
    const{device}=useContext(Context)
    return (
        <Container className='d-flex flex-column'>
            <Button variant='outline-dark' className='mt-2' onClick={()=>setTypeVisible(true)}>Добавить / Удалить тип</Button>
            <Button variant='outline-dark' className='mt-2' onClick={()=>setBrandVisible(true)}>Добавить бренд</Button>
            <Button variant='outline-dark' className='mt-2' onClick={()=>setDeviceVisible(true)}>Добавить устройство</Button>
            
            <EditType show={typeVisible} onHide={()=>setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={()=>setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={()=>setDeviceVisible(false)}/>
            
        </Container>
    );
};

export default Admin;