import { Request, Response } from 'express';
import axios from 'axios';
import {
    createAcademic,
    deleteAcademic,
    getAcademicByUserName,
    updateAcademic,
    addImage,
    deleteImage} from '../controller/academicController';

import {
    viewProfile,
    } from './portfolioController';

import { AcademicModel } from '../models/academicModels';
import { UserModel } from '../models/user';
import {
    SingalImage,
    Academic,
    AcademicModels,
    UserProfile,
} from '@pure-and-lazy/api-interfaces';

import { getMockReq } from '@jest-mock/express';
import { expectJSONMatching, makeTestSuite } from '../utils/testUtil';
import { callEndpoint } from '../utils/controllerUtil';
import { exception } from 'console';

const imageTest : SingalImage = {
    uuid : "123456",
    imageUrl : "https://testImage.com",
}

const academicTest: Academic = {
    uuid : "2345678",
    title : "unimelb",
    author : "unimelb",
    organization : "unimelb",
    createDate : new Date(2021,5,19),
    shortDescription : "Welcome to unimelb!",
    bodyParagraph : "Top 1 universtiy in aus.",
    academicReferences : "unimelb.edu.au",
    academicImage : "https;//hello.com",
}

const academicUpdateTest: Academic = {
    uuid : "2345678",
    title : "Updateunimelb",
    author : "Updateunimelb",
    organization : "Updateunimelb",
    createDate : new Date(2021,5,19),
    shortDescription : "Welcome to Update unimelb!",
    bodyParagraph : "Top 1 universtiy in aus.",
    academicReferences : "unimelb.edu.au",
    academicImage : "https;//hello.com",
}

const id = "60ace3e1f4b831334c18e335"
const createAcaReq = getMockReq({
    params : {
        body: {
            _id:id,
            academic:academicTest
        }
    }
});

const createImageReq = getMockReq({
    params : {
        body: {
            _id:id,
            singalImage:imageTest
        }
    }
});

const updateAcaReq = getMockReq({
    params : {
        body: {
            _id:id,
            academic:academicUpdateTest
        }
    }
});

const deleteAcaReq = getMockReq({
    params : {
        body: {
            _id:id,
            uuid:academicUpdateTest.uuid 
        }
    }
});

const deleteImageReq = getMockReq({
    params : {
        body: {
            _id:id,
            singalImage:imageTest
        }
    }
});

makeTestSuite('Academic and Images test', () =>{

    it('Should add academic successfully.', async () => {
        const { status : number } = await callEndpoint(
            createAcademic,
            createAcaReq
          );
          expect(number).toBe(201);
    });

    it('Should add image successfully.', async () => {
        const { data, status } = await callEndpoint(
            addImage,
            createImageReq
          );
          
          expect(status).toBe(201);
    });

    // it('Should update academic successfully.', async () => {
    //     const { data ,status } = await callEndpoint(
    //         updateAcademic,
    //         updateAcaReq
    //       );
          
    //       expect(status).toBe(201);
    // });

    // it('Should delete academic successfully.', async () => {
    //     const { data, status } = await callEndpoint(
    //         deleteAcademic,
    //         deleteAcaReq
    //       );
          
    //       expect(status).toBe(201);
    // });

    // it('Should delete image successfully.', async () => {
    //     const { data , status } = await callEndpoint(
    //         deleteImage,
    //         deleteImageReq
    //       );
          
    //       expect(status).toBe(201);
    // });
    
});
