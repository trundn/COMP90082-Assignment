import React, { useState, useEffect, useContext, Fragment } from 'react';
import Badge from 'react-bootstrap/Badge';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Button, Alert } from 'react-bootstrap';

import axios from 'axios';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import EducationModal from '../../components/resume/modals/EducationModal';

import { UserContext } from '../../portfolio-shared/UserContext';
import { EditContext } from '../../portfolio-shared/EditContext';
import {
  Experience,
  Qualification,
  Certificate,
  Skill,
  Reference,
  Resume,
} from '@pure-and-lazy/api-interfaces';

import { getDuration, getCertificateDuration } from '../../helpers/dateHelper';
import { getRandomColor } from '../../helpers/colorHelper';

import './resumePage.css';

import { DB_DATE_FORMAT } from '../../constants/dateConstant';
import { ResumeSectionTypes } from '../../constants/resumeConstant';

const defaultTypesValues: { [id: string]: boolean } = {
  [ResumeSectionTypes.Education]: false,
  [ResumeSectionTypes.Awards]: false,
  [ResumeSectionTypes.Certificates]: false,
  [ResumeSectionTypes.Work]: false,
  [ResumeSectionTypes.Skills]: false,
  [ResumeSectionTypes.References]: false,
};

const ResumePage = () => {
  const [alertMessage, setAlertMessage] = useState('');

  const [selectedAward, setSelectedAward] = useState<string>('');
  const [selectedQualification, setSelectedQualification] = useState<
    Qualification
  >();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate>();
  const [selectedExperience, setSelectedExperience] = useState<Experience>();
  const [selectedSkill, setSelectedSkill] = useState<Skill>();
  const [selectedReference, setSelectedReference] = useState<Reference>();
  const [resumeData, setResumeData] = useState<Resume>();

  const [modalShows, setModalShows] = useState<{
    [id: string]: boolean;
  }>(defaultTypesValues);
  const [modalDeleteShows, setModalDeleteShows] = useState<{
    [id: string]: boolean;
  }>(defaultTypesValues);

  const editMode = useContext(EditContext);
  const { _id } = useContext(UserContext);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `/api/resume/${_id}`,
      });

      setResumeData(result.data as Resume);
    } catch (error) {
      console.log('Failed to fetch resume data', error);
    }
  };

  const addQualification = async (newQualification: Qualification) => {
    try {
      const token = await getAccessTokenSilently();

      const result = await axios({
        method: 'PUT',
        url: `/api/resume/qualifications/add`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_qualification: newQualification,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          qualifications: [newQualification, ...prevState.qualifications],
        };
      });
    } catch (error) {
      console.log('Failed to add qualification', error);
    }
  };

  const updateModalShowStatus = (resumeType: string, status: boolean): void => {
    setModalShows((prevState) => {
      return { ...prevState, [resumeType]: status };
    });
  };

  const handleEduModalSubmitClick = (values: Qualification) => {
    updateModalShowStatus(ResumeSectionTypes.Education, false);
    const foundQual = resumeData.qualifications.find(
      (item) =>
        item.institutionName.toLowerCase() ===
          values.institutionName.toLowerCase() &&
        item.degree.toLowerCase() === values.degree.toLowerCase()
    );

    if (foundQual) {
      showAlertMessage('The degree in the same institution was already added.');
    } else {
      addQualification(values);
    }
  };

  const handleEduModalCloseClick = () => {
    updateModalShowStatus(ResumeSectionTypes.Education, false);
  };

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    window.setTimeout(() => {
      setAlertMessage('');
    }, 2000);
  };

  const updateSelectedResumePart = (targetKind: string, targetVal: any) => {
    if (targetKind === 'string') {
      setSelectedAward(targetVal);
    }
    if (targetKind === 'Qualification') {
      setSelectedQualification(targetVal);
    }
    if (targetKind === 'Certificate') {
      setSelectedCertificate(targetVal);
    }
    if (targetKind === 'Experience') {
      setSelectedExperience(targetVal);
    }
    if (targetKind === 'Skill') {
      setSelectedSkill(targetVal);
    }
    if (targetKind === 'Reference') {
      setSelectedReference(targetVal);
    }
  };

  const handleEditAction = (
    targetVal: any,
    targetKind: string,
    resumeType: string,
    status: boolean
  ): void => {
    updateSelectedResumePart(targetKind, targetVal);
    updateModalShowStatus(resumeType, status);
  };

  const handleDeleteAction = (
    targetVal: any,
    targetKind: string,
    resumeType: string,
    status: boolean
  ): void => {
    updateSelectedResumePart(targetKind, targetVal);
    setModalDeleteShows((prevState) => {
      return { ...prevState, [resumeType]: status };
    });
  };

  const buildEditableButtons = (onEditClick, onDeleteClick): JSX.Element => {
    if (editMode) {
      return (
        <Col xs={2} className="align-self-center">
          <span>
            <FontAwesomeIcon
              onClick={onEditClick}
              icon={faEdit}
              size="lg"
              color="#28a745"
              className="mr-2"
            />
            <FontAwesomeIcon
              onClick={onDeleteClick}
              icon={faTrashAlt}
              size="lg"
              color="#dc3545"
            />
          </span>
        </Col>
      );
    } else {
      return null;
    }
  };

  const bindEditableButtons = (
    targetVal: any,
    targetKind: string,
    sectionType: ResumeSectionTypes
  ): JSX.Element => {
    return buildEditableButtons(
      () => handleEditAction(targetVal, targetKind, sectionType, true),
      () => handleDeleteAction(targetVal, targetKind, sectionType, true)
    );
  };

  const buildEducationSection = (): JSX.Element[] => {
    let educationEls: JSX.Element[] = null;

    if (resumeData) {
      educationEls = resumeData.qualifications
        .sort((a, b) => {
          let dateA = moment(a.startDate, DB_DATE_FORMAT);
          let dateB = moment(b.startDate, DB_DATE_FORMAT);
          return dateB.diff(dateA);
        })
        .map((qual, index) => {
          return (
            <Row>
              <Col xs={editMode ? 10 : 12}>
                <div key={`${qual.degree}_${index}`} className="mb-4">
                  <h3>{qual.institutionName}</h3>
                  <p className="info">
                    {qual.degree}
                    <span>&bull;</span>
                    <em className="date">
                      {getDuration(qual.startDate, qual.graduationDate)}
                    </em>
                  </p>
                  <p>{qual.description}</p>
                </div>
              </Col>
              {bindEditableButtons(
                qual,
                'Qualification',
                ResumeSectionTypes.Education
              )}
            </Row>
          );
        });
    }

    return educationEls;
  };

  const buildWorkResponsibilitiesContent = (
    experience: Experience
  ): JSX.Element[] => {
    let resEls: JSX.Element[] = null;

    if (experience)
      resEls = experience.responsibilities.map((resp, index) => {
        return (
          <li key={index} className="resume-list-item">
            <span className="resume-list-icon">&#9679;</span>
            <span className="resume-list-content">{resp}</span>
          </li>
        );
      });

    return resEls;
  };

  const builAwardsSection = (): JSX.Element[] => {
    let awardEls: JSX.Element[] = null;

    if (resumeData)
      awardEls = resumeData.awards.map((award, index) => {
        return (
          <Row>
            <Col xs={editMode ? 10 : 12}>
              <li key={index} className="resume-list-item">
                <span className="resume-list-icon">&#9679;</span>
                <span className="resume-list-content">{award}</span>
              </li>
            </Col>
            {bindEditableButtons(award, 'string', ResumeSectionTypes.Awards)}
          </Row>
        );
      });

    return awardEls;
  };

  const buildWorkExperienceSection = (): JSX.Element[] => {
    let expEls: JSX.Element[] = null;

    if (resumeData) {
      expEls = resumeData.experiences
        .sort((a, b) => {
          let dateA = moment(a.startDate, DB_DATE_FORMAT);
          let dateB = moment(b.startDate, DB_DATE_FORMAT);
          return dateB.diff(dateA);
        })
        .map((exp, index) => {
          return (
            <Row>
              <Col xs={editMode ? 10 : 12}>
                <div
                  key={`${exp.organisation}_${exp.role}_${index}`}
                  className="mb-4"
                >
                  <h3>{exp.organisation}</h3>
                  <p className="info">
                    <em className="date">
                      {getDuration(exp.startDate, exp.endDate)}
                    </em>
                  </p>
                  <p className="info">
                    {exp.role}
                    <span>&bull;</span>
                    {`${exp.city}, ${exp.country}`}
                  </p>
                  <p>{exp.workSummary}</p>
                  <ul>{buildWorkResponsibilitiesContent(exp)}</ul>
                </div>
              </Col>
              {bindEditableButtons(exp, 'Experience', ResumeSectionTypes.Work)}
            </Row>
          );
        });
    }

    return expEls;
  };

  const buildSkillsSection = (): JSX.Element[] => {
    let skillEls: JSX.Element[] = null;

    if (resumeData) {
      skillEls = resumeData.skills.map((skill, index) => {
        const backgroundColor = getRandomColor();
        const className = 'bar-expand ' + skill.name.toLowerCase();
        const width = skill.level;

        return (
          <Row>
            <Col xs={editMode ? 10 : 12}>
              <li key={`${skill.name}_${index}`}>
                <span
                  style={{ width, backgroundColor }}
                  className={className}
                ></span>
                <em>
                  {skill.name}
                  {'  '}
                  <Badge variant="light">{`${skill.yearOfExperiences}+ yrs.`}</Badge>
                </em>
              </li>
            </Col>
            {bindEditableButtons(skill, 'Skill', ResumeSectionTypes.Skills)}
          </Row>
        );
      });
    }

    return skillEls;
  };

  const buildReferencesSection = (): JSX.Element[] => {
    let refEls: JSX.Element[] = null;

    if (resumeData) {
      refEls = resumeData.references.map((ref, index) => {
        return (
          <Row>
            <Col xs={editMode ? 10 : 12}>
              <div className="mb-4" key={`${ref.name}_${index}`}>
                <h5>{ref.name}</h5>
                <h5>{ref.position}</h5>
                <p className="subcontent">{ref.organisation}</p>
                <p className="subcontent">{ref.phoneNumber}</p>
                <p className="subcontent">{ref.email}</p>
              </div>
            </Col>
            {bindEditableButtons(
              ref,
              'Reference',
              ResumeSectionTypes.References
            )}
          </Row>
        );
      });
    }

    return refEls;
  };

  const buildCertificatesSection = (): JSX.Element[] => {
    let cerEls: JSX.Element[] = null;

    if (resumeData) {
      cerEls = resumeData.certificates.map((cer, index) => {
        return (
          <Row>
            <Col xs={editMode ? 10 : 12}>
              <div className="mb-4" key={`${cer.name}_${index}`}>
                <h4 className="font-weight-bold">{cer.name}</h4>
                <h4>{cer.issueOrganization}</h4>
                <p className="subcontent">
                  {getCertificateDuration(cer.issuedDate, cer.expiryDate)}
                </p>
                {cer.credentialId && (
                  <p className="subcontent">{`Credential ID ${cer.credentialId}`}</p>
                )}
              </div>
            </Col>
            {bindEditableButtons(
              cer,
              'Certificate',
              ResumeSectionTypes.Certificates
            )}
          </Row>
        );
      });
    }

    return cerEls;
  };

  const buildHeaderColumn = (title: string): JSX.Element => {
    return (
      <div className="three columns header-col">
        <h1>
          <span>{title}</span>
        </h1>
      </div>
    );
  };

  const skillsContentBuilder = () => {
    return (
      <div className="bars">
        <ul className="skill-lists">{buildSkillsSection()}</ul>
      </div>
    );
  };

  const buildResumeSection = (
    colTitle: string,
    contentBuilder: (() => JSX.Element[]) | (() => JSX.Element),
    sectionType: ResumeSectionTypes
  ): JSX.Element => {
    return (
      <Container className="row-separator">
        <Row>
          <Col md={3}>{buildHeaderColumn(colTitle)}</Col>
          <Col md={8}>{contentBuilder()}</Col>
        </Row>
        {editMode && (
          <Row className="justify-content-center">
            <Col md="auto">
              <Button
                onClick={() => {
                  updateModalShowStatus(sectionType, true);
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> Add More
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    );
  };

  return (
    <Fragment>
      {alertMessage && (
        <Alert variant="danger" dismissible>
          {alertMessage}
        </Alert>
      )}
      <section id="resume">
        <EducationModal
          show={modalShows[ResumeSectionTypes.Education]}
          onSubmit={handleEduModalSubmitClick}
          onClose={handleEduModalCloseClick}
        />
        <Container>
          {buildResumeSection(
            'Education',
            buildEducationSection,
            ResumeSectionTypes.Education
          )}
          {buildResumeSection(
            'Awards',
            builAwardsSection,
            ResumeSectionTypes.Awards
          )}
          {buildResumeSection(
            'Certificates',
            buildCertificatesSection,
            ResumeSectionTypes.Certificates
          )}
          {buildResumeSection(
            'Work',
            buildWorkExperienceSection,
            ResumeSectionTypes.Work
          )}
          {buildResumeSection(
            'Skills',
            skillsContentBuilder,
            ResumeSectionTypes.Skills
          )}
          {buildResumeSection(
            'References',
            buildReferencesSection,
            ResumeSectionTypes.References
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default ResumePage;
