import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { Context } from '../index';

const BrandBar = observer(() => {
    const {device}=useContext(Context)

    if(true){
        return(
            <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      {device.selectedBrand.id===1 || device.selectedBrand.id===-1?'Бренды':device.selectedBrand.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
      {device.brands.map(brand=>
                <Dropdown.Item 
                    style={{cursor:'pointer'}}
                    className='p-3'
                    key={brand.id}
                    active={brand.id===device.selectedBrand.id}
                    onClick={()=>device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Dropdown.Item>)}
      </Dropdown.Menu>
    </Dropdown>
        )
    }

    return ( 
       <Row className='d-flex'>
            {device.brands.map(brand=>
                <Card 
                    style={{cursor:'pointer'}}
                    className='p-3'
                    key={brand.id}
                    border={brand.id===device.selectedBrand.id?'danger':'light'}
                    onClick={()=>device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>)}
       </Row>
    );
});

export default BrandBar;