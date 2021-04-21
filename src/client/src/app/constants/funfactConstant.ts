export type EnumLiteralsOf<T extends object> = T[keyof T];
export type FunfactSectionTypes = EnumLiteralsOf<typeof FunfactSectionTypes>;

export const FunfactSectionTypes = Object.freeze({
  Funfact: 'FUNFACT' as 'FUNFACT',
});