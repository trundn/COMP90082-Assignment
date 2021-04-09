import React, { useState, useEffect, useContext } from 'react';
import Badge from 'react-bootstrap/Badge';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';
import moment from 'moment';

import { UserContext } from '../../portfolio-shared/UserContext';
import { Experience, Resume } from '@pure-and-lazy/api-interfaces';

import { getDuration, getCertificateDuration } from '../../helpers/dateHelper';
import { getRandomColor } from '../../helpers/colorHelper';

import './resume.css';

import { DB_DATE_FORMAT } from '../../constants/dateConstant';

const ResumePage = () => {
  const [resumeData, setResumeData] = useState<Resume>();
  const { _id } = useContext(UserContext);

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
            <div key={`${qual.degree}_${index}`}>
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
          <li key={index} className="resume-list-item">
            <span className="resume-list-icon">&#9679;</span>
            <span className="resume-list-content">{award}</span>
          </li>
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
            <div key={`${exp.organisation}_${exp.role}_${index}`}>
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
          <div className="mb-4" key={`${ref.name}_${index}`}>
            <h5>{ref.name}</h5>
            <h5>{ref.position}</h5>
            <p className="subcontent">{ref.organisation}</p>
            <p className="subcontent">{ref.phoneNumber}</p>
            <p className="subcontent">{ref.email}</p>
          </div>
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

  return (
    <section id="resume">
      <Container>
        <Row className="row-separator">
          <Col md={3}>{buildHeaderColumn('Education')}</Col>
          <Col md={8}>{buildEducationSection()}</Col>
        </Row>
        <Row className="row-separator">
          <Col md={3}>{buildHeaderColumn('Awards')}</Col>
          <Col md={8}>{builAwardsSection()}</Col>
        </Row>
        <Row className="row-separator">
          <Col md={3}>{buildHeaderColumn('Certificates')}</Col>
          <Col md={8}>{buildCertificatesSection()}</Col>
        </Row>
        <Row className="row-separator">
          <Col md={3}>{buildHeaderColumn('Work')}</Col>
          <Col md={8}>{buildWorkExperienceSection()}</Col>
        </Row>
        <Row className="row-separator">
          <Col md={3}>{buildHeaderColumn('Skills')}</Col>
          <Col md={8}>
            <div className="bars">
              <ul className="skill-lists">{buildSkillsSection()}</ul>
            </div>
          </Col>
        </Row>
        <Row className="row-separator">
          <Col md={3}>{buildHeaderColumn('References')}</Col>
          <Col md={8}>{buildReferencesSection()}</Col>
        </Row>
      </Container>
    </section>
  );
};

export default ResumePage;
