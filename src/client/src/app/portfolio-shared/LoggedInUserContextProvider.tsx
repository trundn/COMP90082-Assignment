import React, { useState, useCallback, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { useAuth0 } from '@auth0/auth0-react';

interface LoggedInUserContextProvider {
  children: React.ReactNode;
}

const LoggedInUserContextProvider = (props: LoggedInUserContextProvider) => {
  const [user, setUser] = useState(useContext(UserContext));

  const setProfilePicture = (profilePicture: string) => {
    setUser((prevState) => {
      return { ...prevState, profilePicture: profilePicture };
    });
  };

  const setDescription = (description: string) => {
    setUser((prevState) => {
      return { ...prevState, description: description };
    });
  };

  const setName = (name: string) => {
    setUser((prevState) => {
      return { ...prevState, name: name };
    });
  };
  const setDate= (dateBirth: string) => {
    setUser((prevState) => {
      return { ...prevState, dateBirth: dateBirth };
    });
  };

  const setTwitterLink= (twitterLink: string) => {
    setUser((prevState) => {
      return { ...prevState, twitterLink: twitterLink };
    });
  };
  const setFacebookLink= (facebookLink: string) => {
    setUser((prevState) => {
      return { ...prevState, facebookLink: facebookLink };
    });
  };
  const setGithubLink= (githubLink: string) => {
    setUser((prevState) => {
      return { ...prevState, githubLink: githubLink };
    });
  };
  const setLinkedinLink= (LinkedinLink: string) => {
    setUser((prevState) => {
      return { ...prevState, LinkedinLink: LinkedinLink };
    });
  };
  const contextState = { ...user, setProfilePicture, setDescription, setName,setDate,setTwitterLink,setGithubLink,setLinkedinLink,setFacebookLink};

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const findUser = useCallback(async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/portfolio/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const js = await response.json();
      setUser(js);
    }
  }, [setUser, getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    findUser();
  }, [findUser]);

  return (
    <UserContext.Provider value={contextState}>
      {props.children}
    </UserContext.Provider>
  );
};

export { LoggedInUserContextProvider };
