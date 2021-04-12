import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';

class UserName {
  @prop({ required: true })
  name!: string;
}

class SingalImage extends UserName {
  @prop({ required: true, unique: true })
  imageID!: number;

  @prop({ required: true, unique: true })
  imageUrl!: string;
}

class Academic extends UserName {
  @prop({ required: true, unique: true })
  academicID!: number;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  author!: string;

  @prop()
  orginzation!: string;

  @prop({ required: true })
  createDate!: Date;

  @prop({ required: true })
  shortDescription!: string;

  @prop({ required: true })
  bodyParagraph!: string;

  @prop({ required: true })
  academicReferences?: String;

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

const AcademicModel = getModelForClass(Academic);

export { Academic, AcademicModel };
