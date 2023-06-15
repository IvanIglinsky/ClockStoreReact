import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { deleteBrand} from "../../http/deviceAPI";
import {observer} from "mobx-react";

const DeleteType = observer(({ show, onHide}) => {
    const [value, setValue] = useState('');

    const handleDelete = () => {
        deleteBrand(value)
            .then(() => {
                onHide();
            })

    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Видалити бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введіть назву бренда"}
                    />
                </Form>
                <p>Ви впевнені, що хочете видалити цей бренд?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>Скасувати</Button>
                <Button variant="outline-danger" onClick={handleDelete}>Видалити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteType;
