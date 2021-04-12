import { ResumeSectionTypes } from './resumeConstant';
import {
  Experience,
  Qualification,
  Certificate,
  Skill,
  Reference,
  Resume,
} from '@pure-and-lazy/api-interfaces';

export const defaultTypesValues: { [resumeType: string]: boolean } = {
  [ResumeSectionTypes.Education]: false,
  [ResumeSectionTypes.Awards]: false,
  [ResumeSectionTypes.Certificates]: false,
  [ResumeSectionTypes.Work]: false,
  [ResumeSectionTypes.Skills]: false,
  [ResumeSectionTypes.References]: false,
};

export const initialQualValues: Qualification = {
  institutionName: '',
  degree: '',
  description: '',
  startDate: new Date(),
  graduationDate: new Date(),
};
