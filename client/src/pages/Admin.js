import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import DeleteType from "../components/modals/DeleteType";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteClock from "../components/modals/DeleteClock";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [brandVisibleDelete, setBrandVisibleDelete] = useState(false)
    const [typeVisibleDelete, setTypeVisibleDelete] = useState(false)
    const [clockVisibleDelete, setClockVisibleDelete] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-light"}
                className="mt-4 p-2"
                onClick={() => setTypeVisible(true)}
            >
                Додати тип
            </Button>
            <Button
                variant={"outline-light"}
                className="mt-4 p-2"
                onClick={() => setBrandVisible(true)}
            >
                Додати бренд
            </Button>
            <Button
                variant={"outline-light"}
                className="mt-4 p-2"
                onClick={() => setDeviceVisible(true)}
            >
                Додати товар
            </Button>
            <Button
                variant={"outline-light"}
                className="mt-4 p-2"
                onClick={() => setBrandVisibleDelete(true)}
            >
                Видалити бренд
            </Button>
            <Button
                variant={"outline-light"}
                className="mt-4 p-2"
                onClick={() => setTypeVisibleDelete(true)}
            >
                Видалити тип
            </Button>
            <Button
                variant={"outline-light"}
                className="mt-4 p-2"
                onClick={() => setClockVisibleDelete(true)}
            >
                Видалити товар
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <DeleteType show={typeVisibleDelete} onHide={() => setTypeVisibleDelete(false)}/>
            <DeleteBrand show={brandVisibleDelete} onHide={() => setBrandVisibleDelete(false)}/>
            <DeleteClock show={clockVisibleDelete} onHide={() => setClockVisibleDelete(false)}/>
        </Container>
    );
};

export default Admin;
