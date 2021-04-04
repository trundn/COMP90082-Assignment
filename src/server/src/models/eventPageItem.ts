import { prop, getModelForClass } from '@typegoose/typegoose';

class EventPageItem {
  @prop({ required: true }) title: string;
  @prop({ required: true }) content: string;
  @prop({ required: true }) lastModifyDate: string;
}

// class EventPageItem {
//     title: string
//     content: string
//     date: string

//     constructor(title: string, content: string, date: string) {
//         this.title = title
//         this.content = content
//         this.date = date
//     }
// }
