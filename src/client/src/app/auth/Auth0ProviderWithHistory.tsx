// References:
// https://www.youtube.com/watch?v=1rgeO_EbSGg&list=PLZ14qQz3cfJL6aoKZ_Ly7jiYrwi9ihviW
// https://auth0.com/blog/complete-guide-to-react-user-authentication/

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

// Note: Auth0ProviderWithHistory needs to be a child of BrowserRouter
const Auth0ProviderWithHistory = ({ children }) => {
  const auth0Domain = 'comp90082ug.au.auth0.com';
  const auth0ClientId = 'dbhzQcoJAQVUWQDWl0eHIsx0XKgC9ymS';
  const auth0ApiIdentifier = 'https://comp90082ug.au.auth0.com/api/v2/';
  // The above strings are safe to share publicly

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  // Documentation: https://auth0.github.io/auth0-react/interfaces/auth0provideroptions.html
  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={auth0ApiIdentifier}
      useRefreshTokens
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
