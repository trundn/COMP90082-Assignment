import { EventModel } from '../models/event';

// Router from Express
import {Router} from 'express';

import {
    UserProfile,
    Event, 
    Events} from '../../../libs/api-interfaces/src/lib/api-interfaces';

import {
    getEventByUserName,
    addEvent,
    updateEvent,
    deleteEvent
} from './eventController';

import { 
    expectJSONMatching, 
    makeTestSuite } from '../utils/testUtil';

import { callEndpoint } from '../utils/controllerUtil';
import { UserModel } from '../models/user';
import { editProfile, viewProfile, viewProfileByJwt } from './portfolioController';
import { getMockReq } from '@jest-mock/express';

const username = 'test_event';
const auth0Id = 'some_id_event';
const defaultReq = {params: {}, query: {}};
const usernameReq = {...defaultReq, params: {username}};
const authReq = {...defaultReq, user: {sub: auth0Id}};

const userProfile: UserProfile = {
    username,
    email: 'example@gmail.com',
    name: 'John Smith',
    dateJoined: new Date(2021, 5, 19),
    description: 'nice profile description',
  };

const eventItem: Event = {
    uuid : '17cca68a-3672-4df8-b106-42b6b283aa09',
    eventName: 'fdfs24343',
    eventHoster: 'sdfds',
    eventLocation: 'dsfds',
    startDate: new Date("2021-04-22T12:49:33.901+00:00"),
    endDate: new Date("2021-04-22T12:49:33.901+00:00"),
}

const usernameReq1 = getMockReq({ params: { userid: '606d44843450be454c07b9a8' } })
const userid = '606d44843450be454c07b9a8'
makeTestSuite('Event tests', () =>{
    
    it('should add event item', async() =>{
        const newEvent = {
            eventName: 'A better event name',
            eventHoster: 'A better event hoster',
            eventLocation: 'A better event location',
            startDate: new Date("2021-04-22T12:49:33.901+00:00"),
            endDate: new Date("2021-04-22T12:50:33.901+00:00"),
        };

        const addReq = getMockReq({
            params : {
                body : {
                    user : userid,
                    event : newEvent,
                }
            }
        })
        const {status} = await callEndpoint(addEvent, addReq);
        expect(status).toBe(201);
    })

    it('Should return all event items', async() =>{
        const {data: actualEvent, status} = await callEndpoint(
            getEventByUserName,
            usernameReq1,
        );
        expect(status).toBe(200);
        console.log("actualEvent.events", actualEvent);
        // expectJSONMatching(actualEvent , eventItem);
    });

    
    it('should allow editing the event', async()=>{
        const updateEventItem = {
            eventName: 'A better event name',
            eventHoster: 'A better event hoster',
            eventLocation: 'A better event location',
            startDate: new Date("2021-04-22T12:49:33.901+00:00"),
            endDate: new Date("2021-04-22T12:50:33.901+00:00"),
        };

        const updateReq = getMockReq({
            params : {
                body : {
                    user : userid,
                    event : updateEventItem,
                }
            }
        })

        const {data, status: status2} = await callEndpoint(
            updateEvent,
            updateReq,
        );
        expect(status2).toBe(201);
        // expectJSONMatching(data, {...eventItem, ...newEvent});
    });

    // it('should delete an event item', async () => {
    //     const { status } = await callEndpoint(deleteEvent, {
    //         ...usernameReq1,
    //       params: { user: '606d44843450be454c07b9a8', eventUUID : eventItem.uuid },
    //     });
    //     expect(status).toBe(201);
    //   });

});