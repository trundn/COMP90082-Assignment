import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';

class Namable {
  @prop({ required: true }) name!: string;
}

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

  @prop({ type: () => Qualification })
  qualifications?: Qualification[];

  @prop()
  awards?: string[];

  @prop({ type: () => Experience })
  experiences?: Experience[];

  @prop({ type: () => Skill })
  skills?: Skill[];

  @prop({ type: () => Reference })
  references?: Reference[];
}

const ResumeModel = getModelForClass(Resume);

export { Resume, ResumeModel };
