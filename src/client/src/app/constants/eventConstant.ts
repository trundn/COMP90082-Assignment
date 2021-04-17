export type EnumLiteralsOf<T extends object> = T[keyof T];
export type EventSectionTypes = EnumLiteralsOf<typeof EventSectionTypes>;

export const EventSectionTypes = Object.freeze({
  Event: 'EVENT' as 'EVENT',
});
