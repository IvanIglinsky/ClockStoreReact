import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import {
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBDropdownItem,
} from 'mdb-react-ui-kit';
import { Context } from '../index';
import "./style/styleForComponent.css"

const SortList = observer(() => {
    const { device } = useContext(Context);

    const handleSort = (sortType) => {
        device.sortDevices(sortType);
    };

    return (
        <MDBDropdown className="d-flex justify-content-center mt-3 " >
            <MDBDropdownToggle tag='a' className='btn btn-secondary'>
                Сортування
            </MDBDropdownToggle>
            <MDBDropdownMenu >
                <MDBDropdownItem className="elemOfList" onClick={() => handleSort('newest')}>
                    По новизні
                </MDBDropdownItem>
                <MDBDropdownItem className="elemOfList" onClick={() => handleSort('rating')}>
                    По рейтингу
                </MDBDropdownItem>
                <MDBDropdownItem className="elemOfList" onClick={() => handleSort('price_asc')}>
                    За зростанням ціни
                </MDBDropdownItem>
                <MDBDropdownItem className="elemOfList" onClick={() => handleSort('price_desc')}>
                    За спаданням ціни
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
});

export default SortList;
