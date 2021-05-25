interface Message {
  message: string;
}

enum PortfolioCategory {
  PROJECTS = 'projects',
  BLOG = 'blog',
  FUNFACT = 'funfact',
}

interface PortfolioItem {
  _id?: string;
  category: PortfolioCategory;
  name: string;
  description: string;
  content?: string;
  created?: Date;
  lastModified?: Date;
  image?: string;
  public?: boolean;
}

type PortfolioItemValue = PortfolioItem[keyof PortfolioItem];

interface UserProfile {
  _id?: string;
  username: string;
  email: string;
  name?: string;
  dateJoined: Date;
  description?: string;
  profilePicture?: string;
  theme?: UserTheme;
  themeDark?: boolean;
  dateBirth?: string;

  twitterLink?: string;
  facebookLink?: string;
  githubLink?: string;
  linkedinLink?: string;
}

enum UserTheme {
  DEFAULT,
  SILVA,
  BEAN,
  JILDEN,
}

interface Namable {
  name: string;
}

interface SingalImage {
  uuid?: string;
  imageUrl: string;
}

interface Academic {
  uuid?: string;
  title: string;
  author: string;
  organization: string;
  createDate: Date;
  shortDescription: string;
  bodyParagraph: string;
  academicReferences: string;
  academicImage: string;
}

interface AcademicModels {
  _id?: string;
  images?: SingalImage[];
  academics?: Academic[];
}

interface Qualification {
  uuid?: string;
  institutionName: string;
  degree: string;
  description: string;
  startDate: Date;
  graduationDate?: Date;
  certificateFileName?: string;
  transcriptFileName?: string;
  certificateUrl?: string;
  transcriptUrl?: string;
}

interface Award extends Namable {
  uuid?: string;
}

interface Responsibility extends Namable {
  uuid?: string;
}

interface Certificate extends Namable {
  uuid?: string;
  issueOrganization: string;
  credentialId?: string;
  issuedDate: Date;
  expiryDate?: Date;
}

interface Experience {
  uuid?: string;
  organisation: string;
  city: string;
  country: string;
  workSummary: string;
  startDate: Date;
  endDate?: Date;
  role: string;
  responsibilities?: string[];
  responsibilitiesContent?: string;
}

interface Skill extends Namable {
  uuid?: string;
  level: number;
  yearOfExperiences: number;
}

interface Reference extends Namable {
  uuid?: string;
  position: string;
  organisation: string;
  phoneNumber?: string;
  email: string;
}

interface Resume {
  _id?: string;
  qualifications?: Qualification[];
  certificates?: Certificate[];
  awards?: Award[];
  experiences?: Experience[];
  skills?: Skill[];
  references?: Reference[];
}
// Funfact Model
interface Funfact {
  uuid?: string;
  factName?: string;
  factDetail?: string;
}

interface Funfacts {
  user: string;
  funfacts?: Funfact[];
}


// Event Model
interface Event {
  uuid?: string;
  eventName: string;
  eventHoster?: string;
  eventLocation?: string;
  startDate?: Date;
  endDate?: Date;
  // eventDescription?: string;
}

interface Events {
  user: string;
  events?: Event[];
}

export {
  Message,
  PortfolioItem,
  PortfolioItemValue,
  PortfolioCategory,
  UserProfile,
  UserTheme,
  SingalImage,
  Academic,
  AcademicModels,
  Resume,
  Qualification,
  Award,
  Responsibility,
  Experience,
  Certificate,
  Skill,
  Reference,
  // For funfact modal
  Funfact,
  Funfacts,
  // For event modal
  Event,
  Events,
};
