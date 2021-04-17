import { UserTheme } from '@pure-and-lazy/api-interfaces';

const updateProfilePicture = async (
  profilePicture: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    profilePicture: profilePicture,
  });
};

const updateName = async (
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    name: name,
  });
};
const updateDateBirth = async (
  dateBirth: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    dateBirth: dateBirth,
  });
};

const updateDescription = async (
  description: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    description: description,
  });
};

const updateTwitter = async (
  twitterLink: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    twitterLink:twitterLink,
  });
};
const updateFacebook = async (
  facebookLink: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    facebookLink:facebookLink,
  });
};

const updateGithub = async (
  githubLink: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    githubLink:githubLink,
  });
};

const updateLinkedin = async (
  linkedinLink: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    linkedinLink:linkedinLink,
  });
};
const updateTheme = async (
  theme: UserTheme,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  return updateProfile(getAccessTokenSilently, {
    theme: theme,
  });
};

// Not Exported
const updateProfile = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>,
  newProfile // NOTE: There's no interface for this right?
) => {
  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }

  const body = {
    ...newProfile,
  };

  return fetch('/api/portfolio/profile', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export { updateProfilePicture, updateName, updateDescription, updateTheme,updateDateBirth,updateTwitter,updateFacebook, updateGithub,updateLinkedin};
