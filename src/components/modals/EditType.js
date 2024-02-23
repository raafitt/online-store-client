import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../index';
import { createType, removeTypes } from '../../http/deviceApi';
import CheckboxList from '../CheckboxList';


const EditType = observer(({show, onHide}) => {
  const {device}=useContext(Context)
  const[type, setType]=useState('')
  const addType=()=>{
    createType({name:type}).then(types=>
      console.log(types))
  }

  const removeType=()=>{
    removeTypes(JSON.stringify(device.idsToDestroy)).then(
      console.log('Delete selected types')
    )
  }
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form>
                <FormControl
                    value={type}
                    onChange={e=>setType(e.target.value)}
                    placeholder='Введите название типа'/>
            </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={()=>{addType();onHide()}}>Добавить</Button>
      </Modal.Footer>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Выберите тип для удаления
        </Modal.Title>
      </Modal.Header>
        <CheckboxList items={device.types} />
        <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
        <Button variant='outline-success' onClick={()=>{removeType(); onHide()}}>Удалить</Button>
      </Modal.Footer>
      
      
      
    
    </Modal>
  );
}

    );


export default EditType;