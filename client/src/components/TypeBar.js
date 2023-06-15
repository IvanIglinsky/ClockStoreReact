import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Context } from '../index';
import './style/styleForComponent.css';
import ListGroup from 'react-bootstrap/ListGroup';

const TypeBar = observer(() => {
    const { device } = useContext(Context);

    const handleTypeClick = (type) => {
        if (device.selectedType && type.id === device.selectedType.id) {
            device.setSelectedType(1); // Скасувати вибір типу
        } else {
            device.setSelectedType(type); // Вибрати новий тип
        }
    };

    return (
        <ListGroup>
            {device.types.map((type) => (
                <ListGroup.Item
                    style={{ cursor: 'pointer' }}
                    active={device.selectedType?.id === type.id}
                    onClick={() => handleTypeClick(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default TypeBar;