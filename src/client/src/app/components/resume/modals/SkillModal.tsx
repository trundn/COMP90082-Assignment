import React, { useEffect, useRef } from 'react';

import * as Yup from 'yup';

import { Formik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';

import { Skill } from '@pure-and-lazy/api-interfaces';
import { initialSkillValues } from '../../../constants/resumeInitValues';

interface SkillModalProps {
  show: boolean;
  selectedSkill: Skill;
  onSubmit: (values: Skill, isAddMoreAction: boolean) => void;
  onClose: () => void;
}

const SkillModal = ({
  show,
  selectedSkill,
  onSubmit,
  onClose,
}: SkillModalProps) => {
  const isAddMoreAction = useRef(true);

  useEffect(() => {
    isAddMoreAction.current = selectedSkill === initialSkillValues;
  }, [selectedSkill]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Programming language name is required'),
    level: Yup.number().required('Level is required').min(1).max(100),
    yearOfExperiences: Yup.number()
      .required('Year of experience is required')
      .min(1)
      .max(100),
  });

  return (
    <Modal show={show} onHide={onClose} size="lg" centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Skill</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={selectedSkill}
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
              <Form.Group controlId="formSkillName">
                <Form.Label>Programming Language Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter programming language name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formLevel">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  type="number"
                  name="level"
                  placeholder="Enter skill level (1% ~ 100%)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.level}
                  isInvalid={!!errors.level}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.level}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formYearOfExp">
                <Form.Label>Year of Experience</Form.Label>
                <Form.Control
                  type="number"
                  name="yearOfExperiences"
                  placeholder="Enter year of experience"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.yearOfExperiences}
                  isInvalid={!!errors.yearOfExperiences}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.yearOfExperiences}
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

export default SkillModal;
