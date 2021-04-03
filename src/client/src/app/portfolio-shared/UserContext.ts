import React from 'react';
import { UserTheme } from '@pure-and-lazy/api-interfaces';
//LoggedInUserContextProvider 负责在登录后更新这里面的内容
const UserContext = React.createContext({
  username: '',
  email: '',
  name: '',
  dateJoined: undefined,
  profilePicture: '',
  description: '',
  setProfilePicture: (profilePicture) => null,
  setDescription: (description) => null,
  setName: (name) => null,
  theme: UserTheme.DEFAULT,
});
export { UserContext };
