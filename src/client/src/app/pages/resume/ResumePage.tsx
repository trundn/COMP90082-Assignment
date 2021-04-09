import React, { useState, useEffect, useContext } from 'react';
import Badge from 'react-bootstrap/Badge';

import axios from 'axios';
import moment from 'moment';

import { UserContext } from '../../portfolio-shared/UserContext';
import { Experience, Resume } from '@pure-and-lazy/api-interfaces';

import { getDuration } from '../../helpers/dateHelper';
import { getRandomColor } from '../../helpers/colorHelper';
import { DB_DATE_FORMAT } from '../../constants/dateConstant';

import './grid.css';
import './resume.css';

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
          <div key={`${ref.name}_${index}`}>
            <h5>{ref.name}</h5>
            <h5>{ref.position}</h5>
            <p className="subcontent">{ref.organisation}</p>
            <p className="subcontent">{ref.email}</p>
          </div>
        );
      });
    }

    return refEls;
  };

  return (
    <section id="resume">
      <div className="row education">
        <div className="three columns header-col">
          <h1>
            <span>Education</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">{buildEducationSection()}</div>
          </div>
        </div>
      </div>

      <div className="row awards">
        <div className="three columns header-col">
          <h1>
            <span>Awards</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">
              <ul className="resume-list-no-padding">{builAwardsSection()}</ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          {buildWorkExperienceSection()}
        </div>
      </div>

      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="bars">
            <ul className="skills">{buildSkillsSection()}</ul>
          </div>
        </div>
      </div>

      <div className="row references">
        <div className="three columns header-col">
          <h1>
            <span>References</span>
          </h1>
        </div>

        <div className="nine columns main-col">{buildReferencesSection()}</div>
      </div>
    </section>
  );
};

export default ResumePage;
