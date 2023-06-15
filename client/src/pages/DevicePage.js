import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import bigStar from '../assets/bigStar.png';
import bigStar25 from '../assets/bigStar25%.png';
import bigStar50 from "../assets/bigStar50%.png";
import bigStar75 from "../assets/bigStar75%.png";
import bigStar100 from "../assets/bigStar100%.png"
import { useParams } from 'react-router-dom';
import { addToBasket, fetchOneDevice, updateDeviceRating } from "../http/deviceAPI";
import "./style/styleForPages.css";


const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const [rating, setRating] = useState(0);
    const [basket,setBasket]=useState(0)
    const { id } = useParams();
    let star = bigStar;

    if (rating <= 3) {
        star = bigStar25;
    } else if (rating > 3 && rating <= 5) {
        star = bigStar50;
    } else if (rating > 5 && rating <= 9) {
        star = bigStar75;
    } else if (rating >= 10) {
        star = bigStar100;
    }



    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDevice(data);
            setRating(data.rating);
        });
    }, []);

    const handleRatingChange = (event) => {
        const newRating = event.target.value;
        setRating(newRating);
        updateDeviceRating(id, newRating);
    };

    const addToBasketHandler = (event) => {
        const Baskets= event.target.value;
        setBasket(Baskets)
        addToBasket ( id );
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image className="ImgItem" width={300} height={350} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2 className="text-white">{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center "
                            style={{ background: `url(${star}) no-repeat center center`, width: 300, height: 300, backgroundSize: 'cover', fontSize: 64 }}
                        >
                            <input type="number" min="0" max="10" style={{ fontSize: 30, width: 55, marginLeft: 15, fontWeight: "bold", overflow: "hidden", background: "transparent", border: "none", justifyContent: "center" }} value={rating} onChange={handleRatingChange} />
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                    >
                        <h3>Від: {device.price && device.price.toLocaleString()} ₴</h3>
                        <Button variant={"outline-dark"} onClick={addToBasketHandler}>Додати в кошик</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1 className="text-white">Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'white', padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;
