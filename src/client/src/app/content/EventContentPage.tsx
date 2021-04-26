
import axios from 'axios';
import { Event, Events } from '@pure-and-lazy/api-interfaces';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../portfolio-shared/UserContext';

const EventContentPage = () => {
  const contentID = useParams();

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

  const buildEventSection = () => {
    if(eventData){
      // const rightEvent = eventData.events.filter(
      //   (eve: Event)=> eve.uuid === contentID);
      //   console.log("rightEvent", rightEvent);
      return(
        <div>
          <p>hahahah</p>
        </div>
      )
    }

    // setEventData((prevState) => {
    //   return {
    //     ...prevState,
    //     events: prevState.events.filter<Event>(
    //       (eve): eve is Event => eve.uuid === contentID
    //     ),
    //   };
    // });
  }


  return (
      <div>
        <div>123456789</div>
        {/* <div>{buildEventSection}</div> */}
      </div>
  );
};

export { EventContentPage };
