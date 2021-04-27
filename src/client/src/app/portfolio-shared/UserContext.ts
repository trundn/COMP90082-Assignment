import React from 'react';
import { UserTheme } from '@pure-and-lazy/api-interfaces';
//LoggedInUserContextProvider 负责在登录后更新这里面的内容
const UserContext = React.createContext({
  _id: '',
  username: '',
  email: '',
  name: '',
  dateJoined: undefined,
  profilePicture: '',
  description: '',
  dateBirth: '',
  twitterLink: '',
  facebookLink: '',
  githubLink: '',
  linkedinLink: '',
  setProfilePicture: (profilePicture) => null,
  setDescription: (description) => null,
  setName: (name) => null,
  setDate: (dateBirth) => null,
  setTwitterLink: (twitterLink) => null,
  setFacebookLink: (facebookLink) => null,
  setGithubLink: (githubLink) => null,
  setLinkedinLink: (linkedinLink) => null,
  theme: UserTheme.DEFAULT,

  settwitterLink: (twitterLink) => null,
  setfacebookLink: (facebookLink) => null,
  setgithubLink: (githubLink) => null,
  setlinkedinLink: (linkedinLink) => null,
});
export { UserContext };
