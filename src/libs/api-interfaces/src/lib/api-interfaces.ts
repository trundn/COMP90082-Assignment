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

interface SingalImage {
  imageID: number;
  imageUrl: string;
}

interface Academic {
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
};
