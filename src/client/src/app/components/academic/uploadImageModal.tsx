import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Col, Row, Image } from 'react-bootstrap';

import { SingalImage } from '@pure-and-lazy/api-interfaces';

import * as yup from 'yup';
import { Formik } from 'formik';
import { generateCloudinaryUrl } from '../../cloudinaryUtility';
import { SetFieldValue } from '../../types/ResumeTypes';

interface SingleImageProps {
  show: boolean;
  onClose(): void;
  onSubmit: (value: SingalImage) => void;
}

const UploadImageModal = ({ show, onClose, onSubmit }: SingleImageProps) => {
  const setFieldValueFunc = useRef<SetFieldValue>(null);
  const handleImage = async (file) => {
    const imageUrl = await generateCloudinaryUrl(file);
    setFieldValueFunc.current('imageUrl', imageUrl);
  };

  const validation_schema = yup.object().shape({
    imageUrl: yup.string().required('Image file is required!'),
  });

  const initialImageValue: SingalImage = {
    imageUrl: '',
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Formik
        validationSchema={validation_schema}
        initialValues={initialImageValue}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit(values);
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
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Image
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={1} md={4}>
                  <Image src={values.imageUrl} rounded />
                </Col>
              </Row>
              <Form.Group>
                <Form.File
                  id="fileUpload"
                  className="image_upload"
                  name="imageUrl"
                  label="Image Upload"
                  onChange={(event) => handleImage(event.target.files[0])}
                  feedback={errors.imageUrl}
                  isInvalid={!!errors.imageUrl}
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

export default UploadImageModal;
