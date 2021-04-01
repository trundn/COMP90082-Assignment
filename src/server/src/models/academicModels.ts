import { prop, getModelForClass } from '@typegoose/typegoose';

class UserName {
  @prop({ required: true })
  name!: string;
}

class SingalImage extends UserName {
  @prop({ required: true })
  imageUrl!: string;

  @prop({ required: true })
  academicID!: string;
}

class Academic extends UserName {
  @prop({ required: true })
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
  academicReference!: string;
}
