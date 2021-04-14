// external
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import moment from 'moment';
import { date } from 'yup/lib/locale';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// internal
import { SetFieldValue } from '../../types/ResumeTypes';
import { Event } from '@pure-and-lazy/api-interfaces';
import { initialEventValues } from '../../constants/eventInitValues';

interface EventModalProps {
  show: boolean;
  onSubmit: (values: Event, isAddMoreAction: boolean) => void;
  onClose: () => void;
}

const EventModal = ({
  show,
  // selectedEvent,
  onSubmit,
  onClose,
}: EventModalProps) => {
  const isAddMoreAction = useRef(true);
  const setFieldValue = useRef<SetFieldValue>(null);
  // useEffect(() => {
  //  isAddMoreAction.current = selectedEvent === initialEventValues;
  // }, [selectedEvent]);

  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required('Event Name is required'),
    eventHoster: Yup.string().required('Event Hoster is required'),
    eventLocation: Yup.string().required('Event Location is required'),
    startDate: Yup.string().required('Start Date is required'),
    endDate: Yup.string().required('End Date is required'),
  });

  const handleFormClose = () => {
    onClose();
  };

  // Create own datepicker
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
        <Modal.Title>Event</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialEventValues}
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
              {/* Event Name */}
              <Form.Group controlId="formEventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  name="eventName"
                  placeholder="Enter event name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.eventName}
                  isInvalid={!!errors.eventName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.eventName}
                </Form.Control.Feedback>
              </Form.Group>
              {/* Event Details */}
              <Form.Row>
                <Form.Group as={Col} md={3}>
                  {/* Hoster */}
                  <Form.Label>Hoster</Form.Label>
                  <Form.Control
                    type="text"
                    name="eventHoster"
                    placeholder="Enter event hoster"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.eventHoster}
                    isInvalid={!!errors.eventHoster}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.eventHoster}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Location */}
                <Form.Group as={Col} md={3}>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="eventLocation"
                    placeholder="Enter event location"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.eventLocation}
                    isInvalid={!!errors.eventLocation}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.eventLocation}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              {/* Event Start and End Date */}
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
                    false,
                    'endDate',
                    values.endDate,
                    setFieldValue
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.endDate}
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

export default EventModal;
