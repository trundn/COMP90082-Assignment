// External
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Confirmation from '../../components/ui/modals/Confirmation';
// Internal
import { UserContext } from '../../portfolio-shared/UserContext';
import { EditContext } from '../../portfolio-shared/EditContext';
import { useAuth0 } from '@auth0/auth0-react';
import { Event, Events } from '@pure-and-lazy/api-interfaces';
import EventModal from '../../components/event/EventModal';
import './eventPage.css';

import {
  initialEventValues,
  defaultTypesValues,
} from '../../constants/eventInitValues';
import { DB_DATE_FORMAT } from '../../constants/dateConstant';
import { EventSectionTypes } from '../../constants/eventConstant';
import { LinkContainer } from 'react-router-bootstrap';

// Content of the project tab
const EventPage = () => {
  // Pre-pared content

  const [eventData, setEventData] = useState<Events>();

  const [selectedEvent, setSelectedEvent] = useState<Event>(initialEventValues);
  // Control Modal
  const [modalShows, setModalShows] = useState<{
    [eventType: string]: boolean;
  }>(defaultTypesValues);
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);

  // Control Confirmation
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);
  const [deleteTargetKind, setDeleteTargetKinds] = useState<{
    [eventsType: string]: boolean;
  }>(defaultTypesValues);

  // login way
  const editMode = useContext(EditContext);
  const { _id } = useContext(UserContext);
  const { getAccessTokenSilently } = useAuth0();

  // Get event data
  useEffect(() => {
    fetchEventData();
  }, [_id]);
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
    setModalShows((prevState) => {
      return { ...prevState, [eventType]: status };
    });
  };

  // Display event items to webpage
  const buildEventsSection = (
    contentBuilder: (() => JSX.Element[]) | (() => JSX.Element),
    sectionType: EventSectionTypes
  ): JSX.Element => {
    return (
      <Container>
        <div className={'events'}>
          <div>{contentBuilder()}</div>
        </div>
        {editMode && (
          <div className={'Button'}>
            <Button
              onClick={() => {
                setSelectedEvent(initialEventValues);
                updateModalShowStatus(sectionType, true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Event
            </Button>
          </div>
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
            // move this part into eventitem component
            <Row key={event.uuid}>
              <Col xs={editMode ? 10 : 12}>
                <div className={'item'}>
                  <div className={'date'}>
                    <p>Start: {event.startDate.toString().slice(0, 10)}</p>
                    <p>End: {event.endDate.toString().slice(0, 10)}</p>
                  </div>
                  <div className={'event-details'}>
                    <LinkContainer to={`events/${event.uuid}`} className="pointer">
                      <h3 className={'event-name'}>{event.eventName}</h3>
                    </LinkContainer>
                    <span className={'hoster'}>
                      Hoster: {event.eventHoster}
                    </span>
                    <span className={'location'}>
                      Location: {event.eventLocation}
                    </span>
                  </div>
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
  ): void => {
    updateSelectedEventPart(targetKind, targetVal);
    setDeleteConfirmationShow(true);
    setDeleteTargetKinds((prevState) => {
      return { ...prevState, [targetKind]: status };
    });
  };

  const handleConfirmDelete = (value: boolean) => {
    if (value) {
      if (deleteTargetKind[EventSectionTypes.Event]) {
        deleteEvent(selectedEvent);
        setSelectedEvent(null);
        setDeleteTargetKinds((prevState) => {
          return { ...prevState, [EventSectionTypes.Event]: false };
        });
      }
    }
    setDeleteConfirmationShow(false);
  };

  const deleteEvent = async (delEvent: Event) => {
    try {
      const token = await getAccessTokenSilently();
      await axios({
        method: 'DELETE',
        url: `/api/event/delete`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          user: _id,
          eventUUID: delEvent.uuid,
        },
      });

      setEventData((prevState) => {
        return {
          ...prevState,
          events: prevState.events.filter<Event>(
            (eve): eve is Event => eve.uuid !== delEvent.uuid
          ),
        };
      });
    } catch (error) {
      console.log('Failed to delete this event', error);
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
      await axios({
        method: 'PUT',
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

      setEventData((prevState) => {
        return {
          ...prevState,
          events: [newEvent, ...prevState.events],
        };
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
    <div css="margin-bottom: 4em">
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
        <Confirmation
          show={deleteConfirmationShow}
          onConfirm={handleConfirmDelete}
          title="Delete Event"
          confirmation="Are you sure you want to delete this event?"
          okText="Yes"
          cancelText="Cancel"
          okButtonStyle="danger"
          cancelButtonStyle="secondary"
        />
        {/* All the events are in here */}
        <div>
          {buildEventsSection(buildEventSection, EventSectionTypes.Event)}
        </div>
      </div>
    </div>
  );
};

export { EventPage };
