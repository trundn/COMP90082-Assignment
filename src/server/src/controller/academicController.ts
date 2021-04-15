import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { AcademicModel } from '../models/academicModels';

const getAcademicByUserName = async (req: Request, res: Response) => {
  const { userid } = req.params;
  console.log(userid);
  try {
    const item = await AcademicModel.findOne({
      user: mongoose.Types.ObjectId(userid),
    });
    if (item) {
      res.send(item);
    } else {
      const newAcademicModel = await AcademicModel.create({
        user: mongoose.Types.ObjectId(userid),
      });
      if (newAcademicModel) {
        res.send(newAcademicModel);
      } else {
        res.sendStatus(404);
      }
    }
  } catch {
    res.sendStatus(400);
  }
};

const createAcademic = async (req: Request, res: Response) => {
  const aca_id = req.body._id;
  const newAcademic = req.body.academic;

  try {
    try {
      await AcademicModel.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(aca_id) },
        { $push: { academics: newAcademic } }
      );
      res.sendStatus(201);
    } catch {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(404);
  }
};

const updateAcademic = async (req: Request, res: Response) => {
  const aca_id = req.body._id;
  const update_academic = req.body.academic;

  console.log(aca_id);
  console.log(update_academic);
  try {
    try {
      await AcademicModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(aca_id),
          academics: { $elemMatch: { uuid: update_academic.uuid } },
        },
        {
          $set: {
            'academics.$.title': update_academic.title,
            'academics.$.author': update_academic.author,
            'academics.$.organization': update_academic.author,
            'academics.$.createDate': update_academic.createDate,
            'academics.$.shortDescription': update_academic.shortDescription,
            'academics.$.bodyParagraph': update_academic.bodyParagraph,
            'academics.$.academicReferences':
              update_academic.academicReferences,
            'academics.$.academicImage': update_academic.academicImage,
          },
        }
      );
      res.send(201);
    } catch {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(404);
  }
};

const viewAcademic = async (req, res) => {};

const deleteAcademic = async (req, res) => {};

export {
  createAcademic,
  viewAcademic,
  deleteAcademic,
  getAcademicByUserName,
  updateAcademic,
};
