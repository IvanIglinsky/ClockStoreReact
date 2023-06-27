import React, { useContext } from 'react';
import Image from 'react-bootstrap/Image';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { observer } from 'mobx-react';

const BasketItem = observer(({ device, onRemove }) => {
    const handleRemove = () => {
        onRemove(device.id);
    };

    return (
        <Container className="mb-3 p-3" style={{ borderRadius: '10px', backgroundColor: '#f8f9fa', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Row className="align-items-center">
                <Col xs={3}>
                    <Image
                        width={150}
                        height={200}
                        src={process.env.REACT_APP_API_URL + device.img}
                        className="mt-2 mb-2"
                        style={{ border: '1px solid #dee2e6', borderRadius: '5px' }}
                    />
                </Col>
                <Col xs={6}>
                    <h3 style={{ border: '1px solid #dee2e6', borderRadius: '5px', padding: '5px' }}>{device.name}</h3>
                    <h5 style={{ border: '1px solid #dee2e6', borderRadius: '5px', padding: '5px' }}>Price: {device.price.toLocaleString()} ₴</h5>
                    <h5 style={{ border: '1px solid #dee2e6', borderRadius: '5px', padding: '5px' }}>Count: {device.count}</h5>
                </Col>
                <Col xs={3}>
                    <button className="btn btn-danger" onClick={handleRemove}>Видалити</button>
                    <button className="btn btn-success ml-2">Оплатити</button>
                </Col>
            </Row>
        </Container>
    );
});

export default BasketItem;
