// External
import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
// Internal
import { UserContext } from '../../portfolio-shared/UserContext';
import { EditContext } from '../../portfolio-shared/EditContext';
import { useAuth0 } from '@auth0/auth0-react';
import { Event, Events } from '@pure-and-lazy/api-interfaces';
import EventItem from '../../components/event/EventItem';
import EventModal from '../../components/event/EventModal';
import Confirmation from '../../components/ui/modals/Confirmation';
import './eventPage.css';

import {
  initialEventValues,
  defaultTypesValues,
} from '../../constants/eventInitValues';
import { DB_DATE_FORMAT } from '../../constants/dateConstant';
import { EventSectionTypes } from '../../constants/eventConstant';

// Content of the project tab
const EventPage = () => {
  // Pre-pared content

  const [eventData, setEventData] = useState<Events>();

  const [selectedEvent, setSelectedEvent] = useState<Event>(initialEventValues);
  // Control Modal
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);

  const [modalShows, setModalShows] = useState<{
    [resumeType: string]: boolean;
  }>(defaultTypesValues);

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
      // console.log('result.data.events',result.data)
    } catch (error) {
      console.log('Failed to fetch event data', error);
    }
  };

  // Change modal statue
  const updateModalShowStatus = (eventType: string, status: boolean): void => {
    // console.log("updateModalShowStatus");
    setModalShows((prevState) => {
      // console.log('prevState', prevState);
      return { ...prevState, [eventType]: status };
    });
  };

  // Display event items to webpage
  const buildEventsSection = (
    contentBuilder: (() => JSX.Element[]) | (() => JSX.Element),
    sectionType: EventSectionTypes
  ): JSX.Element => {
    return (
      <Container className="row-separator">
        <Row>
          <Col md={8}>{contentBuilder()}</Col>
        </Row>
        {editMode && (
          <Row>
            <Col md="auto">
              <Button
                onClick={() => {
                  // Change here
                  setSelectedEvent(initialEventValues);
                  updateModalShowStatus(sectionType, true);
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Event
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    );
  };

  // Display event item to webpage
  const buildEventSection = (): JSX.Element[] => {
    let eventEls: JSX.Element[] = null;
    if (eventData) {
      eventEls = eventData.events
        .sort((a, b) => {
          let dateA = moment(a.startDate, DB_DATE_FORMAT);
          let dateB = moment(b.startDate, DB_DATE_FORMAT);
          return dateB.diff(dateA);
        })
        .map((event) => {
          return (
            <Row key={event.uuid}>
              <Col xs={editMode ? 10 : 12}>
                <div>
                  <h5>{event.eventName}</h5>
                  <h5>Event Hoster: {event.eventHoster}</h5>
                  <h5>Event Location: {event.eventLocation}</h5>
                  <p>Start Date: {event.startDate}</p>
                  <p>End Date: {event.endDate}</p>
                </div>
              </Col>
              {bindEditaAndDeletebleButton(event, EventSectionTypes.Event)}
            </Row>
          );
        });
    }
    return eventEls;
  };

  // handle 'add more' button and 'edit' icon
  const handleEventSubmit = (values: Event, isAddMoreAction: boolean) => {
    const newEvent = cloneEvent(values);
    updateModalShowStatus(EventSectionTypes.Event, false);
    if (isAddMoreAction) {
      console.log('isAddMoreAction is true');
      const foundEvent = eventData.events.find(
        (item) =>
          item.eventName.toLowerCase() === values.eventName.toLowerCase()
      );
      // const foundEvent = false;
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

  // Display "edit" and "delete" button
  const buildEditaAndDeletebleButton = (
    onEditClick,
    onDeleteClick
  ): JSX.Element => {
    if (editMode) {
      return (
        <Col xs={2} className="align-self-center">
          <span>
            <FontAwesomeIcon
              onClick={onEditClick}
              icon={faEdit}
              size="lg"
              color="#28a745"
              className="mr-2"
            />
            <FontAwesomeIcon
              onClick={onDeleteClick}
              icon={faTrashAlt}
              size="lg"
              color="#dc3545"
            />
          </span>
        </Col>
      );
    } else {
      return null;
    }
  };

  // bind actions to "edit" and "delete" button
  const bindEditaAndDeletebleButton = (
    targetVal: any,
    targetKind: EventSectionTypes
  ): JSX.Element => {
    return buildEditaAndDeletebleButton(
      () => handleUpdateAction(targetVal, targetKind, true),
      () => handleDeleteAction(targetVal, targetKind, true)
    );
  };

  // handle Update button
  const handleUpdateAction = (
    targetVal: any,
    targetKind: string,
    status: boolean
  ): void => {
    // console.log('handleEditAction');
    updateSelectedEventPart(targetKind, targetVal);
    updateModalShowStatus(targetKind, status);
  };

  const updateSelectedEventPart = (targetKind: string, targetVal: any) => {
    if (targetKind === EventSectionTypes.Event) {
      // console.log('selectedEvent', targetVal);
      setSelectedEvent(targetVal);
    }
  };

  const handleEventModalCloseClick = () => {
    updateModalShowStatus(EventSectionTypes.Event, false);
  };

  // handle Delete button
  const handleDeleteAction = (
    targetVal: any,
    targetKind: string,
    status: boolean
  ): void => {};

  // Clone event data
  const cloneEvent = (event: Event): Event => {
    const newEvent = { ...event };
    return newEvent;
  };

  // Add event data
  const addEvent = async (newEvent: Event) => {
    try {
      const token = await getAccessTokenSilently();
      // console.log('event', newEvent);
      // console.log('_id', _id);
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
      // console.log("update", updateEvent);
      // console.log("update", _id);
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
          events: prevState.events.map<Event>((event) => {
            return event.uuid === updateEvent.uuid ? updateEvent : event;
          }),
        };
      });
    } catch (error) {
      console.log('Failed to update event', error);
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
          selectedEvent={selectedEvent}
          show={modalShows[EventSectionTypes.Event]}
          onSubmit={handleEventSubmit}
          onClose={handleEventModalCloseClick}
        />
        {/* All the events are in here */}
        <Container>
          {buildEventsSection(buildEventSection, EventSectionTypes.Event)}
        </Container>
      </div>
      <hr />
    </div>
  );
};

export { EventPage };
