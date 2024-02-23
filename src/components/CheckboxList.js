import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Context } from '../index';

const CheckboxList = observer(({ items }) => {
const [checkedItems, setCheckedItems] = useState({});
const {device}=useContext(Context)
  const handleCheckboxChange = (itemId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }))
    device.pushIdsToDestroy(itemId);
  };

  return (
    <ul style={{ listStyleType: 'none', maxHeight: '200px', overflowY: 'auto' }}>
      {items.map((item) => (
        <li key={item.id}>
          
          <Form.Check 
              type="checkbox"
              checked={checkedItems[item.id] || false}
              label={item.name}
              onChange={() => handleCheckboxChange(item.id)}
            />
            
          
        </li>
      ))}
    </ul>
  );
});

export default CheckboxList;
