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

const username = 'test_event';
const auth0Id = 'some_id_event';
const defaultReq = {params: {}, query: {}};
const usernameReq = {...defaultReq, params: {username}};
const authReq = {...defaultReq, user: {sub: auth0Id}};

// Router from Express
const router = Router();
router.get('/:userid', getEventByUserName);


const userProfile: UserProfile = {
    username,
    email: 'example@gmail.com',
    name: 'John Smith',
    dateJoined: new Date(2021, 5, 19),
    description: 'nice profile description',
  };

const eventItem: Event = {
    uuid : '347e6a1c-e8e9-45f4-b1b3-1eb7e9a67032',
    eventName: 'Test Event Name',
    eventHoster: 'Test Event Hoster',
    eventLocation: 'Test Event Location',
    startDate: new Date(2021,5,18),
    endDate: new Date(2021,5,19),
}

makeTestSuite('Event tests', () =>{
    it('Should return a user profile.', async () => {
        await UserModel.create({
            ...userProfile,
            auth0Id,
            portfolio: [],
        });
        const {data: actualProfile, status} = await callEndpoint(
            viewProfile,
            usernameReq,
        );
        expect(status).toBe(200);
        expectJSONMatching(actualProfile, userProfile);
    });

    it('Should return an event item', async() =>{
        await EventModel.create({
            ...eventItem,
            auth0Id,
        });
        const {data: actualEvent, status} = await callEndpoint(
            getEventByUserName,
            usernameReq,
        );
        expect(status).toBe(200);
    });

    it('should return the same user profile when accessing via auth', async () => {
        const { data: actualProfile, status } = await callEndpoint(
          viewProfileByJwt,
          authReq
        );
        expect(status).toBe(200);
        expectJSONMatching(actualProfile, userProfile);
      });

    it('should allow editing the user profile', async() => {
        const newProfile = {
            name: 'A better name_test',
            description: 'A better description_test',
        };
        const {status} = await callEndpoint(editProfile, {
            ...authReq,
            body: newProfile as UserProfile,
        });
        expect(status).toBe(200);

        const {data, status: status2} = await callEndpoint(
            viewProfile,
            usernameReq
        );
        expect(status2).toBe(200);
        expectJSONMatching(data, { ...userProfile, ...newProfile });
    });

    // it('should allow editing the event', async()=>{
    //     const newEvent = {
    //         eventName: 'A better event name',
    //         eventHoster: 'A better event hoster',
    //         eventLocation: 'A better event location',
    //         startDate: new Date(2021,4,18),
    //         endDate: new Date(2021,4,19),
    //     };

    //     const {status} = await callEndpoint(updateEvent, {
    //         ...authReq,
    //         body: newEvent as Event,
    //     });
    //     expect(status).toBe(200);
        
    //     const {data, status: status2} = await callEndpoint(
    //         viewProfile,
    //         usernameReq
    //     );

    // });
});