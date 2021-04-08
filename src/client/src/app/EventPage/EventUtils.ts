import {
  PortfolioCategory,
  PortfolioItem,
} from '@pure-and-lazy/api-interfaces';

// Functions which manage API requests about Events

// getAccessTokenSilently hook must be passed in since it can't be called
// outside of a functional component

// Update the title and description of a project item with the given id

const updateEventItem = async (
  data: PortfolioItem,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }

  return fetch(`/api/portfolio/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// Delete the projectItem specified by id
const deleteEventItem = async (
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }

  return fetch(`/api/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Create new project
const addEventItem = async (
  data: PortfolioItem,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
) => {
  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }
  // 这里需要改动
  return fetch(`/api/portfolio/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

const getPortfolioItem = async (contentID: string): Promise<PortfolioItem> => {
  return fetch(`/api/portfolio/${contentID}`)
    .then((res) => res.json())
    .then((obj) => {
      obj.created = new Date(Date.parse(obj.created));
      obj.lastModified = new Date(Date.parse(obj.lastModified));
      return obj;
    });
};

const getPortfolioItems = async (
  username: string,
  category: PortfolioCategory
): Promise<Array<PortfolioItem>> => {
  // 这里有改动
  const categoryFilter = 'events';
  return fetch(
    `/api/portfolio/${username}/all?category=${categoryFilter}`
  ).then((r) => r.json());
};

// This is like calling getPortfolioItems on the logged in user except you can see private items
const getOwnPortfolioItems = async (
  category: PortfolioCategory,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAccessTokenSilently: (options?: any) => Promise<string>
): Promise<Array<PortfolioItem>> => {
  const categoryFilter =
    // 这里有改动
    category === 'events';

  let token: string;
  try {
    token = await getAccessTokenSilently();
  } catch (error) {
    return Promise.reject('Failed to get access token');
  }

  return fetch(`/api/portfolio/all?category=${categoryFilter}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json());
};

//这里需要一点改动
export {
  updateEventItem,
  deleteEventItem,
  addEventItem,
  getPortfolioItem,
  getPortfolioItems,
  getOwnPortfolioItems,
};
