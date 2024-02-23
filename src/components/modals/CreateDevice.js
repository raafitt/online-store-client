import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormControl, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../index';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi';

const CreateDevice = observer(({show, onHide}) => {
    const {device}=useContext(Context)
    const [info, setInfo]=useState([])
    const [deviceName, setDeviceName]=useState('')
    const [price, setPrice]=useState(0)
    const [img, setImg]=useState(null)


    useEffect(()=>{
        fetchTypes().then(types=>{
            device.setTypes(types)
          })
        fetchBrands().then(brands=>{
            device.setBrands(brands)
          })
    },[])
    

    const addInfo=()=>{
        setInfo([...info, {tittle:'', description:'', number:Date.now()}])
    }
    const changeInfo=(key, value, number)=>{
        setInfo(info.map(i=>i.number===number?{...i,[key]:value}:i))

    }
    const removeInfo=(number)=>{
        setInfo(info.filter(i=>i.number!==number))
    }

    const addDevice=()=>{
        const formData=new FormData()
        formData.append('name',deviceName)
        formData.append('price', `${price}`)
        formData.append('brandId',device.selectedBrand.id)
        formData.append('typeId',device.selectedType.id)
        formData.append('img',img)
        formData.append('info', JSON.stringify(info))

        createDevice(formData).then(response=>console.log(response))
    }
    return (
        <Modal
        show={show}
        onHide={onHide}
        centered
        >
    <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
      Добавить устройство
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
        <Form>
            <Dropdown className='mt-2'>
                <DropdownToggle>{device.selectedType.name||'Выберите тип'}</DropdownToggle>
                <DropdownMenu>
                    {device.types.map(type=>
                        <DropdownItem key={type.id} onClick={()=>device.setSelectedType(type)}>{type.name}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
            <Dropdown className='mt-2'>
                <DropdownToggle>{device.selectedBrand.name||'Выберите бренд'}</DropdownToggle>
                <DropdownMenu>
                    {device.brands.map(brand=>
                        <DropdownItem key={brand.id} onClick={()=>device.setSelectedBrand(brand)}>{brand.name}</DropdownItem>)}
                </DropdownMenu>
            </Dropdown>
            <FormControl 
                className='mt-2' 
                placeholder='введите название устройства'
                value={deviceName}
                onChange={e=>setDeviceName(e.target.value)} />
            <FormControl 
                className='mt-2' 
                placeholder='введите стоимость устройства'
                value={price}
                onChange={e=>setPrice(Number(e.target.value))}/>
            <FormControl 
                className='mt-2' 
                type='file'
                onChange={e=>setImg(e.target.files[0])}/>
            <hr/>
            <Button
                variant='outline-dark'
                onClick={addInfo}
            >
                Добавить новое свойство
            </Button>
            {info.map(i=>
                <Row className='mt-2' key={i.number}>
                    <Col md={4} >
                        <FormControl 
                            placeholder='Введите название свойства'
                            value={i.tittle}
                            onChange={e=>changeInfo('tittle', e.target.value, i.number)}/>
                    </Col>
                    <Col md={4} >
                        <FormControl 
                            placeholder='Введите описание свойства'
                            value={i.description}
                            onChange={e=>changeInfo('description', e.target.value, i.number)}/>
                    </Col>
                    <Col>
                        <Button variant='outline-danger' onClick={()=>removeInfo(i.number)}>Удалить</Button>
                    </Col>
                </Row>
                )
            }

        </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
    <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
  </Modal.Footer>
</Modal>
    );
});

export default CreateDevice;