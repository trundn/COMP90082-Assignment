// External
import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
// Internal
import { UserContext } from '../../portfolio-shared/UserContext';
import { EditContext } from '../../portfolio-shared/EditContext';
import { useAuth0 } from '@auth0/auth0-react';
import { Event, Events } from '@pure-and-lazy/api-interfaces';
import EventItem from '../../components/event/EventItem';
import EventModal from '../../components/event/EventModal';
import Confirmation from '../../components/ui/modals/Confirmation';
import './eventPage.css';

import { initialEventValues } from '../../constants/eventInitValues';

// Content of the project tab
const EventPage = () => {
  // Pre-pared content

  const [eventData, setEventData] = useState<Events>();

  const [selectedEvent, setSelectedEvent] = useState<Event>(initialEventValues);
  // Control Modal
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);

  // login way
  const editMode = useContext(EditContext);
  const { _id } = useContext(UserContext);
  const { getAccessTokenSilently } = useAuth0();

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

      setEventData(result.data as Events);
      console.log('result.data', result.data);
    } catch (error) {
      console.log('Failed to fetch event data', error);
    }
  };

  const handleEventSubmit = (values: Event, isAddMoreAction: boolean) => {
    const newEvent = cloneEvent(values);
    if (isAddMoreAction) {
      console.log('isAddMoreAction is true');
      // const foundEvent = eventData.events.find(
      //   (item) => item.eventName.toLowerCase() == values.eventName.toLowerCase()
      // );
      const foundEvent = false;
      if (foundEvent) {
        alert('The same event was already added.');
      } else {
        const newEvent = { ...values };
        newEvent.uuid = uuidv4();
        addEvent(newEvent);
      }
    } else {
      const newEvent = { ...values };
      updateEvent(newEvent);
    }
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
      console.log('event', newEvent);
      console.log('_id', _id);
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

  // Update event data
  const updateEvent = async (updateEvent: Event) => {
    try {
      const token = await getAccessTokenSilently();

      await axios({
        method: 'PUT',
        url: `/api/event/update`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          user: _id,
          event: updateEvent,
        },
      });

      setEventData((prevState) => {
        return {
          ...prevState,
          qualifications: prevState.events.map<Event>((event) => {
            return event.uuid === updateEvent.uuid ? updateEvent : event;
          }),
        };
      });
    } catch (error) {
      console.log('Failed to update qualification', error);
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
          <EventItem />
          <EventItem />
          <EventItem />
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
