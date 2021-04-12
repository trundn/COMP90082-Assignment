interface Message {
  message: string;
}

enum PortfolioCategory {
  PROJECTS = 'projects',
  BLOG = 'blog',
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

interface Qualification {
  uuid?: string;
  institutionName: string;
  degree: string;
  description: string;
  startDate: Date;
  graduationDate?: Date;
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
}

interface Skill extends Namable {
  uuid?: string;
  level: string;
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
  awards?: string[];
  experiences?: Experience[];
  skills?: Skill[];
  references?: Reference[];
}

export {
  Message,
  PortfolioItem,
  PortfolioItemValue,
  PortfolioCategory,
  UserProfile,
  UserTheme,
  Resume,
  Qualification,
  Experience,
  Certificate,
  Skill,
  Reference,
};
