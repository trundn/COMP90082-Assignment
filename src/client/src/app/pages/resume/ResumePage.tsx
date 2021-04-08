import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';

import { UserContext } from '../../portfolio-shared/UserContext';
import { Experience, Resume } from '@pure-and-lazy/api-interfaces';

import { getDuration } from '../../helpers/dateHelper';
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
            <div key={index}>
              <h3>{qual.institutionName}</h3>
              <p className="info">
                {qual.degree} <span>&bull;</span>
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
          <li key={index} className="responsibility-list-item">
            <span className="responsibility-icon">&#9679;</span>
            <span className="responsibility-content">{resp}</span>
          </li>
        );
      });

    return resEls;
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
            <div key={index}>
              <h3>{exp.organisation}</h3>
              <p className="info">
                {exp.role} <span>&bull;</span>
                {`${exp.city}, ${exp.country}`} <span>&bull;</span>
                <em className="date">
                  {getDuration(exp.startDate, exp.endDate)}
                </em>
                <p>{exp.workSummary}</p>
                <ul className="job-listing-ul">
                  {buildWorkResponsibilitiesContent(exp)}
                </ul>
              </p>
            </div>
          );
        });
    }

    return expEls;
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
    </section>
  );
};

export default ResumePage;
