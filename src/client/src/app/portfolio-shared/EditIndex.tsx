import React, { useContext } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { BlogPage } from '../blog/BlogPage';
import { ContentPage } from '../content/ContentPage';
import { FooterWrapper } from '../layout/FooterWrapper';
import { About } from './about/About';
import { EditContext } from './EditContext';
import { PortfolioEditFooter } from './PortfolioEditFooter';
import { PortfolioHome } from './PortfolioHome';
import { PortfolioNavBar } from './PortfolioNavBar';
import ResumePage from '../pages/resume/ResumePage';
import { ProjectPage } from './ProjectPage';
import { AuthContext } from '../auth/AuthContext';
import { Container } from 'react-bootstrap';
import { AcademicPage } from '../pages/academic/AcademicPage';
import{FunfactPage} from '../pages/funfactPage/FunfactPage';
import { EventPage } from '../pages/eventPage/EventPage';
import {EventContentPage} from '../content/EventContentPage';


const EditIndex = () => {
  const { registrationComplete, isLoaded } = useContext(AuthContext);
  const isEditMode = true;
  const { path } = useRouteMatch();

  if (!isLoaded) {
    return null;
  }

  if (!registrationComplete) {
    return <Redirect to="/getstarted" />;
  }

  const footer: React.ReactNode = <PortfolioEditFooter />;

  return (
    <EditContext.Provider value={true}>
      <Container className="d-flex flex-column min-vh-100 p-0" fluid>
        <PortfolioNavBar />
        <Switch>
          <Route exact path={`${path}`}>
            <PortfolioHome />
          </Route>
          <Route exact path={`${path}/resume`}>
            <ResumePage />
          </Route>
          {/* //Event Page */}
          <Route exact path={`${path}/events`}>
            <EventPage />
          </Route>
          {/* Event Page content page*/}
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
          <Route exact path={`${path}/academic`}>
            <AcademicPage />
          </Route>
          <Route exact path={`${path}/academic/:contentID`}>
            <AcademicPage />
          </Route>
          <Route exact path={`${path}/about`}>
            <About />
          </Route>
          <Route exact path={`${path}/funfact`}>
            <FunfactPage />
          </Route>
        </Switch>
        <FooterWrapper footer={footer} hidden={!isEditMode} />
      </Container>
    </EditContext.Provider>
  );
};

export { EditIndex };
