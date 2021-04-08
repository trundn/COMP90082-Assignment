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

class Resume {
  @prop({ ref: User }) user: Ref<User>;

  @prop({ type: () => Qualification })
  qualifications?: Qualification[];

  @prop({ type: () => Experience })
  experiences?: Experience[];
}

const ResumeModel = getModelForClass(Resume);

export { Resume, ResumeModel };
