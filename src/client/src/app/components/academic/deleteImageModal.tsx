import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Col,Row ,Alert} from 'react-bootstrap';
import { SingalImage, AcademicModels } from '@pure-and-lazy/api-interfaces';
import Select from 'react-select';
import { AcademicPage } from '../../pages/academic/AcademicPage';

interface DeleteImageModalProps {
    show: boolean;
    onClosed(): void;
    academicModels : AcademicModels;
    onSubmit: (singleImage: SingalImage) => void;
}

const DeleteImageModal = ({show, onClosed,academicModels,onSubmit} : DeleteImageModalProps) => {
    const [selected, setSelected] = useState(-1);
    const [alertShow,setAlertShow] = useState(false);


    const index = [];
    for (let i = 0; i < academicModels?.images.length ;i++){
        index.push({value:i,label:i});
    }

    return (
        <Modal
        show={show}
        onHide={onClosed}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        >
        <Modal.Header closeButton>
          <Modal.Title>Delete Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row xs={2}>
                <Col xs={12}>Delete Option:</Col>
                <Col>
                    <Select 
                        defaultValue={index.length > 0 ? index[selected]?.label : "Empty"}
                        options={index}
                        autoFocus={true}
                        onChange={(data) => {
                            setSelected(data.label);
                        }}
                        />
                </Col>
            </Row>
            <Row>
                <img src={academicModels?.images[selected]?.imageUrl} max-width="500px" />
            </Row>
        </Modal.Body>
        <Alert show={alertShow} variant="danger" onClose={() => {
                    setAlertShow(false);
                }} dismissible>
                Warring!!! Please select at least one picture!!!
        </Alert>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {
              if (selected < 0){
                  setAlertShow(true);
              }else{
                setAlertShow(false);
                onSubmit(academicModels?.images[selected]);
                setSelected(-1);
              }
          }}>
            Delete
          </Button>
          <Button variant="secondary" onClick={() => {
              setSelected(-1);
              setAlertShow(false);
              onClosed();
          }}>
                Close
          </Button>
        </Modal.Footer>
        </Modal>
    );

}

export default DeleteImageModal;