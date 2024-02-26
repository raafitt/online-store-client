import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import star from '../assets/star.png'
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneDevice, removeBasketDevices } from '../http/deviceApi';
import { Spinner } from "react-bootstrap";
import { observer } from 'mobx-react-lite';
import { addDevice } from '../http/deviceApi';
import { jwtDecode } from 'jwt-decode';
import { LOGIN_ROUTE } from '../utils/routes';
import { runInAction } from 'mobx';
import { reaction } from 'mobx';
const DevicePage = observer(() => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    if(localStorage.getItem('token') !== null){
        var user_id = jwtDecode(localStorage.getItem('token')).id;
    }
    
    const { user, device } = useContext(Context);
    const router = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await fetchOneDevice(id);
                device.setOneDevice(data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [device, id]);

    const toBasket = async () => {
        if (user.isAuth) {
            await addDevice(user_id, id);
            //device.setBasket([...device.basket, device.oneDevice]); // Обновляем корзину
            device.addToBasket(device.oneDevice)
        } else {
            router(LOGIN_ROUTE);
        }
    };

    const unBasket = async () => {
        device.pushIdsToDestroy(parseInt(id));
        await removeBasketDevices(JSON.stringify(device.idsToDestroy), user_id);
        runInAction(() => {
            //device._basket = device._basket.filter(item => item.id !== parseInt(id));// Обновляем корзину
            device.removeFromBasket(parseInt(id))
            device.vacateIdsToDestroy();
            setLoading(false);
        });
        
};

    if (loading) {
        return <Spinner animation="grow" />;
    }

    const isDeviceInBasket = device.basket.some(item => item.id === device.oneDevice.id);

    return (
        <Container className='mt-3'>
            <Row>
            <Col md={4}>
                <Image width={300} height={300} src={process.env.REACT_APP_API_URL+device.oneDevice.img}/>
            </Col>
            <Col md={4}>
                <Row className='d-flex flex-column align-items-center'>
                    <h2>{device.oneDevice.name}</h2>
                    <div 
                        className='d-flex align-items-center justify-content'
                        style={{background:`url(${star}) no-repeat center center`, width:240, height:240, backgroundSize:'cover', fontSize:'64'}}>
                        {device.oneDevice.rating}
                    </div>
                </Row>
            </Col>
            <Col md={4}>
                <Card
                    className='d-flex flex-column align-items-center justify-content-around'
                    style={{width:300, height:300, fontSize:32, border:'5px solid lightgray'}}>
                    <h3>От {device.oneDevice.price} руб</h3>
                    
                    {device.basket.some(function(item) {
                            return item.id === device.oneDevice.id;})
                            ?<Button 
                                variant='outline-danger'
                                onClick={unBasket}>
                            Убрать с корзины
                            </Button>
                            :<Button 
                                variant='outline-dark'
                                onClick={toBasket}>
                             Добавить в корзину
                            </Button>
                    }
                </Card>
            </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.oneDevice.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.tittle}: {info.description}
                    </Row>
                )}
            </Row>
            
        </Container>
    );
});

export default DevicePage;