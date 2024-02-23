import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import { Row } from 'react-bootstrap';
import DeviceItem from './DeviceItem';

const BasketList = observer(({devices}) => {
    const {device}=useContext(Context)

   
    return (
      <Row className='d-flex'>
        {device.basket.map(device=>
            <DeviceItem key={device.id} deviceItem={device}/>
        )}
      </Row>
    );
});

export default BasketList;