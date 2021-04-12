import React, { useEffect, useRef } from 'react';

import * as Yup from 'yup';

import { Formik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';

import { Award } from '@pure-and-lazy/api-interfaces';
import { initialAwardValues } from '../../../constants/resumeInitValues';

interface AwardModalProps {
  show: boolean;
  selectedAward: Award;
  onSubmit: (values: Award, isAddMoreAction: boolean) => void;
  onClose: () => void;
}

const AwardModal = ({
  show,
  selectedAward,
  onSubmit,
  onClose,
}: AwardModalProps) => {
  const isAddMoreAction = useRef(true);

  useEffect(() => {
    isAddMoreAction.current = selectedAward === initialAwardValues;
  }, [selectedAward]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Award name is required'),
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
        <Modal.Title>Award</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={selectedAward}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          onSubmit(values, isAddMoreAction.current);

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
              <Form.Group controlId="formAwardName">
                <Form.Label>Award Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter award name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
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

export default AwardModal;
