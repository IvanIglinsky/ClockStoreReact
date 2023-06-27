import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";

import DeviceList from "../components/DeviceList";
import Filtres from "../components/Filters";

import {observer} from "mobx-react";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import "./style/styleForPages.css"
import Spinner from "../components/Spinner";


const Shop = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {

        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })

    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])

    return (

        <Container className={"mainShopPage"}>
            < Spinner/>
            <Row className="mt-2">
                <Col md={3}>
                    <Filtres/>
                    <TypeBar/>


                </Col>

                <Col md={9}>

                    <DeviceList/>
                    <Pages/>

                </Col>

            </Row>

        </Container>
    );
});

export default Shop;
