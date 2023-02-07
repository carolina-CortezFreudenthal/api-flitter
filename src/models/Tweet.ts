import mongoose from 'mongoose';
import { IUser } from './User';
const {Schema} = mongoose;

// **** Types **** //

export interface ITweet {
  _id: string;
  userId: string;
  text?: string;
  imageUrl?: string;
  kudosCount: number;
  kudosUserIds: string[],
  createdAt: Date;
  // Esto es para las respuestas
  user?: IUser;
}

// **** Mongoose **** //

const TweetSchema = new Schema({
  _id: {type: String, index: true},
  userId: {type: String, index: true},
  text: String,
  imageUrl: String,
  createdAt: Date,
  kudosCount: Number,
  kudosUserIds: [String],
});

export const TweetModel = mongoose.model('Tweet', TweetSchema);

// **** Validaciones **** //

const validTweet = (
  arg: { text?: string, imageUrl?: string },
) : boolean => {
  if (!arg?.['text'] && !arg?.['imageUrl']) return false;
  return true;
};

// **** Export default **** //

export default {
  validTweet,
} as const;
