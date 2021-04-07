import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../portfolio-shared/UserContext';
import { Resume } from '@pure-and-lazy/api-interfaces';

import './grid.css';
import './resume.css';

const ResumePage = () => {
  const [resumeData, setResumeData] = useState<Resume>();
  const { _id } = useContext(UserContext);

  useEffect(() => {
    fetchResumeData();
  });

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
            <div className="twelve columns">
              {resumeData &&
                resumeData.qualifications.map((qual) => {
                  return (
                    <div key={qual.institutionName}>
                      <h3>{qual.institutionName}</h3>
                      <p className="info">
                        {qual.degree} <span>&bull;</span>
                        <em className="date">{qual.graduationDate}</em>
                      </p>
                      <p>{qual.description}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumePage;
