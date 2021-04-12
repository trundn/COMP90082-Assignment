import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

import * as Yup from 'yup';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik } from 'formik';
import { Button, Col, Form, Modal } from 'react-bootstrap';

import { Certificate } from '@pure-and-lazy/api-interfaces';
import { DISPLAY_DATE_FORMAT } from '../../../constants/dateConstant';

import { SetFieldValue } from '../../../types/ResumeTypes';
import { initialCertificateValues } from '../../../constants/resumeInitValues';

interface CertificateModalProps {
  show: boolean;
  selectedCert: Certificate;
  onSubmit: (
    values: Certificate,
    isDisableExpiryDate: boolean,
    isAddMoreAction: boolean
  ) => void;
  onClose: () => void;
}

const CertificateModal = ({
  show,
  selectedCert,
  onSubmit,
  onClose,
}: CertificateModalProps) => {
  const isAddMoreAction = useRef(true);
  const setFieldValue = useRef<SetFieldValue>(null);
  const [isDisableExpiryDate, setIsDisableExpiryDate] = useState(false);

  useEffect(() => {
    if (!selectedCert?.expiryDate) {
      setIsDisableExpiryDate(true);
    }

    isAddMoreAction.current = selectedCert === initialCertificateValues;
  }, [selectedCert]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Cert name is required'),
    issueOrganization: Yup.string().required('Issue organization is required'),
    issuedDate: Yup.date(),
    expiryDate: Yup.date().min(
      isDisableExpiryDate ? Yup.ref('expiryDate') : Yup.ref('issuedDate'),
      ({ min }) =>
        `Date needs to be before ${moment(min).format(DISPLAY_DATE_FORMAT)}!!`
    ),
  });

  const handleFormClose = () => {
    setIsDisableExpiryDate(false);
    onClose();
  };

  const handleNotExpirationCheckChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setIsDisableExpiryDate(event.target.checked);
    if (!event.target.checked) {
      setFieldValue.current('expiryDate', moment().toDate());
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
        <Modal.Title>Certification</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={selectedCert}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          onSubmit(values, isDisableExpiryDate, isAddMoreAction.current);

          setIsDisableExpiryDate(false);
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
              <Form.Group controlId="formCertName">
                <Form.Label>Cert Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter cert name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formIssueOrg">
                <Form.Label>Issue Organization</Form.Label>
                <Form.Control
                  type="text"
                  name="issueOrganization"
                  placeholder="Enter issue organization"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.issueOrganization}
                  isInvalid={!!errors.issueOrganization}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.issueOrganization}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formCredentialId">
                <Form.Label>Credential ID</Form.Label>
                <Form.Control
                  type="text"
                  name="credentialId"
                  placeholder="Enter credential id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.credentialId}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} xs={3}>
                  <Form.Label>From</Form.Label>
                  {buildDatePicker(
                    false,
                    'issuedDate',
                    values.issuedDate,
                    setFieldValue
                  )}
                </Form.Group>
                <Form.Group as={Col} xs={3}>
                  <Form.Label>To</Form.Label>
                  {buildDatePicker(
                    isDisableExpiryDate,
                    'expiryDate',
                    values.expiryDate,
                    setFieldValue,
                    !!errors.expiryDate
                  )}
                  <Form.Control.Feedback type="invalid">
                    {errors.expiryDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formNotExpired">
                <Form.Check
                  type="checkbox"
                  label="There is no expiration"
                  checked={!!isDisableExpiryDate}
                  onChange={handleNotExpirationCheckChange}
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

export default CertificateModal;
