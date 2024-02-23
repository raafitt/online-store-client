import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { fetchOneDevice, fetchPageDevices, searchDevices } from '../http/deviceApi';
import { useState } from 'react';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/routes';
import ListGroup from 'react-bootstrap/ListGroup';

const SearchComponent =observer (() => {
    const [query, setQuery] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [hoveredRecommendation, setHoveredRecommendation] = useState(null);
    const {device}=useContext(Context)
    const router=useNavigate()
    const handleChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        try {
            if (value.trim() === '') {
                setRecommendations([]);
                return;
            }
            const devices=await searchDevices(value)
            setRecommendations(devices)
            
        } catch (error) {
            console.error('Ошибка при получении рекомендаций:', error);
        }
    };

    const fetchDevices=async(id, type)=>{
    
        if(type==='type'){
            device.setSelectedType({id:id})
            device.setSelectedBrand({id:-1})
           
        }
        if(type==='brand'){
            device.setSelectedType({id:-1})
            device.setSelectedBrand({id:id})
           
        }
        if(type==='device'){
            fetchOneDevice(id).then(()=>router(DEVICE_ROUTE+ '/' + id))
            
        }
        setRecommendations([])
        setQuery('')
        
    }
    return (
       <div>
           <Form.Control 
            value={query}
            onChange={handleChange}
            type="text" 
            placeholder="Искать в магазине.." /> 
            <ul>
            {recommendations.map((recommendation, index) => (
                <ListGroup.Item 
                onMouseEnter={()=>setHoveredRecommendation(index)} 
                onMouseLeave={()=>setHoveredRecommendation(null)}
                    style={{ cursor:'pointer', backgroundColor: hoveredRecommendation === index ? '#f0f0f0' : 'transparent'}}
                    key={index}
                    onClick={()=>fetchDevices(recommendation.dataValues.id, recommendation.type)}>
                        {recommendation.dataValues.name}
                </ListGroup.Item>
            ))}
            </ul>
        </div>
    );
});

export default SearchComponent;