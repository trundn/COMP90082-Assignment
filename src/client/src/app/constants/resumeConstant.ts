export type EnumLiteralsOf<T extends object> = T[keyof T];

export type ResumeSectionTypes = EnumLiteralsOf<typeof ResumeSectionTypes>;

export const ResumeSectionTypes = Object.freeze({
  Education: 'EDUCATION' as 'EDUCATION',
  Awards: 'AWARDS' as 'AWARDS',
  Certificates: 'CERTIFICATES' as 'CERTIFICATES',
  Work: 'WORK' as 'WORK',
  Skills: 'SKILLS' as 'SKILLS',
  References: 'REFERENCES' as 'REFERENCES',
});
