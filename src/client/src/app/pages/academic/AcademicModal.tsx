import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

import { Academic } from '@pure-and-lazy/api-interfaces';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as yup from 'yup';
import { Formik } from 'formik';

import { generateCloudinaryUrl } from '../../cloudinaryUtility';
import { SetFieldValue } from '../../types/ResumeTypes';
import { initialValues } from '../academic/initialAcademicValues';

interface AcademicModalProps {
  show: boolean;
  onClose(): void;
  onSubmit: (values: Academic, isAddMoreAcademic: boolean) => void;
  selectedAcademic: Academic;
}

const AcademicModal = ({
  show,
  onClose,
  onSubmit,
  selectedAcademic,
}: AcademicModalProps) => {
  /**
   * 
   * 
   *     title : '',
    author : '',
    orginzation: '',
    createDate: new Date(),
    shortDescription: '',
    bodyParagraph: '',
    academicReferences: '',
    academicImage: ''
   * 
   */
  const isAddMoreAcademic = useRef(true);
  const [startDate, setStartDate] = useState(new Date());
  const setFieldValueFunc = useRef<SetFieldValue>(null);

  isAddMoreAcademic.current = selectedAcademic === initialValues;

  const validation_schema = yup.object().shape({
    title: yup.string().required('Title is required!'),
    author: yup.string().required('Author is required!'),
    organization: yup.string().required('Organzation is required!'),
    shortDescription: yup.string().required('Short description is required!'),
    bodyParagraph: yup.string().required('Body is required!'),
    academicReferences: yup.string().required('References are required!'),
    academicImage: yup.string().required('Image file is required!'),
  });

  const handleImage = async (file) => {
    const imageUrl = await generateCloudinaryUrl(file);
    setFieldValueFunc.current('academicImage', imageUrl);
  };

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
          Add Academic
        </Modal.Title>
      </Modal.Header>

      <Formik
        validationSchema={validation_schema}
        initialValues={selectedAcademic}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(values, isAddMoreAcademic.current);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            {(setFieldValueFunc.current = setFieldValue)}
            <Modal.Body>
              <Form.Group>
                <Form.Label>Title </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} md="4">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Auther"
                    name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                    isInvalid={!!errors.author}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.author}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>Organzation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Organzation"
                    name="organization"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.organization}
                    isInvalid={!!errors.organization}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.organization}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>CreateDate</Form.Label>
                  <DatePicker
                    selected={startDate}
                    name="createDate"
                    onChange={(date) => setStartDate(date)}
                    value={values.createDate}
                    dateFormat="yyy/MM/dd"
                    customInput={<Form.Control type="text" />}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Enter Short Description"
                  name="shortDescription"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.shortDescription}
                  isInvalid={!!errors.shortDescription}
                />
                <Form.Text className="text-muted">
                  Enter less than 200 words.
                </Form.Text>
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={7}
                  placeholder="Normal text"
                  name="bodyParagraph"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bodyParagraph}
                  isInvalid={!!errors.bodyParagraph}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>References</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Normal text"
                  name="academicReferences"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.academicReferences}
                  isInvalid={!!errors.academicReferences}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.academicReferences}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.File
                  id="fileUpload"
                  className="image_upload"
                  name="academicImage"
                  label="Image Upload"
                  onChange={(event) => handleImage(event.target.files[0])}
                  feedback={errors.academicImage}
                  isInvalid={!!errors.academicImage}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Submit</Button>
              <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AcademicModal;
