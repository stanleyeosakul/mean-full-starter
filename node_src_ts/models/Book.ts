import { Document, model, Model, Schema } from 'mongoose';

const BookSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  description: {
    type: String
  }
});

export interface Book extends Document {
  title?: string;
  author?: string;
  description?: string;
}

export const BookModel: Model<Book> = model<Book>('Book', BookSchema) as Model<Book>;
