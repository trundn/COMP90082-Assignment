import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';

class Qualification {
  @prop({ required: true }) institutionName!: string;
  @prop() institutionWebsite?: string;
  @prop({ required: true, unique: true }) degree!: string;
  @prop({ required: true }) description!: string;
  @prop({ required: true }) startDate!: Date;
  @prop() graduationDate?: Date;
}

class Resume {
  @prop({ ref: User }) user: Ref<User>;
  @prop({ type: () => Qualification })
  qualifications?: Qualification[];
}

const ResumeModel = getModelForClass(Resume);

export { Resume, ResumeModel };
