import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

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
      <Modal.Body>
        <Row>
          <Col>
            <h3> Title: {selectedAcademic.title}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={{ order: 'first' }}> Author: {selectedAcademic.author}</Col>
          <Col xs>Organization: {selectedAcademic.organization}</Col>
          <Col xs={{ order: 'last' }}>
            {' '}
            Created Date: {selectedAcademic.createDate}{' '}
          </Col>
        </Row>
        <Row>Short Description:</Row>
        <Row>{selectedAcademic.shortDescription}</Row>
        <Row>Paragraph:</Row>
        <Row>{selectedAcademic.bodyParagraph}</Row>
        <Row>References:</Row>
        <Row>{selectedAcademic.academicReferences}</Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AcademicVeiwModal;
