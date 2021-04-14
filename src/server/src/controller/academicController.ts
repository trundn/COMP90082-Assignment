import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { AcademicModel } from '../models/academicModels';

const getAcademicByUserName = async (req: Request, res: Response) => {
  const { userid } = req.params;

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
  console.log('CCCC', req.body);

  const abc = {
    user: mongoose.Types.ObjectId(req.body.user),
    academic: [req.body.academic],
  };
  console.log('TTTT', abc);

  try {
    const item = await AcademicModel.findOne({
      user: mongoose.Types.ObjectId(req.body.user),
    });

    if (item) {
      const newAcademic = req.body.academic;
      await AcademicModel.findOneAndUpdate(
        { user: mongoose.Types.ObjectId(req.body.user) },
        { $push: { academics: newAcademic } }
      );
      res.send(item);
    } else {
      const newAcademic = req.body.academic;
      await AcademicModel.create({
        user: mongoose.Types.ObjectId(req.body.user),
        academics: { newAcademic },
      });
      res.send();
    }
  } catch {
    console.error;
  }
};

const viewAcademic = async (req, res) => {};

const deleteAcademic = async (req, res) => {};

export { createAcademic, viewAcademic, deleteAcademic, getAcademicByUserName };
