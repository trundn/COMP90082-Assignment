import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { ResumeModel } from '../models/resume';

const getResumeByUserName = async (req: Request, res: Response) => {
  const { userid } = req.params;

  try {
    const item = await ResumeModel.findOne({
      user: mongoose.Types.ObjectId(userid),
    });
    if (item) {
      res.send(item);
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

const addQualification = async (req: Request, res: Response) => {
  const { resume_id, new_qualification } = req.body;

  try {
    try {
      await ResumeModel.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(resume_id) },
        { $push: { qualifications: new_qualification } }
      );
      res.sendStatus(201);
    } catch {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

const updateQualification = async (req: Request, res: Response) => {
  const { resume_id, new_qualification } = req.body;

  try {
    try {
      await ResumeModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(resume_id),
          qualifications: { $elemMatch: { uuid: new_qualification.uuid } },
        },
        {
          $set: {
            'qualifications.$.institutionName':
              new_qualification.institutionName,
            'qualifications.$.degree': new_qualification.degree,
            'qualifications.$.description': new_qualification.description,
            'qualifications.$.startDate': new_qualification.startDate,
            'qualifications.$.graduationDate': new_qualification.graduationDate,
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

const deleteQualification = async (req: Request, res: Response) => {
  const { resume_id, qualification_uuid } = req.body;

  try {
    try {
      await ResumeModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(resume_id),
        },
        {
          $pull: {
            qualifications: { uuid: qualification_uuid },
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

const addAward = async (req: Request, res: Response) => {
  const { resume_id, new_award } = req.body;

  try {
    try {
      await ResumeModel.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(resume_id) },
        { $push: { awards: new_award } }
      );
      res.sendStatus(201);
    } catch {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(400);
  }
};

const updateAward = async (req: Request, res: Response) => {
  const { resume_id, new_award } = req.body;

  try {
    try {
      await ResumeModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(resume_id),
          awards: { $elemMatch: { uuid: new_award.uuid } },
        },
        {
          $set: {
            'awards.$.name': new_award.name,
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

const deleteAward = async (req: Request, res: Response) => {
  const { resume_id, award_uuid } = req.body;

  try {
    try {
      await ResumeModel.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(resume_id),
        },
        {
          $pull: {
            awards: { uuid: award_uuid },
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
  getResumeByUserName,
  addQualification,
  updateQualification,
  deleteQualification,
  addAward,
  updateAward,
  deleteAward,
};
