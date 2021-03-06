import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { BlogPage } from '../blog/BlogPage';
import { NotFound } from '../NotFound';
import { About } from './about/About';
import { PortfolioHome } from './PortfolioHome';
import { PortfolioNavBar } from './PortfolioNavBar';
import ResumePage from '../pages/resume/ResumePage';
import { ProjectPage } from './ProjectPage';
import { FooterWrapper } from '../layout/FooterWrapper';
import { PortfolioViewFooter } from './PortfolioViewFooter';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from './UserContext';
import { Container } from 'react-bootstrap';
import { ContentPage } from '../content/ContentPage';
import { AcademicPage } from '../pages/academic/AcademicPage';
import { EventPage } from '../pages/eventPage/EventPage';
import{FunfactPage} from '../pages/funfactPage/FunfactPage';
import {EventContentPage} from '../content/EventContentPage';
import {ManagePage}from '../admin/ManagePage';
const PortfolioIndex = () => {
  const [redirect, setRedirect] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(useContext(UserContext));
  const { path } = useRouteMatch();
  const { id: pageUsername } = useParams();
  const { isAuthenticated } = useAuth0();
  const { username: authUsername } = useContext(UserContext);

  const footer: React.ReactNode = <PortfolioViewFooter />;

  const findUser = useCallback(() => {
    fetch(`/api/portfolio/${pageUsername}/profile`)
      .then((r) => {
        // User not found, we should redirect
        if (r.status !== 200) {
          setRedirect(true);
        }
        return r.json();
      })
      .then((r) => {
        setUser(r);
        setLoaded(true);
      });
  }, [setRedirect, setUser, setLoaded, pageUsername]);

  useEffect(() => {
    findUser();
  }, [findUser]);

  if (redirect) {
    return <Route component={NotFound} />;
  } else if (!loaded) {
    return null;
  }

  return (
    <UserContext.Provider value={user}>
      <Container className="d-flex flex-column min-vh-100 p-0" fluid>
        <PortfolioNavBar />
        <Switch>
          <Route exact path={`${path}`}>
            <PortfolioHome />
          </Route>
          <Route exact path={`${path}/resume`}>
            <ResumePage />
          </Route>
          {/* Event Page */}
          <Route exact path={`${path}/events`}>
            <EventPage />
          </Route>
          {/* Event Page Content */}
          <Route exact path={`${path}/events/:contentID`}>
            <EventContentPage />
          </Route>
          <Route exact path={`${path}/projects`}>
            <ProjectPage />
          </Route>
          <Route exact path={`${path}/blog`}>
            <BlogPage />
          </Route>
          <Route exact path={`${path}/projects/:contentID`}>
            <ContentPage />
          </Route>
          <Route exact path={`${path}/blog/:contentID`}>
            <ContentPage />
          </Route>
          <Route exact path={`${path}/about`}>
            <About />
          </Route>
          <Route exact path={`${path}/academic`}>
            <AcademicPage />
          </Route>
          <Route exact path={`${path}/academic/:contentID`}>
            <AcademicPage />
          </Route>
          <Route exact path={`${path}/funfact`}>
            <FunfactPage />
          </Route>
          <Route exact path={`${path}/profile`}>
            <ManagePage />
          </Route>
        </Switch>
        <FooterWrapper
          footer={footer}
          hidden={!isAuthenticated || authUsername !== pageUsername}
        />
      </Container>
    </UserContext.Provider>
  );
};

export { PortfolioIndex };