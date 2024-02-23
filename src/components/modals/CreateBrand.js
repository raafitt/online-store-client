import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../index';
import { createBrand } from '../../http/deviceApi';

const CreateBrand = ({show, onHide}) => {
  const addBrand=()=>{
    createBrand({name:brand}).then(data=>setBrand(''))
  }
  const [brand, setBrand]=useState('')
    return (
      <Modal
        show={show}
        onHide={onHide}
        centered
    >
    <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
      Добавить бренд
    </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <FormControl
                placeholder='Введите название бренда'
                value={brand}
                onChange={e=>setBrand(e.target.value)}/>
        </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
    <Button variant='outline-success' onClick={addBrand}>Добавить</Button>
  </Modal.Footer>
</Modal>
    );
};

export default CreateBrand;