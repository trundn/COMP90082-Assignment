import { prop, getModelForClass } from '@typegoose/typegoose';

class UserName {
  @prop({ required: true }) name!: string;
}

class UserImage extends UserName {
  @prop({ required: true }) imageUrl!: string;
}
