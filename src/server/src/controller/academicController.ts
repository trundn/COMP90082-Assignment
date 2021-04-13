import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { AcademicModel } from '../models/academicModels';

const createAcademic = async (req: Request, res: Response) => {
  console.log('CCCC', req.body);

  const abc = {
    user: mongoose.Types.ObjectId(req.body.user),
    academics: [req.body.academic],
  };
  console.log('TTTT', abc);

  try {
    const newAcademic = await AcademicModel.create({
      user: mongoose.Types.ObjectId(req.body.user),
      academics: [req.body.academic],
    });
    if (newAcademic) {
      res.send(newAcademic);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

const viewAcademic = async (req, res) => {};

const deleteAcademic = async (req, res) => {};

export { createAcademic, viewAcademic, deleteAcademic };
