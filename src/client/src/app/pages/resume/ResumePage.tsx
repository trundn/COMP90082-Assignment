
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext, Fragment,useRef } from 'react';
import Badge from 'react-bootstrap/Badge';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Button, Alert } from 'react-bootstrap';

import axios from 'axios';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faEdit,
  faTrashAlt,
  faFile,
} from '@fortawesome/free-solid-svg-icons';

import Confirmation from '../../components/ui/modals/Confirmation';
import QualificationModal from '../../components/resume/modals/QualificationModal';
import AwardModal from '../../components/resume/modals/AwardModal';
import CertificateModal from '../../components/resume/modals/CertificateModal';
import ExperienceModal from '../../components/resume/modals/ExperienceModal';
import SkillModal from '../../components/resume/modals/SkillModal';
import ReferenceModal from '../../components/resume/modals/ReferenceModal';

import { UserContext } from '../../portfolio-shared/UserContext';
import { EditContext } from '../../portfolio-shared/EditContext';
import {
  Experience,
  Qualification,
  Award,
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
import {
  defaultTypesValues,
  initialQualValues,
  initialAwardValues,
  initialCertificateValues,
  initialExpValues,
  initialSkillValues,
  initialRefValues,
} from '../../constants/resumeInitValues';

import{useReactToPrint } from 'react-to-print';

const ResumePage = () => {
  const [alertMessage, setAlertMessage] = useState('');

  const [selectedAward, setSelectedAward] = useState<Award>(initialAwardValues);
  const [selectedQualification, setSelectedQualification] = useState<
    Qualification
  >(initialQualValues);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate>(
    initialCertificateValues
  );
  const [selectedExperience, setSelectedExperience] = useState<Experience>(
    initialExpValues
  );
  const [selectedSkill, setSelectedSkill] = useState<Skill>(initialSkillValues);
  const [selectedReference, setSelectedReference] = useState<Reference>(
    initialRefValues
  );
  const [resumeData, setResumeData] = useState<Resume>();

  const [modalShows, setModalShows] = useState<{
    [resumeType: string]: boolean;
  }>(defaultTypesValues);
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);
  const [deleteTargetKinds, setDeleteTargetKinds] = useState<{
    [resumeType: string]: boolean;
  }>(defaultTypesValues);

  const editMode = useContext(EditContext);
  const { _id } = useContext(UserContext);

  const { getAccessTokenSilently } = useAuth0();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (_id) {
      fetchResumeData();
    }
  }, [_id]);

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
      await axios({
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

  const updateQualification = async (newQualification: Qualification) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'PUT',
        url: `/api/resume/qualifications/update`,
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
          qualifications: prevState.qualifications.map<Qualification>(
            (qual) => {
              return qual.uuid === newQualification.uuid
                ? newQualification
                : qual;
            }
          ),
        };
      });
    } catch (error) {
      console.log('Failed to update qualification', error);
    }
  };

  const deleteQualification = async (newQualification: Qualification) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'DELETE',
        url: `/api/resume/qualifications/delete`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          qualification_uuid: newQualification.uuid,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          qualifications: prevState.qualifications.filter<Qualification>(
            (qual): qual is Qualification => qual.uuid !== newQualification.uuid
          ),
        };
      });
    } catch (error) {
      console.log('Failed to delete qualification', error);
    }
  };

  const addAward = async (newAward: Award) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'PUT',
        url: `/api/resume/awards/add`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_award: newAward,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          awards: [newAward, ...prevState.awards],
        };
      });
    } catch (error) {
      console.log('Failed to add award', error);
    }
  };

  const updateAward = async (newAward: Award) => {
    try {
      const token = await getAccessTokenSilently();

      const result = await axios({
        method: 'PUT',
        url: `/api/resume/awards/update`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_award: newAward,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          awards: prevState.awards.map<Award>((award) => {
            return award.uuid === newAward.uuid ? newAward : award;
          }),
        };
      });
    } catch (error) {
      console.log('Failed to update award', error);
    }
  };

  const deleteAward = async (newAward: Award) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'DELETE',
        url: `/api/resume/awards/delete`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          award_uuid: newAward.uuid,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          awards: prevState.awards.filter<Award>(
            (award): award is Award => award.uuid !== newAward.uuid
          ),
        };
      });
    } catch (error) {
      console.log('Failed to delete award', error);
    }
  };

  const addCertificate = async (newCertificate: Certificate) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'PUT',
        url: `/api/resume/certificates/add`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_certificate: newCertificate,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          certificates: [newCertificate, ...prevState.certificates],
        };
      });
    } catch (error) {
      console.log('Failed to add certificate', error);
    }
  };

  const updateCertificate = async (newCertificate: Certificate) => {
    try {
      const token = await getAccessTokenSilently();

      const result = await axios({
        method: 'PUT',
        url: `/api/resume/certificates/update`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_certificate: newCertificate,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          certificates: prevState.certificates.map<Certificate>(
            (certificate) => {
              return certificate.uuid === newCertificate.uuid
                ? newCertificate
                : certificate;
            }
          ),
        };
      });
    } catch (error) {
      console.log('Failed to update certificate', error);
    }
  };

  const deleteCertificate = async (newCertificate: Certificate) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'DELETE',
        url: `/api/resume/certificates/delete`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          certificate_uuid: newCertificate.uuid,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          certificates: prevState.certificates.filter<Certificate>(
            (certificate): certificate is Certificate =>
              certificate.uuid !== newCertificate.uuid
          ),
        };
      });
    } catch (error) {
      console.log('Failed to delete certificate', error);
    }
  };

  const addExperience = async (newExperience: Experience) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'PUT',
        url: `/api/resume/experiences/add`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_experience: newExperience,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          experiences: [newExperience, ...prevState.experiences],
        };
      });
    } catch (error) {
      console.log('Failed to add experience', error);
    }
  };

  const updateExperience = async (newExperience: Experience) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'PUT',
        url: `/api/resume/experiences/update`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_experience: newExperience,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          experiences: prevState.experiences.map<Experience>((exp) => {
            return exp.uuid === newExperience.uuid ? newExperience : exp;
          }),
        };
      });
    } catch (error) {
      console.log('Failed to update experience', error);
    }
  };

  const deleteExperience = async (newExperience: Experience) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'DELETE',
        url: `/api/resume/experiences/delete`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          experience_uuid: newExperience.uuid,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          experiences: prevState.experiences.filter<Experience>(
            (exp): exp is Experience => exp.uuid !== newExperience.uuid
          ),
        };
      });
    } catch (error) {
      console.log('Failed to delete experience', error);
    }
  };

  const addSkill = async (newSkill: Skill) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'PUT',
        url: `/api/resume/skills/add`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_skill: newSkill,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          skills: [newSkill, ...prevState.skills],
        };
      });
    } catch (error) {
      console.log('Failed to add skill', error);
    }
  };

  const updateSkill = async (newSkill: Skill) => {
    try {
      const token = await getAccessTokenSilently();

      const result = await axios({
        method: 'PUT',
        url: `/api/resume/skills/update`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_skill: newSkill,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          skills: prevState.skills.map<Skill>((skill) => {
            return skill.uuid === newSkill.uuid ? newSkill : skill;
          }),
        };
      });
    } catch (error) {
      console.log('Failed to update skill', error);
    }
  };

  const deleteSkill = async (newSkill: Skill) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'DELETE',
        url: `/api/resume/skills/delete`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          skill_uuid: newSkill.uuid,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          skills: prevState.skills.filter<Skill>(
            (skill): skill is Skill => skill.uuid !== newSkill.uuid
          ),
        };
      });
    } catch (error) {
      console.log('Failed to delete skill', error);
    }
  };

  const addReference = async (newRef: Reference) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'PUT',
        url: `/api/resume/references/add`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_reference: newRef,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          references: [newRef, ...prevState.references],
        };
      });
    } catch (error) {
      console.log('Failed to add reference', error);
    }
  };

  const updateReference = async (newRef: Reference) => {
    try {
      const token = await getAccessTokenSilently();

      const result = await axios({
        method: 'PUT',
        url: `/api/resume/references/update`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          new_reference: newRef,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          references: prevState.references.map<Reference>((ref) => {
            return ref.uuid === newRef.uuid ? newRef : ref;
          }),
        };
      });
    } catch (error) {
      console.log('Failed to update reference', error);
    }
  };

  const deleteReference = async (newRef: Reference) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'DELETE',
        url: `/api/resume/references/delete`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          resume_id: resumeData._id,
          reference_uuid: newRef.uuid,
        },
      });

      setResumeData((prevState) => {
        return {
          ...prevState,
          references: prevState.references.filter<Reference>(
            (ref): ref is Reference => ref.uuid !== newRef.uuid
          ),
        };
      });
    } catch (error) {
      console.log('Failed to delete reference', error);
    }
  };

  const updateModalShowStatus = (resumeType: string, status: boolean): void => {
    setModalShows((prevState) => {
      return { ...prevState, [resumeType]: status };
    });
  };

  const cloneQualification = (
    oriQual: Qualification,
    isDisableEndDate: boolean
  ): Qualification => {
    const newQualification = { ...oriQual };
    if (isDisableEndDate) {
      newQualification.graduationDate = undefined;
    }
    return newQualification;
  };

  const cloneCertificate = (
    oriCert: Certificate,
    isDisableExpiryDate: boolean
  ): Certificate => {
    const newCert = { ...oriCert };
    if (isDisableExpiryDate) {
      newCert.expiryDate = undefined;
    }
    return newCert;
  };

  const cloneExperience = (
    oriExp: Experience,
    isDisableExpiryDate: boolean
  ): Experience => {
    const newExp = { ...oriExp };

    if (isDisableExpiryDate) {
      newExp.endDate = undefined;
    }

    if (
      newExp.responsibilitiesContent &&
      newExp.responsibilitiesContent?.length > 0
    ) {
      newExp.responsibilities = newExp.responsibilitiesContent.split('\n');
    }
    newExp.responsibilitiesContent = undefined;

    return newExp;
  };

  const handleEduModalSubmitClick = (
    values: Qualification,
    isDisableEndDate: boolean,
    isAddMoreAction: boolean
  ) => {
    updateModalShowStatus(ResumeSectionTypes.Education, false);
    if (isAddMoreAction) {
      const foundQual = resumeData.qualifications.find(
        (item) =>
          item.institutionName.toLowerCase() ===
            values.institutionName.toLowerCase() &&
          item.degree.toLowerCase() === values.degree.toLowerCase()
      );

      if (foundQual) {
        showAlertMessage(
          'The degree in the same institution was already added.'
        );
      } else {
        const newQualification = cloneQualification(values, isDisableEndDate);
        newQualification.uuid = uuidv4();
        addQualification(newQualification);
      }
    } else {
      const newQualification = cloneQualification(values, isDisableEndDate);
      updateQualification(newQualification);
    }
  };

  const handleEduModalCloseClick = () => {
    updateModalShowStatus(ResumeSectionTypes.Education, false);
  };

  const handleAwardModalSubmitClick = (
    values: Award,
    isAddMoreAction: boolean
  ) => {
    updateModalShowStatus(ResumeSectionTypes.Awards, false);
    if (isAddMoreAction) {
      const foundAward = resumeData.awards.find(
        (item) => item.name.toLowerCase() === values.name.toLowerCase()
      );

      if (foundAward) {
        showAlertMessage('The same award was already added.');
      } else {
        const newAward = { ...values };
        newAward.uuid = uuidv4();
        addAward(newAward);
      }
    } else {
      const newAward = { ...values };
      updateAward(newAward);
    }
  };

  const handleAwardModalCloseClick = () => {
    updateModalShowStatus(ResumeSectionTypes.Awards, false);
  };

  const handleCertModalSubmitClick = (
    values: Certificate,
    isDisableExpiryDate: boolean,
    isAddMoreAction: boolean
  ) => {
    updateModalShowStatus(ResumeSectionTypes.Certificates, false);
    if (isAddMoreAction) {
      const foundCert = resumeData.certificates.find(
        (item) =>
          item.name.toLowerCase() === values.name.toLowerCase() &&
          item.issueOrganization.toLowerCase() ===
            values.issueOrganization.toLowerCase()
      );

      if (foundCert) {
        showAlertMessage(
          'The certificate in the same issue organization was already added.'
        );
      } else {
        const newCert = cloneCertificate(values, isDisableExpiryDate);
        newCert.uuid = uuidv4();
        addCertificate(newCert);
      }
    } else {
      const newCert = cloneCertificate(values, isDisableExpiryDate);
      updateCertificate(newCert);
    }
  };

  const handleCertModalCloseClick = () => {
    updateModalShowStatus(ResumeSectionTypes.Certificates, false);
  };

  const handleExpModalSubmitClick = (
    values: Experience,
    isDisableEndDate: boolean,
    isAddMoreAction: boolean
  ) => {
    updateModalShowStatus(ResumeSectionTypes.Work, false);
    if (isAddMoreAction) {
      const newExp = cloneExperience(values, isDisableEndDate);
      newExp.uuid = uuidv4();
      addExperience(newExp);
    } else {
      const newExp = cloneExperience(values, isDisableEndDate);
      updateExperience(newExp);
    }
  };

  const handleExpModalCloseClick = () => {
    updateModalShowStatus(ResumeSectionTypes.Work, false);
  };
  const buttonToPdf = (editMode : boolean) : JSX.Element => {
    if (!editMode){
      return (<>
        <button onClick={handlePrint}>Export page to pdf!</button>
      </>)
    }else{
      return null;
    }
  }

  const handleSkillModalSubmitClick = (
    values: Skill,
    isAddMoreAction: boolean
  ) => {
    updateModalShowStatus(ResumeSectionTypes.Skills, false);
    if (isAddMoreAction) {
      const foundRef = resumeData.references.find(
        (item) => item.name.toLowerCase() === values.name.toLowerCase()
      );

      if (foundRef) {
        showAlertMessage(
          'The same programming language name was already added.'
        );
      } else {
        const newSkill = { ...values };
        newSkill.uuid = uuidv4();
        addSkill(newSkill);
      }
    } else {
      const newSkill = { ...values };
      updateSkill(newSkill);
    }
  };

  const handleSkillModalCloseClick = () => {
    updateModalShowStatus(ResumeSectionTypes.Skills, false);
  };

  const handleRefModalSubmitClick = (
    values: Reference,
    isAddMoreAction: boolean
  ) => {
    updateModalShowStatus(ResumeSectionTypes.References, false);
    if (isAddMoreAction) {
      const foundRef = resumeData.references.find(
        (item) =>
          item.name.toLowerCase() === values.name.toLowerCase() &&
          item.organisation.toLowerCase() === values.organisation.toLowerCase()
      );

      if (foundRef) {
        showAlertMessage(
          'The reference name in the same organization was already added.'
        );
      } else {
        const newRef = { ...values };
        newRef.uuid = uuidv4();
        addReference(newRef);
      }
    } else {
      const newRef = { ...values };
      updateReference(newRef);
    }
  };

  const handleRefModalCloseClick = () => {
    updateModalShowStatus(ResumeSectionTypes.References, false);
  };

  const handleConfirmDelete = (value: boolean) => {
    if (value) {
      if (deleteTargetKinds[ResumeSectionTypes.Education]) {
        deleteQualification(selectedQualification);
        setSelectedQualification(null);
        setDeleteTargetKinds((prevState) => {
          return { ...prevState, [ResumeSectionTypes.Education]: false };
        });
      } else if (deleteTargetKinds[ResumeSectionTypes.Awards]) {
        deleteAward(selectedAward);
        setSelectedAward(null);
        setDeleteTargetKinds((prevState) => {
          return { ...prevState, [ResumeSectionTypes.Awards]: false };
        });
      } else if (deleteTargetKinds[ResumeSectionTypes.Certificates]) {
        deleteCertificate(selectedCertificate);
        setSelectedCertificate(null);
        setDeleteTargetKinds((prevState) => {
          return { ...prevState, [ResumeSectionTypes.Certificates]: false };
        });
      } else if (deleteTargetKinds[ResumeSectionTypes.Work]) {
        deleteExperience(selectedExperience);
        setSelectedExperience(null);
        setDeleteTargetKinds((prevState) => {
          return { ...prevState, [ResumeSectionTypes.Work]: false };
        });
      } else if (deleteTargetKinds[ResumeSectionTypes.Skills]) {
        deleteSkill(selectedSkill);
        setSelectedSkill(null);
        setDeleteTargetKinds((prevState) => {
          return { ...prevState, [ResumeSectionTypes.Skills]: false };
        });
      } else if (deleteTargetKinds[ResumeSectionTypes.References]) {
        deleteReference(selectedReference);
        setSelectedReference(null);
        setDeleteTargetKinds((prevState) => {
          return { ...prevState, [ResumeSectionTypes.References]: false };
        });
      }
    }
    setDeleteConfirmationShow(false);
  };

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    window.setTimeout(() => {
      setAlertMessage('');
    }, 2000);
  };

  const updateSelectedResumePart = (targetKind: string, targetVal: any) => {
    if (targetKind === ResumeSectionTypes.Awards) {
      setSelectedAward(targetVal);
    }
    if (targetKind === ResumeSectionTypes.Education) {
      setSelectedQualification(targetVal);
    }
    if (targetKind === ResumeSectionTypes.Certificates) {
      setSelectedCertificate(targetVal);
    }
    if (targetKind === ResumeSectionTypes.Work) {
      if (targetVal?.responsibilities) {
        targetVal.responsibilitiesContent = targetVal.responsibilities
          .map((resp) => resp)
          .join('\n');
      }
      setSelectedExperience(targetVal);
    }
    if (targetKind === ResumeSectionTypes.Skills) {
      setSelectedSkill(targetVal);
    }
    if (targetKind === ResumeSectionTypes.References) {
      setSelectedReference(targetVal);
    }
  };

  const handleEditAction = (
    targetVal: any,
    targetKind: string,
    status: boolean
  ): void => {
    updateSelectedResumePart(targetKind, targetVal);
    updateModalShowStatus(targetKind, status);
  };

  const handleDeleteAction = (
    targetVal: any,
    targetKind: string,
    status: boolean
  ): void => {
    updateSelectedResumePart(targetKind, targetVal);
    setDeleteConfirmationShow(true);
    setDeleteTargetKinds((prevState) => {
      return { ...prevState, [targetKind]: status };
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
    targetKind: ResumeSectionTypes
  ): JSX.Element => {
    return buildEditableButtons(
      () => handleEditAction(targetVal, targetKind, true),
      () => handleDeleteAction(targetVal, targetKind, true)
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
                <div
                  key={`${qual.institutionName}_${qual.degree}_${index}`}
                  className="mb-4"
                >
                  <h3>{qual.institutionName}</h3>
                  <p className="info">
                    {qual.degree}
                    <span>&bull;</span>
                    <em className="date-time">
                      {getDuration(qual.startDate, qual.graduationDate)}
                    </em>
                    <div>
                      {qual.certificateUrl || qual.transcriptUrl ? (
                        <Fragment>
                          <FontAwesomeIcon
                            icon={faFile}
                            size="sm"
                            color="#999999"
                          />
                          &nbsp;
                        </Fragment>
                      ) : (
                        ''
                      )}

                      {qual.certificateUrl ? (
                        <Link
                          to={{
                            pathname: qual.certificateUrl,
                          }}
                          target="_blank"
                          className="uploaded-cert-files"
                        >
                          Certificate
                        </Link>
                      ) : (
                        ''
                      )}

                      {qual.certificateUrl && qual.transcriptUrl ? ' | ' : ''}

                      {qual.transcriptUrl ? (
                        <Link
                          to={{
                            pathname: qual.transcriptUrl,
                          }}
                          target="_blank"
                          className="uploaded-cert-files"
                        >
                          Transcript
                        </Link>
                      ) : (
                        ''
                      )}
                    </div>
                  </p>

                  <p>{qual.description}</p>
                </div>
              </Col>
              {bindEditableButtons(qual, ResumeSectionTypes.Education)}
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
          <li key={`resp${index}`} className="resume-list-item">
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
              <li key={`award_${index}`} className="resume-list-item">
                <span className="resume-list-icon">&#9679;</span>
                <span className="resume-list-content">{award.name}</span>
              </li>
            </Col>
            {bindEditableButtons(award, ResumeSectionTypes.Awards)}
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
                    <em className="date-time">
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
              {bindEditableButtons(exp, ResumeSectionTypes.Work)}
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
        const width = `${skill.level}%`;

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
            {bindEditableButtons(skill, ResumeSectionTypes.Skills)}
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
            {bindEditableButtons(ref, ResumeSectionTypes.References)}
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
            {bindEditableButtons(cer, ResumeSectionTypes.Certificates)}
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
                  setSelectedQualification(initialQualValues);
                  setSelectedAward(initialAwardValues);
                  setSelectedCertificate(initialCertificateValues);
                  setSelectedExperience(initialExpValues);
                  setSelectedSkill(initialSkillValues);
                  setSelectedReference(initialRefValues);
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
    <Fragment >
      {alertMessage && (
        <Alert variant="danger" dismissible>
          {alertMessage}
        </Alert>
      )}
      <section id="resume" ref={componentRef}>
        <QualificationModal
          selectedQual={selectedQualification}
          show={modalShows[ResumeSectionTypes.Education]}
          onSubmit={handleEduModalSubmitClick}
          onClose={handleEduModalCloseClick}
        />
        <AwardModal
          selectedAward={selectedAward}
          show={modalShows[ResumeSectionTypes.Awards]}
          onSubmit={handleAwardModalSubmitClick}
          onClose={handleAwardModalCloseClick}
        />
        <CertificateModal
          selectedCert={selectedCertificate}
          show={modalShows[ResumeSectionTypes.Certificates]}
          onSubmit={handleCertModalSubmitClick}
          onClose={handleCertModalCloseClick}
        />
        <ExperienceModal
          selectedExp={selectedExperience}
          show={modalShows[ResumeSectionTypes.Work]}
          onSubmit={handleExpModalSubmitClick}
          onClose={handleExpModalCloseClick}
        />
        <SkillModal
          selectedSkill={selectedSkill}
          show={modalShows[ResumeSectionTypes.Skills]}
          onSubmit={handleSkillModalSubmitClick}
          onClose={handleSkillModalCloseClick}
        />
        <ReferenceModal
          selectedRef={selectedReference}
          show={modalShows[ResumeSectionTypes.References]}
          onSubmit={handleRefModalSubmitClick}
          onClose={handleRefModalCloseClick}
        />
        <Confirmation
          show={deleteConfirmationShow}
          onConfirm={handleConfirmDelete}
          title="Delete"
          confirmation="Are you sure you want to delete this?"
          okText="Confirm Delete"
          cancelText="Cancel"
          okButtonStyle="danger"
          cancelButtonStyle="secondary"
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
      <Container>
          {
            buttonToPdf(editMode)
          }
        </Container>

    </Fragment>
  );
};

export default ResumePage;
