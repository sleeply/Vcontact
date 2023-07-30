export interface IContact {
  phoneNumber: string;
  firstName: string;
  surname: string;
  patronymic: string;
  mail: string;
  fullName?: string;
  tag: ITagType;
  id: number;
  tag_id: number;
}
export type ITagType = "Work" | "Family" | "Friend";

export interface ITag {
  value: ITagType;
  id: number;
}


export interface IContactFilter {
 search: string;
 tag: ITag | null 
}
