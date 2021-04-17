import React, { useEffect, useRef } from 'react';

import * as Yup from 'yup';

import { Formik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';

import { Reference } from '@pure-and-lazy/api-interfaces';
import { initialRefValues } from '../../../constants/resumeInitValues';

interface ReferenceModalProps {
  show: boolean;
  selectedRef: Reference;
  onSubmit: (values: Reference, isAddMoreAction: boolean) => void;
  onClose: () => void;
}

const ReferenceModal = ({
  show,
  selectedRef,
  onSubmit,
  onClose,
}: ReferenceModalProps) => {
  const isAddMoreAction = useRef(true);

  useEffect(() => {
    isAddMoreAction.current = selectedRef === initialRefValues;
  }, [selectedRef]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Ref name is required'),
    position: Yup.string().required('Position is required'),
    organisation: Yup.string().required('Organization is required'),
    email: Yup.string()
      .required('Email is required')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Invalid email format'),
  });

  return (
    <Modal show={show} onHide={onClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Reference</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={selectedRef}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          onSubmit(values, isAddMoreAction.current);

          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="formRefName">
                <Form.Label>Ref Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter ref name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formOrg">
                <Form.Label>Organization</Form.Label>
                <Form.Control
                  type="text"
                  name="organisation"
                  placeholder="Enter organization name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.organisation}
                  isInvalid={!!errors.organisation}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.organisation}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  name="position"
                  placeholder="Enter position"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.position}
                  isInvalid={!!errors.position}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.position}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
              </Form.Group>

              <Form.Group controlId="formEmailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Enter email address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Submit</Button>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ReferenceModal;
