import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './user';

class Funfact {
    @prop({ required: true }) uuid?: string;
  @prop({ required: true }) factName!: string;
  @prop({ required: true }) factDetail!: string;
}

class Funfacts {
    @prop({ ref: User }) user: Ref<User>;
    @prop({ type: () => Funfact, _id: false }) funfacts?: Funfact[];
  }

const FunfactModel = getModelForClass(Funfacts);

export { Funfact, FunfactModel };