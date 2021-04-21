import React, { useContext, useEffect, useState } from 'react';
import { BackgroundContainer } from '../BackgroundContainer';
import { AdminSignOut } from './AdminSignOut';
import GradientBackground from '../../assets/GradientBackground.png';
import { AdminTitle } from './AdminTitle';
import moment from 'moment';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Spinner,
} from 'react-bootstrap';
import { css } from 'emotion';
import { UserContext } from '../portfolio-shared/UserContext';
import { LinkContainer } from 'react-router-bootstrap';
import {
  updateDescription,
  updateName,
  updateDateBirth,
  updateTwitter,
  updateFacebook,
  updateGithub,
  updateLinkedin,
} from './AdminUtils';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { AboutEditor } from '../portfolio-shared/about/AboutEditor';
import { AboutDisplayManagaePage } from './ManagePage_AboutMe';
// Manage Public Information Page

const ManagePage = () => {
  const { name, setName } = useContext(UserContext);
  const { dateBirth, setDate } = useContext(UserContext);
  const { twitterLink, setTwitterLink } = useContext(UserContext);
  const { facebookLink, setFacebookLink } = useContext(UserContext);
  const { githubLink, setGithubLink } = useContext(UserContext);
  const { linkedinLink, setLinkedinLink } = useContext(UserContext);
  const [formName, setFormName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [isInvalidName, setIsInvalidName] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const { description, setDescription, profilePicture } = useContext(
    UserContext
  );
  //description function
  //内容填写控制
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);
  console.log(editorSaveButtonDisabled);
  const handleCancel = () => {
    setEditorOpen(false);
  };
  const handleOpenEditor = () => {
    setEditorOpen(true);
  };

  const handleSave = async (newDescription: string) => {
    setSaveButtonDisabled(true);
    try {
      await updateDescription(newDescription, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }
    setEditorOpen(false);
    setSaveButtonDisabled(false);
    setDescription(newDescription);
  };

  const { registrationComplete, isLoaded } = useContext(AuthContext);

  const isInvalid = isInvalidName;

  useEffect(() => {
    setFormName(name);
    if (dateBirth == '') {
      setStartDate(new Date());
    } else {
      setStartDate(new Date(dateBirth));
    }
    setFacebook(facebookLink);
    setTwitter(twitterLink);
    setGithub(githubLink);
    setLinkedin(linkedinLink);
  }, [name, dateBirth, facebookLink, twitterLink, githubLink, linkedinLink]);

  if (!isLoaded) {
    return null;
  }

  if (!registrationComplete) {
    return <Redirect to="/getstarted" />;
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormName(event.target.value);
    const regEx = new RegExp('^[a-z0-9 -]+$', 'i');
    setIsInvalidName(!regEx.test(event.target.value));
  };

  const handleTwitterChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTwitter(event.target.value);
  };
  const handleFacebookChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFacebook(event.target.value);
  };

  const handleGithubChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setGithub(event.target.value);
  };
  const handleLinkedinChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLinkedin(event.target.value);
  };

  const topMarginStyle = css({
    marginTop: '20vh',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSaving(true);
    setSuccess(false);
    event.preventDefault();
    updateName(formName, getAccessTokenSilently).then((response) => {
      if (response.ok) {
        setName(formName);

        // Setting a minimum time at least it was too fast on local
        setTimeout(() => {
          setSaving(false);
          setSuccess(true);
        }, 500);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
    updateDateBirth(
      moment(startDate).format('YYYY MM DD'),
      getAccessTokenSilently
    ).then((response) => {
      if (response.ok) {
        setDate(moment(startDate).format('YYYY MM DD'));

        // Setting a minimum time at least it was too fast on local
        setTimeout(() => {
          setSaving(false);
          setSuccess(true);
        }, 500);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
    updateTwitter(twitter, getAccessTokenSilently).then((response) => {
      if (response.ok) {
        setTwitterLink(twitter);

        // Setting a minimum time at least it was too fast on local
        setTimeout(() => {
          setSaving(false);
          setSuccess(true);
        }, 500);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
    updateFacebook(facebook, getAccessTokenSilently).then((response) => {
      if (response.ok) {
        setFacebookLink(facebook);

        // Setting a minimum time at least it was too fast on local
        setTimeout(() => {
          setSaving(false);
          setSuccess(true);
        }, 500);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
    updateGithub(github, getAccessTokenSilently).then((response) => {
      if (response.ok) {
        setGithubLink(github);

        // Setting a minimum time at least it was too fast on local
        setTimeout(() => {
          setSaving(false);
          setSuccess(true);
        }, 500);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
    updateLinkedin(linkedin, getAccessTokenSilently).then((response) => {
      if (response.ok) {
        setLinkedinLink(linkedin);

        // Setting a minimum time at least it was too fast on local
        setTimeout(() => {
          setSaving(false);
          setSuccess(true);
        }, 500);

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    });
  };

  const buttonStyle = {
    minWidth: '72px',
  };

  const containerStyle = {
    backgroundColor: 'white',
    overflow: 'auto',
    height: '30%',
  };
  interface SaveButton {
    isInvalid: boolean;
  }

  const SaveButton = (props: SaveButton) => {
    let content;
    if (saving) {
      content = (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      );
    } else if (success) {
      content = 'Saved!';
    } else {
      content = 'Save';
    }

    return (
      <Button
        className="border"
        variant={success ? 'success' : 'primary'}
        type="submit"
        disabled={saving || isInvalid}
        style={buttonStyle}
      >
        {content}
      </Button>
    );
  };

  return (
    <BackgroundContainer background={GradientBackground}>
      <div className="m-3 text-right">
        <AdminSignOut />
      </div>
      <Container>
        <Row className={topMarginStyle}></Row>
        <Row>
          <Col>
            <AdminTitle
              title="Edit Public Information"
              subtitle="What details would you like to change?"
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={8}>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mt-2"
                controlId="name"
                style={{ position: 'relative' }}
              >
                <div>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={formName}
                    onChange={handleNameChange}
                    type="text"
                    placeholder="Enter name"
                    isInvalid={isInvalidName}
                  />
                </div>
                <div>
                  <Form.Label>Date of birth</Form.Label>
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(startDate) => {
                        if (startDate instanceof Date) {
                          setStartDate(startDate);
                        }
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    value={twitter}
                    onChange={handleTwitterChange}
                    type="text"
                    placeholder="Enter Twitter link"
                  />
                </div>
                <div>
                  <Form.Label>Facebook</Form.Label>
                  <Form.Control
                    value={facebook}
                    onChange={handleFacebookChange}
                    type="text"
                    placeholder="Enter Facebook link"
                  />
                </div>
                <div>
                  <Form.Label>Github</Form.Label>
                  <Form.Control
                    value={github}
                    onChange={handleGithubChange}
                    type="text"
                    placeholder="Enter Github link"
                  />
                </div>
                <div>
                  <Form.Label>Linkedin</Form.Label>
                  <Form.Control
                    value={linkedin}
                    onChange={handleLinkedinChange}
                    type="text"
                    placeholder="Enter Linkedin link"
                  />
                </div>
                <div>
                  <Form.Label>About Me</Form.Label>
                  <Container className="p-4 mx-auto" style={containerStyle}>
                    <AboutEditor
                      initialDescription={description}
                      editorSaveButtonDisabled={editorSaveButtonDisabled}
                      onCancel={handleCancel}
                      onSave={handleSave}
                      show={editorOpen}
                    />
                    <AboutDisplayManagaePage
                      description={description}
                      onOpenEditor={handleOpenEditor}
                    />
                  </Container>
                </div>

                <Form.Text className="text-muted">
                  This will be shown on your profile
                </Form.Text>
                <FormControl.Feedback type="invalid" tooltip>
                  Name must only be made of letters [a-z], numbers [0-9], spaces
                  [ ] and hyphens [-]
                </FormControl.Feedback>
              </Form.Group>

              <div className="mt-5">
                <LinkContainer to="/admin" style={buttonStyle}>
                  <Button variant="light" className="mr-3 border">
                    Back
                  </Button>
                </LinkContainer>
                <SaveButton isInvalid={isInvalid} />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { ManagePage };
