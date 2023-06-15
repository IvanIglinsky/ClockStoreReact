import React, { useContext } from 'react';
import { observer } from "mobx-react";
import { Context } from "../index";
import { Card, Row } from "react-bootstrap";
import "./style/styleForComponent.css";

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    const handleBrandClick = (brand) => {
        if (device.selectedBrand && brand.id === device.selectedBrand.id) {
            device.setSelectedBrand(1);
        } else {
            device.setSelectedBrand(brand);
        }
    };

    return (
        <div className="brandBarContainer">
            <Row className="brandBarRow">
                {device.brands.map(brand => (
                    <Card
                        style={{ cursor: 'pointer' }}
                        key={brand.id}
                        className={`p-3 brandBarElement ${device.selectedBrand?.id !== null && brand.id === device.selectedBrand.id ? 'selected' : ''}`}
                        onClick={() => handleBrandClick(brand)}
                        border={device.selectedBrand?.id !== null && brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                    >
                        <div className="brandBarText">    {brand.name}</div>
                    </Card>
                ))}
            </Row>
        </div>
    );
});

export default BrandBar;
