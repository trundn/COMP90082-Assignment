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
  const aca_id = req.body._id;
  const newAcademic = req.body.academic; 
  try {
    const item = await AcademicModel.findOne({
      user: mongoose.Types.ObjectId(aca_id),
    });
    if (!item) {
      await AcademicModel.create({
        aca_id: mongoose.Types.ObjectId(aca_id),
        newAcademic: [],
      });
    }
    await AcademicModel.findOneAndUpdate(
      { user: mongoose.Types.ObjectId(aca_id) },
      { $push: { academics: newAcademic } }
    );
    res.send(item);
  } catch {
    console.error;
  }
};

const updateAcademic = async (req: Request, res: Response) => {
  const aca_id = req.body._id;
  const update_academic = req.body.academic;
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

const deleteAcademic = async (req: Request, res: Response) => {
  const aca_id = req.body._id;
  const academic_uuid = req.body.academic_uuid;

  try {
    try {
      await AcademicModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(aca_id),
        },
        {
          $pull: {
            academics: { uuid: academic_uuid },
          },
        }
      );
      res.sendStatus(201);
    } catch {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

const addImage = async (req: Request, res: Response) => {
  const aca_id = req.body._id;
  const new_singalImage = req.body.singalImage;

  try {
    try {
      await AcademicModel.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(aca_id) },
        { $push: { images: new_singalImage } }
      );
      res.sendStatus(201);
    } catch {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(404);
  }
};

const deleteImage = async (req: Request, res: Response) => {
  const aca_id = req.body._id;
  const singleImage_uuid = req.body.singalImage.uuid;

  try {
    try {
      await AcademicModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(aca_id),
        },
        {
          $pull: {
            images: { uuid: singleImage_uuid },
          },
        }
      );
      res.sendStatus(201);
    } catch {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

export {
  createAcademic,
  deleteAcademic,
  getAcademicByUserName,
  updateAcademic,
  addImage,
  deleteImage,
};
