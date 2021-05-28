import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import{useReactToPrint } from 'react-to-print';
import { Academic } from '@pure-and-lazy/api-interfaces';

interface AcademicVeiwModalProps {
  show: boolean;
  onClose(): void;
  selectedAcademic: Academic;
}

const AcademicVeiwModal = ({
  show,
  onClose,
  selectedAcademic,
}: AcademicVeiwModalProps) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content : () => componentRef.current,
  });
  
  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          View Academic
        </Modal.Title>
      </Modal.Header>
      <Modal.Body ref={componentRef}>
        <Row>
          <Col>
            <h2> Title: {selectedAcademic.title}</h2>
          </Col>
        </Row>
        <Row css="margin-top:10px">
          <Col xs={{ order: 'first' }}> <p css="font-family:Times New Roman;font-size:20px;font-weight: 900;display:inline"> Author :</p>  {selectedAcademic.author}</Col>
          <Col xs>
          <p css="font-family:Times New Roman;font-size:20px;font-weight: 900;display:inline"> Organization:  </p>
            {selectedAcademic.organization}</Col>
          <Col xs={{ order: 'last' }} >
          <p css="font-family:Times New Roman;font-size:20px;font-weight: 900;display:inline"> Created Date: </p>
            {' '}
            {selectedAcademic.createDate}{' '}
          </Col>
        </Row>
        <Row css="margin-left: 15px;font-family:Times New Roman;font-size:20px;font-weight: 900">Short Description:</Row>
        <Row css="word-break:break-word;margin-left: 15px;margin-top: 15px;width:93%">{selectedAcademic.shortDescription}</Row>
        <Row css="margin-left: 15px;margin-top: 15px;font-family:Times New Roman;font-size:20px;font-weight: 900">Paragraph:</Row>
        <Row css="word-break:break-word;margin-left: 15px;margin-top: 15px;width:93%">{selectedAcademic.bodyParagraph}</Row>
        <Row css="margin-left: 15px;margin-top: 15px;font-family:Times New Roman;font-size:20px;font-weight: 900">References:</Row>
        <Row css="word-break:break-word;margin-left: 15px;margin-top: 15px;width:93%">{selectedAcademic.academicReferences}</Row>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={handlePrint}> Export PDF </Button>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcademicVeiwModal;
