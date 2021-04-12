import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

import * as Yup from 'yup';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik } from 'formik';
import { Button, Col, Form, Modal } from 'react-bootstrap';

import { Experience } from '@pure-and-lazy/api-interfaces';
import { DISPLAY_DATE_FORMAT } from '../../../constants/dateConstant';

import { SetFieldValue } from '../../../types/ResumeTypes';
import { initialExpValues } from '../../../constants/resumeInitValues';

interface ExperienceModalProps {
  show: boolean;
  selectedExp: Experience;
  onSubmit: (
    values: Experience,
    isDisableEndDate: boolean,
    isAddMoreAction: boolean
  ) => void;
  onClose: () => void;
}

const ExperienceModal = ({
  show,
  selectedExp,
  onSubmit,
  onClose,
}: ExperienceModalProps) => {
  const isAddMoreAction = useRef(true);
  const setFieldValue = useRef<SetFieldValue>(null);
  const [isDisableEndDate, setIsDisableEndDate] = useState(false);

  useEffect(() => {
    if (!selectedExp?.endDate) {
      setIsDisableEndDate(true);
    }

    isAddMoreAction.current = selectedExp === initialExpValues;
  }, [selectedExp]);

  const validationSchema = Yup.object().shape({
    organisation: Yup.string().required('Organization name is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
    workSummary: Yup.string().required('Work summary is required'),
    role: Yup.string().required('Role is required'),
    startDate: Yup.date(),
    endDate: Yup.date().min(
      isDisableEndDate ? Yup.ref('endDate') : Yup.ref('startDate'),
      ({ min }) =>
        `Date needs to be before ${moment(min).format(DISPLAY_DATE_FORMAT)}!!`
    ),
  });

  const handleFormClose = () => {
    setIsDisableEndDate(false);
    onClose();
  };

  const handleNotCompletedCheckChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setIsDisableEndDate(event.target.checked);
    if (!event.target.checked) {
      setFieldValue.current('endDate', moment().toDate());
    }
  };

  const buildDatePicker = (
    disabled: boolean,
    name: string,
    selectedDate: Date,
    setFieldValueFunc: SetFieldValue,
    isInvalid?: boolean
  ): JSX.Element => {
    setFieldValue.current = setFieldValueFunc;
    const convertedDate = selectedDate
      ? moment(selectedDate).toDate()
      : moment().toDate();

    return (
      <DatePicker
        disabled={disabled}
        dateFormat="yyyy-MM-dd"
        selected={convertedDate}
        onChange={(date) => {
          setFieldValueFunc(name, date);
        }}
        customInput={
          <Form.Control type="text" name={name} isInvalid={isInvalid} />
        }
      />
    );
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
        <Modal.Title>Experience</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={selectedExp}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          onSubmit(values, isDisableEndDate, isAddMoreAction.current);

          setIsDisableEndDate(false);
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
              <Form.Group controlId="formOrgName">
                <Form.Label>Organization Name</Form.Label>
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

              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  placeholder="Enter country"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.country}
                  isInvalid={!!errors.country}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.country}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Enter role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                  isInvalid={!!errors.role}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.role}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formWorkSummary">
                <Form.Label>Work Summary</Form.Label>
                <Form.Control
                  as="textarea"
                  name="workSummary"
                  rows={5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workSummary}
                  isInvalid={!!errors.workSummary}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.workSummary}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} xs={3}>
                  <Form.Label>From</Form.Label>
                  {buildDatePicker(
                    false,
                    'startDate',
                    values.startDate,
                    setFieldValue
                  )}
                </Form.Group>
                <Form.Group as={Col} xs={3}>
                  <Form.Label>To</Form.Label>
                  {buildDatePicker(
                    isDisableEndDate,
                    'endDate',
                    values.endDate,
                    setFieldValue,
                    !!errors.endDate
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.endDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formNotCompleted">
                <Form.Check
                  type="checkbox"
                  label="Not Completed"
                  checked={!!isDisableEndDate}
                  onChange={handleNotCompletedCheckChange}
                />
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

export default ExperienceModal;
