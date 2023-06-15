import React, { useContext, useEffect, useState } from 'react';
import { Col, Container } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { Context } from '../index';
import {fetchAllBasket , fetchOneBasket , fetchOneDevice , removeFromBasket} from '../http/deviceAPI';

import './style/styleForPages.css';
import BasketItem from '../components/BasketItem';

const Basket = observer(() => {
    const { device } = useContext(Context);
    const [basketDevicesData, setBasketDevicesData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetchAllBasket();
        const devicesData = [];
        const deviceCounts = {};
        for (const deviceId of data) {
            const deviceData = await fetchOneDevice(deviceId.deviceId);
            if (deviceData.id in deviceCounts) {
                deviceCounts[deviceData.id]++;
            } else {
                deviceCounts[deviceData.id] = 1;
                devicesData.push(deviceData);
            }
        }
        devicesData.forEach((deviceData) => {
            deviceData.count = deviceCounts[deviceData.id];
        });

        setBasketDevicesData(devicesData);
    };

    const handleRemoveDevice = async (id) => {
        const deviceData = await fetchOneBasket(id);
        await removeFromBasket(deviceData.id);
        fetchData()
        console.log(deviceData.id)
    };

    return (
        <Container className="mainShopPage">
            {basketDevicesData.map((deviceData) => (
                <Col className="d-flex ml-3" key={deviceData.id}>
                    <BasketItem device={deviceData} onRemove={handleRemoveDevice} />
                </Col>
            ))}
        </Container>
    );
});

export default Basket;
