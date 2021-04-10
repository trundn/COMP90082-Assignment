import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';

class Namable {
  @prop({ required: true }) name!: string;
}

class Qualification {
  @prop({ required: true }) institutionName!: string;
  @prop({ required: true, unique: true }) degree!: string;
  @prop({ required: true }) description!: string;
  @prop({ required: true }) startDate!: Date;
  @prop() graduationDate?: Date;
}

class Certificate extends Namable {
  @prop({ required: true }) issueOrganization!: string;
  @prop() credentialId?: string;
  @prop({ required: true }) issuedDate!: Date;
  @prop() expiryDate?: Date;
}

class Experience {
  @prop({ required: true }) organisation!: string;
  @prop({ required: true }) city!: string;
  @prop({ required: true }) country!: string;
  @prop({ required: true }) workSummary!: string;
  @prop({ required: true }) startDate!: Date;
  @prop() endDate?: Date;
  @prop({ required: true }) role!: string;
  @prop()
  responsibilities?: string[];
}

class Skill extends Namable {
  @prop({ required: true }) level!: string;
  @prop({ required: true }) yearOfExperiences!: number;
}

class Reference extends Namable {
  @prop({ required: true }) position!: string;
  @prop({ required: true }) organisation!: string;
  @prop() phoneNumber?: string;
  @prop({ required: true }) email!: string;
}

class Resume {
  @prop({ ref: User }) user: Ref<User>;

  @prop({ type: () => Qualification, _id: false })
  qualifications?: Qualification[];

  @prop({ type: () => Certificate, _id: false })
  certificates?: Certificate[];

  @prop()
  awards?: string[];

  @prop({ type: () => Experience, _id: false })
  experiences?: Experience[];

  @prop({ type: () => Skill, _id: false })
  skills?: Skill[];

  @prop({ type: () => Reference, _id: false })
  references?: Reference[];
}

const ResumeModel = getModelForClass(Resume);

export { Resume, ResumeModel };
