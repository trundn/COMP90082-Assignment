import { prop, getModelForClass } from '@typegoose/typegoose';

class UserName {
  @prop({ required: true })
  name!: string;
}

class SingalImage extends UserName {
  @prop({ required: true, unique: true })
  imageUrl!: string;

  @prop({ required: true })
  academicID!: string;
}

class Reference extends UserName {
  @prop()
  reference?: string;
}

class Academic extends UserName {
  @prop({ required: true, unique: true })
  academicID!: string;

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
  academicImage!: string;

  @prop({ required: true })
  academicReferences?: Reference[];
}
