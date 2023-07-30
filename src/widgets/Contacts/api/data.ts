import type { IContact, ITag } from "../model";

export const DataTags: ITag[] = [
  {
    value: "Work",
    id: 1,
  },
  {
    value: "Friend",
    id: 2,
  },
  {
    value: "Family",
    id: 3,
  },
];

export const ContactsData: IContact[] = [
  {
    mail: "ofef@rowna.gf",
    phoneNumber: "+998404000401",
    tag: "Work",
    firstName: "Ray",
    patronymic: "Perry",
    surname: "Russell ",
    fullName: " Ray Perry Russell",
    id: 150,
    tag_id: 1,
  },
  {
    mail: "uteriz@usaif.bf",
    phoneNumber: "+998404000402",
    tag: "Work",
    firstName: "Gavin",
    patronymic: "Hale",
    surname: "Edna ",
    fullName: " Gavin Hale Edna",
    id: 165,
    tag_id: 1,
  },
  {
    mail: "toticef@lodgopas.gg",
    phoneNumber: "+998404000403",
    tag: "Friend",
    firstName: "Lewis",
    patronymic: "Johnston",
    surname: "Lottie ",
    fullName: " Lewis Johnston Lottie",
    id: 171,
    tag_id: 2,
  },
  {
    mail: "madi@lu.gl",
    phoneNumber: "+998404000404",
    tag: "Work",
    firstName: "Beatrice",
    patronymic: "Erickson",
    surname: "Patrick ",
    fullName: " Beatrice Erickson Patrick",
    id: 194,
    tag_id: 1,
  },
  {
    mail: "ama@me.cg",
    phoneNumber: "+998404000405",
    tag: "Family",
    firstName: "Myrtle",
    patronymic: "Conner",
    surname: "Zachary ",
    fullName: " Myrtle Conner Zachary",
    id: 141,
    tag_id: 3,
  },
];
