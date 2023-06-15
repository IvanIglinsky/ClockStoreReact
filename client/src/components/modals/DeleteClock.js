import React, { useContext, useState, useEffect } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Dropdown, Form } from "react-bootstrap";
import {deleteDevice , fetchAlldevice} from "../../http/deviceAPI";
import { observer } from "mobx-react";
import { Context } from "../../index";

const DeleteClock = observer(({ show, onHide }) => {
    const [value, setValue] = useState('');
    const { device } = useContext(Context);

    useEffect(() => {
        const fetchData = async () => {
            const devices = await fetchAlldevice();
            device.setDevices(devices.rows);
        };
        fetchData();
    }, [device]);
    const handleDelete = async () => {
        try {
            const deviceToDelete = device.devices.find(d => d.name === value);
            if (deviceToDelete) {
                await deleteDevice(deviceToDelete.id);
                onHide();
            } else {
                console.log("Товар не знайдено");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Видалити товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{value || "Оберіть товар"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.devices.slice().map(deviceItem => (
                                <Dropdown.Item
                                    onClick={() => setValue(deviceItem.name)}
                                    key={deviceItem.id}
                                >
                                    {deviceItem.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
                <p>Ви впевнені, що хочете видалити цей товар?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    Скасувати
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                    Видалити
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteClock;
