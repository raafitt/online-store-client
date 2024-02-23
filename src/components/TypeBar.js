import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchOneTypeDevices } from '../http/deviceApi';
import Dropdown from 'react-bootstrap/Dropdown';
const TypeBar = observer(() => {
    const {device}=useContext(Context)//Получаем объект device с помощью реструктуризации из глобального контекста

    if(true){
        return(
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {device.selectedType.id===1 ||device.selectedType.id===-1?'Типы устройств':device.selectedType.name}
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
            {device.types.map(type=>
            <Dropdown.Item 
            style={{cursor:'pointer'}}
            key={type.id}
            active={type.id===device.selectedType.id}
            onClick={()=>{device.setSelectedType(type); }}>
                {type.name}
            </Dropdown.Item>
        )}
            </Dropdown.Menu>
          </Dropdown>
        )
    }
   

    return (
    <ListGroup>
        {device.types.map(type=>
            <ListGroup.Item 
            style={{cursor:'pointer'}}
            key={type.id}
            active={type.id===device.selectedType.id}
            onClick={()=>{device.setSelectedType(type); }}>
                {type.name}
            </ListGroup.Item>
        )}
    </ListGroup>
    );
});

export default TypeBar;