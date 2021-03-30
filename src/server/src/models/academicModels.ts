import { prop, getModelForClass } from '@typegoose/typegoose';

class UserName {
  @prop({ required: true }) name!: string;
}
