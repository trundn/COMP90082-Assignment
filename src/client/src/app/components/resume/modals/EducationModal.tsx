import React, { useState, useEffect, FormEvent } from 'react';

import * as Yup from 'yup';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik } from 'formik';
import { Button, Col, Form, Modal } from 'react-bootstrap';

import { Qualification } from '@pure-and-lazy/api-interfaces';
import { DISPLAY_DATE_FORMAT } from '../../../constants/dateConstant';

interface EducationModalProps {
  show: boolean;
  onSubmit: (values: Qualification) => void;
  onClose: () => void;
}

const EducationModal = ({ show, onSubmit, onClose }: EducationModalProps) => {
  const initialValues: Qualification = {
    institutionName: '',
    degree: '',
    description: '',
    startDate: new Date(),
    graduationDate: new Date(),
  };

  const validationSchema = Yup.object().shape({
    institutionName: Yup.string().required('Institution name is required'),
    degree: Yup.string().required('Degree name is required'),
    description: Yup.string().required('Description name is required'),
    startDate: Yup.date(),
    graduationDate: Yup.date().min(
      Yup.ref('startDate'),
      ({ min }) =>
        `Date needs to be before ${moment(min).format(DISPLAY_DATE_FORMAT)}!!`
    ),
  });

  const buildDatePicker = (
    name: string,
    selectedDate: Date,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => void,
    isInvalid?: boolean
  ): JSX.Element => {
    return (
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={selectedDate}
        onChange={(date) => {
          if (date instanceof Date) {
            setFieldValue(name, date);
          }
        }}
        customInput={
          <Form.Control type="text" name={name} isInvalid={isInvalid} />
        }
      />
    );
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Education</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(values);
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
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="formInstName">
                <Form.Label>Institution Name</Form.Label>
                <Form.Control
                  type="text"
                  name="institutionName"
                  placeholder="Enter institution name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.institutionName}
                  isInvalid={!!errors.institutionName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.institutionName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formDegree">
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  type="text"
                  name="degree"
                  placeholder="Enter degree"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.degree}
                  isInvalid={!!errors.degree}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.degree}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  rows={5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} xs={3}>
                  <Form.Label>From</Form.Label>
                  {buildDatePicker(
                    'startDate',
                    values.startDate,
                    setFieldValue
                  )}
                </Form.Group>
                <Form.Group as={Col} xs={3}>
                  <Form.Label>To</Form.Label>
                  {buildDatePicker(
                    'graduationDate',
                    values.graduationDate,
                    setFieldValue,
                    !!errors.graduationDate
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.graduationDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formNotCompleted">
                <Form.Check type="checkbox" label="Not Completed" />
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

export default EducationModal;
