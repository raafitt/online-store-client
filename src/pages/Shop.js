import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { Context } from '../index';
import { fetchBrands, fetchTypes,destroy, fetchPageDevices } from '../http/deviceApi';
import Pagination from 'react-bootstrap/Pagination';
import { Spinner } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';
import { runInAction } from 'mobx';
import SearchComponent from '../components/SearchComponent';
const Shop = observer(() => {
    const {device}=useContext(Context)
    let limit=5
    const[pages,setPages]=useState(0)
    const [selectedPage,setSelectedPage]=useState(1)
    let items = [];
    const[loading, setLoading]=useState(true)
    if(localStorage.getItem('token')!==null){
        var role= jwtDecode(localStorage.getItem('token')).role
    }else var role='USER'
   
    

    const getPages=(count,limit)=>{
        return Math.ceil(count/limit)
    }
    useEffect(()=>{
        fetchTypes().then(types=>{
            device.setTypes(types)
          })
        fetchBrands().then(brands=>{
            device.setBrands(brands)
          })
          fetchPageDevices(1, device.selectedType.id, device.selectedBrand.id).then(devices=>{
            device.setDevices(devices.rows)
            
            setPages(getPages(devices.count,limit))

            
          }).finally(()=>setLoading(false))
    },[device.selectedBrand, device.selectedType, device.isSelecting])

        const fetchPage=(page)=>{
            setSelectedPage(page)
            fetchPageDevices(page,device.selectedType.id, device.selectedBrand.id).then(devices=>{
            device.setDevices(devices.rows)
            })
        }
            
    
        
        for (let number = 1; number <= pages; number++) {
        items.push(
        <Pagination.Item 
            key={number} 
            active={number === selectedPage}
            onClick={()=>fetchPage(number)}>
        {number}
        </Pagination.Item>,
        );
        }
    

    if(loading){
        return <Spinner animation="grow"/>
      }

      const destroyDevices = async () => {
        device.setIsSelecting(false);
        try {
            await destroy(JSON.stringify(device.idsToDestroy));
            const devices = await fetchPageDevices(1, device.selectedType.id, device.selectedBrand.id);
            runInAction(() => {device.setDevices(devices.rows)})
            device.vacateIdsToDestroy();
        } catch (error) {
            console.error('Error destroying devices:', error);
        }
    };

   
    return (
        <Container>
            {role==='ADMIN'&&
            <Button 
                className='m-2' 
                variant='outline-dark'
                onClick={device.isSelecting
                    ?()=>device.setIsSelecting(false)
                    :()=>device.setIsSelecting(true)}>
                {device.isSelecting?'Отменить':'Выбрать'}
            </Button>}
                {device.isSelecting &&
                <Button 
                    className='m-2' 
                    variant='outline-dark'
                    onClick={destroyDevices}>Удалить</Button>
                
                }
               
                <SearchComponent/>
                
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9} >
                    <BrandBar/>
                    <DeviceList/>
                    <hr/>
                    <Pagination size="sm">{items}</Pagination>
                    
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;