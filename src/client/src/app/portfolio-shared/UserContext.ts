import React from 'react';
import { UserTheme } from '@pure-and-lazy/api-interfaces';
const UserContext = React.createContext({
  username: '',
  email: '',
  name: '',
  dateJoined: undefined,
  profilePicture: '',
  description: '',
  dateBirth:'',
  twitterLink:'',
  facebookLink:'',
  githubLink:'',
  linkedinLink:'',
  setProfilePicture: (profilePicture) => null,
  setDescription: (description) => null,
  setName: (name) => null,
  setDate:(dateBirth)=>null,
  setTwitterLink: (twitterLink) => null,
  setFacebookLink: (facebookLink) => null,
  setGithubLink: (githubLink) => null,
  setLinkedinLink: (linkedinLink) => null,
  theme: UserTheme.DEFAULT,

  
  
});
export { UserContext };
