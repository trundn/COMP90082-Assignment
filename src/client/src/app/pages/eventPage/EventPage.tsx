// External
import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from 'react-bootstrap';
// Internal
import { UserContext } from '../../portfolio-shared/UserContext';
import { EditContext } from '../../portfolio-shared/EditContext';
import { useAuth0 } from '@auth0/auth0-react';
import { Event } from '@pure-and-lazy/api-interfaces';
import EventItem from '../../components/event/EventItem';
import EventModal from '../../components/event/EventModal';
import './eventPage.css';

// Content of the project tab
const EventPage = () => {
  // Pre-pared content

  const [eventData, setEventData] = useState<Event>();

  const [show, setShow] = useState(false);
  // login way
  const editMode = useContext(EditContext);
  const { _id } = useContext(UserContext);
  const { getAccessTokenSilently } = useAuth0();

  // Control Modal
  const [modalShow, setModalShow] = useState(false);

  // Get event data
  useEffect(() => {
    fetchEventData();
  }, []);
  const fetchEventData = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: `/api/event/${_id}`,
      });

      setEventData(result.data as Event);
    } catch (error) {
      console.log('Failed to fetch event data', error);
    }
  };

  const handleEventSubmit = (values: Event): void => {
    const newEvent = cloneEvent(values);
    addEvent(newEvent);
    console.log('handleEventSubmit');
    setShow(false);
    // alert(JSON.stringify(values));
  };

  // Clone event data
  const cloneEvent = (event: Event): Event => {
    const newEvent = { ...event };
    return newEvent;
  };

  // Add event data
  const addEvent = async (newEvent: Event) => {
    try {
      const token = await getAccessTokenSilently();
      console.log('Add Event Test');
      await axios({
        method: 'PUT',
        // 接口地址
        url: `/api/event/add`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          user: _id,
          event: newEvent,
        },
      });
    } catch (error) {
      console.log('Failed to add Event', error);
    }
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
