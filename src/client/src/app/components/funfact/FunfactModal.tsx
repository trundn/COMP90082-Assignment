// external
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import { date } from 'yup/lib/locale';
import { Button, Col, Form, Modal } from 'react-bootstrap';

// internal
import { Funfact } from '@pure-and-lazy/api-interfaces';
import { initialFunfactValues } from '../../constants/funfactInitValues';

interface FunfactModalProps {
  show: boolean;
  selectedFunfact: Funfact;
  onSubmit: (values: Funfact, isAddMoreAction: boolean) => void;
  onClose: () => void;
}

const FunfactModal = ({ show, selectedFunfact, onSubmit, onClose }: FunfactModalProps) => {

    const isAddMoreAction = useRef(true);
  useEffect(() => {
    isAddMoreAction.current = selectedFunfact === initialFunfactValues;
   }, [selectedFunfact]);

  const validationSchema = Yup.object().shape({
    factName: Yup.string().required('Funfact Name is required'),
    factDetail: Yup.string().required('Funfact detail is required'),

  });

  const handleFormClose = () => {
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleFormClose}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Funfact</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={selectedFunfact}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(values,isAddMoreAction.current);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              {/* Funfact Name */}
              <Form.Group controlId="formEventName">
                <Form.Label>Funfact Name</Form.Label>
                <Form.Control
                  type="text"
                  name="factName"
                  placeholder="Enter funfact name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.factName}
                  isInvalid={!!errors.factName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.factName}
                </Form.Control.Feedback>
              </Form.Group>
              {/* Funfact Details */}
              <Form.Row>
                <Form.Group as={Col} md={12}>
                  {/* Hoster */}
                  <Form.Label>One sentence fact</Form.Label>
                  <Form.Control
                    type="text"
                    name="factDetail"
                    placeholder="Enter one sentence description of the fact"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.factDetail}
                    isInvalid={!!errors.factDetail}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.factDetail}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Submit</Button>
              <Button variant="secondary" onClick={handleFormClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default FunfactModal;