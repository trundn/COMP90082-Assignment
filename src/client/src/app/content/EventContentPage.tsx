
import axios from 'axios';
import { Event, Events } from '@pure-and-lazy/api-interfaces';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../portfolio-shared/UserContext';
import { EventSectionTypes } from '../constants/eventConstant';
import { Col, Container, Row } from 'react-bootstrap';

const EventContentPage = () => {
  const {contentID} = useParams();
  console.log("contentID", contentID);
  const { _id } = useContext(UserContext);
  const [eventData, setEventData] = useState<Events>();
  
  useEffect(() => {
    getEventItem();
  }, [_id]);

  const getEventItem = async() => {
    try{
      const result = await axios({
        method: 'GET',
        url: `/api/event/${_id}`,
      });
      setEventData(result.data as Events);
      // console.log('result.data.events',result.data)
    }catch (error){
      console.log('Failed to fetch event data', error);
    }
  };

  console.log('eventData', eventData);

  // Display event item to webpage
  const buildEventSection = (
    contentBuilder: (() => JSX.Element[]) | (() => JSX.Element),
    sectionType: EventSectionTypes
  ): JSX.Element => {
    // console.log("buildEventSection is actived");
    return (
      <Container>
        <div>{contentBuilder()}</div>
      </Container>
    );
  };

  const buildEventItems = (): JSX.Element[] => {
    
    let eventEls: JSX.Element[] = null;
    if(eventData){
      console.log("eventData is ture");
      eventEls = eventData.events.filter((event: Event) => 
        event.uuid === contentID)
      .map((event)=>{
        return(
          <Row>
            <Col>
              <div className={'item'}>
                <div className={'date'}>
                  <p>Start: {event.startDate.toString().slice(0, 10)}</p>
                  <p>End: {event.endDate.toString().slice(0, 10)}</p>
                </div>
                <div className={'event-details'}>
                  <h3 className={'event-name'}>{event.eventName}</h3>
                  <span className={'hoster'}>
                    Hoster: {event.eventHoster}
                  </span>
                  <span className={'location'}>
                    Location: {event.eventLocation}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        )
      })
    }
    return eventEls;
  };
    // setEventData((prevState) => {
    //   return {
    //     ...prevState,
    //     events: prevState.events.filter<Event>(
    //       (eve): eve is Event => eve.uuid === contentID
    //     ),
    //   };
    // });
    // }


  return (
      <div>
        {buildEventSection(buildEventItems, EventSectionTypes.Event)}
      </div>
  );
};

export { EventContentPage };
