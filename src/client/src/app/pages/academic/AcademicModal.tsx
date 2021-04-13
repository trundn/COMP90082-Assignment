import React, { useState } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';

import { Academic } from '@pure-and-lazy/api-interfaces';

// import * as Yup from 'yup';
import { Formik } from 'formik';

interface AcademicModalProps {
  show: boolean;
  onClose(): void;
}

const AcademicModal = ({ show, onClose }: AcademicModalProps) => {
  const initialValues = {};
  /**
     * interface Academic extends Namable {
        academicID: number;
        title: string;
        author: string;
        orginzation: string;
        createDate: Date;
        shortDescription: string;
        bodyParagraph: string;
        academicReferences: String;
        academicImage: string;
        }
    */

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

      <Formik onSubmit={console.log} initialValues={initialValues}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="AcademicTitle">
                <Form.Label>Title </Form.Label>
                <Form.Control type="text" placeholder="Enter Title" />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} md="4" controlId="AcademicAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" placeholder="Enter Auther" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="AcademicOrganzation">
                  <Form.Label>Organzation</Form.Label>
                  <Form.Control type="text" placeholder="Enter Organzation" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="AcademicCreateDate">
                  <Form.Label>CreateDate</Form.Label>
                  /** 缺少时间 */
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="AcademicShortDescription">
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Enter Short Description"
                />
                <Form.Text className="text-muted">
                  Enter less than 200 words.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="AcademicBody">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={7}
                  placeholder="Normal text"
                />
              </Form.Group>

              <Form.Group controlId="AcademicReferences">
                <Form.Label>References</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Normal text"
                />
              </Form.Group>

              <Form.Group>
                <Form.File
                  className="image_upload"
                  required
                  name="image_upload"
                  label="Image Upload"
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
