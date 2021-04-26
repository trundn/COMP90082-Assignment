import { prop, getModelForClass } from '@typegoose/typegoose';

class FunfactItem {
  @prop({ required: true })  factName: string;
  @prop({ required: true })   factDetail: string;
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