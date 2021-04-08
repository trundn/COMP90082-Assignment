import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';

import { UserContext } from '../../portfolio-shared/UserContext';
import { Resume } from '@pure-and-lazy/api-interfaces';

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
    </section>
  );
};

export default ResumePage;
