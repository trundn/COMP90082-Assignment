import { css } from 'emotion';
import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import { EditContext } from './EditContext';
import { UserContext } from './UserContext';

const PortfolioNavBar = () => {
  const { id } = useParams();
  const editMode = useContext(EditContext);
  const { name } = useContext(UserContext);
  const URL_PREFIX = editMode ? `/edit` : `/u/${id}`;
  const logoStyle = css`
    position: relative;
    @media (min-width: 576px) {
      position: absolute;
    }
  `;

  return (
    <Navbar
      sticky="top"
      bg="dark"
      variant="dark"
      expand="sm"
      collapseOnSelect
      className="shadow"
    >
      <LinkContainer
        to={`${URL_PREFIX}/`}
        className={css`
          ${logoStyle}
        `}
      >
        <Navbar.Brand>{name}</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" activeKey="blog">
          <LinkContainer to={`${URL_PREFIX}/resume`}>
            <Nav.Link eventKey="/resume">Resume</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${URL_PREFIX}/events`}>
            <Nav.Link eventKey="/events">Events</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${URL_PREFIX}/projects`}>
            <Nav.Link eventKey="/projects">Projects</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${URL_PREFIX}/blog`}>
            <Nav.Link eventKey="/blog">Blog</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${URL_PREFIX}/academic`}>
            <Nav.Link eventKey="/academic">Academic</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${URL_PREFIX}/about`}>
            <Nav.Link eventKey="/about">About</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${URL_PREFIX}/funfact`}>
            <Nav.Link eventKey="/about">Funfact</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`${URL_PREFIX}/profile`}>
            <Nav.Link eventKey="/profile">Profile</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { PortfolioNavBar };
