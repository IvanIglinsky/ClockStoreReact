import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from '../assets/star.png'
import {useNavigate } from "react-router-dom"
import {DEVICE_ROUTE} from "../utils/consts";


const DeviceItem = ({device}) => {
    const history = useNavigate ()
    let price=device.price.toLocaleString()
    let txt="Годиник"
    if(device.typeId==2){
        txt="Ремінець для годиника";
    }
    else if(device.typeId==3){
        txt="Скринька для годиника";
    }
    else if(device.typeId==4){
        txt="Кишеньковий годиник";
    }
    return (
        <Col md={3} className={"mt-3 OneItem  d-flex justify-content-center bg-white mr-5"}  onClick={() => history(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150,height:350, cursor: 'pointer'}} border={"light"}>
                <Image className={"mt-3"} width={150} height={200} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div>{ txt}</div>
                    <div className="d-flex align-items-center">
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div >{device.name}</div>
                <div style={{ textAlign: "center", marginTop: "auto", marginBottom: "10px", fontWeight: "bold",border:"1px solid black",borderRadius:"10px" }}>{price} ₴</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
