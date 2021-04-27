import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { EditorBody } from './EditorBody';
import { ProjectItemImage } from './ProjectItemImage';
import * as Yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import {
  PortfolioItem,
  PortfolioItemValue,
} from '@pure-and-lazy/api-interfaces';
import { PrivacyToggle } from './PrivacyToggle';
import { isError } from 'util';

interface ProjectItemEditor {
  initialInfo: PortfolioItem;
  infoState: PortfolioItem;
  onUpdateItem: (key: keyof PortfolioItem, value: PortfolioItemValue) => void;
  editorSaveButtonDisabled: boolean;
  onCancel: () => void;
  onSave: () => void;
  show: boolean;
}

const ProjectItemEditor = (props: ProjectItemEditor) => {
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onUpdateItem('description', event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdateItem('name', event.target.value);
  };

  const handleSave = () => {
    props.onSave();
  };

  const handleImageChange = (image: string) => {
    props.onUpdateItem('image', image);
  };

  const handleContentChange = (content: string) => {
    props.onUpdateItem('content', content);
  };

  const handlePublicChange = (newPublic: boolean) => {
    props.onUpdateItem('public', newPublic);
  };

  // schema validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(`${props.initialInfo.name} Name is required`),
    ProjectDescription: Yup.string().required(`${props.initialInfo.name} Description is required`),
  });

  const { name, image, description, content } = props.infoState;
  const isPublic = props.infoState.public;

  return (
    <Modal 
      show={props.show}
      centered
      onHide={props.onCancel}
      dialogClassName="modal-xl"
      size="lg"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.initialInfo.name === ''
                  ? 'Create New'
                  : `Edit ${props.initialInfo.name}`}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={props.initialInfo}
        validationSchema={validationSchema}
        onSubmit={()=>{

        }}
      >
        <Container
          style={{
            backgroundColor: 'white',
            borderRadius: '3px',
          }}
          className="p-5"
          fluid
        >
          <Row className="py-3">
            <Col xs={12} lg={4} xl={3}>
              <ProjectItemImage onImageChange={handleImageChange} image={image} />
            </Col>
            <Col xs={12} lg={8} xl={9}>
              <Form>
                <Form.Group controlId="formGroupTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name = "ProjectTitle"
                    placeholder = "Enter Project Title"
                    onChange={handleTitleChange}
                    size="lg"
                    value={name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formGroupDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name = "ProjectDescription"
                    placeholder = "Enter Description"
                    as="textarea"
                    value={description}
                    onChange={handleDescriptionChange}
                    style={{ minHeight: '100px' }}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row className="w-100 mx-0 py-3">
            <EditorBody content={content} onContentChange={handleContentChange} />
          </Row>
          <Row className="float-right">
            <Col sm="auto">
              <Button
                className="mx-1"
                onClick={props.onCancel}
                variant="outline-secondary"
              >
                Cancel
              </Button>
              <PrivacyToggle
                isPublic={isPublic}
                onPublicChange={handlePublicChange}
              />
              <Button
                disabled={props.editorSaveButtonDisabled}
                onClick={handleSave}
                className="ml-1"
              >
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      </Formik>
      
    </Modal>
  );
};

export { ProjectItemEditor };
