import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

import * as Yup from 'yup';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik } from 'formik';
import {
  Button,
  Col,
  Form,
  Modal,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

import { Qualification } from '@pure-and-lazy/api-interfaces';
import { DISPLAY_DATE_FORMAT } from '../../../constants/dateConstant';

import { SetFieldValue } from '../../../types/ResumeTypes';
import { initialQualValues } from '../../../constants/resumeInitValues';

import { generateCloudinaryUrl } from '../../../cloudinaryUtility';

interface QualificationModalProps {
  show: boolean;
  selectedQual: Qualification;
  onSubmit: (
    values: Qualification,
    isDisableEndDate: boolean,
    isAddMoreAction: boolean
  ) => void;
  onClose: () => void;
}

const QualificationModal = ({
  show,
  selectedQual,
  onSubmit,
  onClose,
}: QualificationModalProps) => {
  const isAddMoreAction = useRef(true);
  const setFieldValue = useRef<SetFieldValue>(null);
  const [isDisableEndDate, setIsDisableEndDate] = useState(false);

  useEffect(() => {
    if (!selectedQual?.graduationDate) {
      setIsDisableEndDate(true);
    }

    isAddMoreAction.current = selectedQual === initialQualValues;
  }, [selectedQual]);

  const validationSchema = Yup.object().shape({
    institutionName: Yup.string().required('Institution name is required'),
    degree: Yup.string().required('Degree is required'),
    description: Yup.string().required('Description is required'),
    startDate: Yup.date(),
    graduationDate: Yup.date().min(
      isDisableEndDate ? Yup.ref('graduationDate') : Yup.ref('startDate'),
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
      setFieldValue.current('graduationDate', moment().toDate());
    }
  };

  const handleFileUploadClick = (uploaderId: string) => {
    document.getElementById(uploaderId).click();
  };

  const handleCloudinaryUrlGenerate = async (
    fieldName: string,
    fieldUrlName: string,
    file: any
  ) => {
    const imageUrl = await generateCloudinaryUrl(file);
    setFieldValue.current(fieldName, file.name);
    setFieldValue.current(fieldUrlName, imageUrl);
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

  const buildFileUploaderSection = (
    filedLabel: string,
    fieldName: string,
    fieldValue: string,
    fieldUrlName: string
  ): JSX.Element => {
    const fileControlId = `${fieldName}Uploader`;

    return (
      <Form.Group>
        <Form.Label>{filedLabel}</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            name={fieldName}
            placeholder={'No file choosen'}
            value={fieldValue}
            disabled
          />
          <InputGroup.Append>
            <Button
              variant="outline-info"
              onClick={() => handleFileUploadClick(fileControlId)}
            >
              Select
            </Button>
            <Form.File
              id={fileControlId}
              onChange={(evt) => {
                handleCloudinaryUrlGenerate(
                  fieldName,
                  fieldUrlName,
                  evt.target.files[0]
                );
              }}
              style={{ display: 'none' }}
            />
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
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
        <Modal.Title>Qualification</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={selectedQual}
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
                <Form.Group as={Col} controlId="formStartDate" xs={3}>
                  <Form.Label>From</Form.Label>
                  {buildDatePicker(
                    false,
                    'startDate',
                    values.startDate,
                    setFieldValue
                  )}
                </Form.Group>
                <Form.Group as={Col} controlId="formGradDate" xs={3}>
                  <Form.Label>To</Form.Label>
                  {buildDatePicker(
                    isDisableEndDate,
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
                <Form.Check
                  type="checkbox"
                  label="Not Completed"
                  checked={!!isDisableEndDate}
                  onChange={handleNotCompletedCheckChange}
                />
              </Form.Group>

              {buildFileUploaderSection(
                'Upload Certificate',
                'certificateFileName',
                values.certificateFileName,
                'certificateUrl'
              )}

              {buildFileUploaderSection(
                'Upload Academic Transcript/Statement of Results',
                'transcriptFileName',
                values.transcriptFileName,
                'transcriptUrl'
              )}
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

export default QualificationModal;
