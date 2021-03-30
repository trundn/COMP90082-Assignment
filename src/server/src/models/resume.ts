import { prop, getModelForClass } from '@typegoose/typegoose';

class Namable {
  @prop({ required: true }) name!: string;
}

class Qualification {
  @prop({ required: true }) awardType!: string;
  @prop({ required: true }) awardTitle!: string;
  @prop({ required: true }) major!: string;
  @prop({ required: true }) institutionName!: string;
  @prop({ required: true }) institutionWebsite!: string;
  @prop({ required: true }) institutionCity!: string;
  @prop({ required: true }) startDate!: Date;
  @prop() graduationDate?: Date;
}

class Certificate extends Namable {
  @prop({ required: true }) summary!: string;
  @prop({ required: true }) expiryDate!: Date;
}

class Award extends Namable {
  @prop({ required: true }) summary!: string;
  @prop({ required: true }) date!: Date;
}

class Experience {
  @prop({ required: true }) organisation!: string;
  @prop({ required: true }) city!: string;
  @prop({ required: true }) workSummary!: string;
  @prop({ required: true }) startDate!: Date;
  @prop() endDate?: Date;
  @prop({ required: true }) role!: string;
  @prop({ type: () => Responsibility })
  responsibilities?: Responsibility[];
}

class Skill extends Namable {
  @prop({ required: true }) yearOfExperiences!: string;
}

class Interest extends Namable {}

class Responsibility extends Namable {}

class Reference extends Namable {
  @prop({ required: true }) email!: string;
  @prop({ required: true }) position!: string;
  @prop({ required: true }) organisation!: string;
}

class Resume {
  @prop({ required: true }) profileImageUrl!: string;
  @prop({ required: true }) firstName!: string;
  @prop({ required: true }) lastName!: string;
  @prop({ required: true }) biography!: string;
  @prop({ required: true }) emailAddress!: string;
  @prop() address?: string;
  @prop() phoneNumber?: number;

  @prop({ type: () => Qualification })
  qualifications?: Qualification[];

  @prop({ type: () => Certificate })
  certificates?: Certificate[];

  @prop({ type: () => Award })
  awards?: Award[];

  @prop({ type: () => Experience })
  experiences?: Experience[];

  @prop({ type: () => Skill })
  skills?: Skill[];

  @prop({ type: () => Reference })
  interests?: Reference[];

  @prop({ type: () => Interest })
  references?: Interest[];
}

const ResumeModel = getModelForClass(Resume);

export { Resume, ResumeModel };
