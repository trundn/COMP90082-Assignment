import React, { useState, useEffect, useContext, Fragment } from 'react';
import EventItem from '../../components/event/EventItem';
import EventModal from '../../components/event/EventModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from 'react-bootstrap';
import { UserContext } from '../../portfolio-shared/UserContext';
import { EditContext } from '../../portfolio-shared/EditContext';
import './eventPage.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Event } from '@pure-and-lazy/api-interfaces';

// Content of the project tab
const EventPage = () => {
  // Pre-pared content

  const [show, setShow] = useState(false);
  // login way
  const editMode = useContext(EditContext);
  const { _id } = useContext(UserContext);
  const { getAccessTokenSilently } = useAuth0();

  // useEffect(()=>{
  //     fetchEventData();
  // }, []);

  // const fetchEventData = async () => {

  // };
  const handleEventSubmit = (values: Event): void => {
    alert(JSON.stringify(values));
  };

  return (
    <div>
      <div className={'Header'}>
        <h1>Events</h1>
      </div>
      <hr />
      <div>
        <EventModal
          show={show}
          onSubmit={handleEventSubmit}
          onClose={() => setShow(false)}
        />
        {/* All the events are in here */}
        <ul>
          <EventItem></EventItem>
          <EventItem></EventItem>
          <EventItem></EventItem>
        </ul>
      </div>
      <hr />
      <div className={'Button'}>
        <Button
          onClick={() => {
            // Use EventModal
            setShow(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add More
        </Button>
      </div>
    </div>
  );
};

export { EventPage };
