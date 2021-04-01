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
