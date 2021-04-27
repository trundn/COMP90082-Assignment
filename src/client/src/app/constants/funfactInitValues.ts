import { Funfact } from '@pure-and-lazy/api-interfaces';
import { FunfactSectionTypes } from './funfactConstant';

export const defaultTypesValues: { [funfactType: string]: boolean } = {
  [FunfactSectionTypes.Funfact]: false,
};

export const initialFunfactValues: Funfact = {
  factName: '',
  factDetail: '',
};