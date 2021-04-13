import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';

class UserName {
  @prop({ required: true })
  name!: string;
}

class SingalImage {
  @prop({ required: true, unique: true })
  imageUrl!: string;
}

class Academic {
  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  author!: string;

  @prop()
  organization!: string;

  @prop({ required: true })
  createDate!: Date;

  @prop({ required: true })
  shortDescription!: string;

  @prop({ required: true })
  bodyParagraph!: string;

  @prop({ required: true })
  academicReferences?: string;

  @prop({ required: true })
  academicImage!: string;
}

class AcademicModels {
  @prop({ ref: User }) user: Ref<User>;

  @prop({ type: () => SingalImage, _id: false })
  images?: SingalImage[];

  @prop({ type: () => Academic, _id: false })
  academics?: Academic[];
}

const AcademicModel = getModelForClass(AcademicModels);

export { Academic, AcademicModel };
