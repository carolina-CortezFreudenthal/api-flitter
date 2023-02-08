import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ITweet, TweetModel } from '@src/models/Tweet';
import { getRandomId } from '@src/util/misc';
import { IUser, UserModel } from '@src/models/User';

// **** Variables **** //

export const TWEET_NOT_FOUND_ERR = 'tweet no encontrado';
export const TWEET_NOT_DELETE = 'no puedes borrar un tweet de otro usuario';


// **** Functions **** //
/**
 * Get all tweets.
 */
async function getAll(
  userId?: string, 
  text?: string,  
  skip?: number, 
  limit?: number,
): Promise<ITweet[]> {
  const filters = {} as { userId: string, text: RegExp };
  
  if (userId) {
    filters.userId = userId;
  }

  if (text) {
    filters.text = new RegExp('.*' + text, 'i');
  }

  const query = TweetModel.find(filters);

  if (limit) {
    query.limit(limit);
  }

  if (skip) {
    query.skip(skip);
  }

  // Sort by recent
  query.sort({createdAt: 'desc'});

  const tweets = await query.lean();
  const newTweets = [];

  for (const tweet of tweets) {
    const user = await UserModel.findById(tweet.userId).lean();
    newTweets.push({...tweet, user} as ITweet);
  }
  return newTweets;
}

/**
 * Create a tweet
 */
async function create(tweet: ITweet): Promise<ITweet> {
  // add tweet creation date
  tweet.createdAt = new Date();
  // Add Automatically generated id
  tweet._id = getRandomId();
  // Add kudos as 0
  tweet.kudosCount = 0;
  tweet.kudosUserIds = [];

  const createdTweet = (await TweetModel.create({ ...tweet })).toObject();
  const user = await UserModel.findById(createdTweet.userId).lean();
  return { ...createdTweet, user } as ITweet;
}

/**
 * Kudo Toggle
 */
async function kudoToggle(id: string, currentUser: IUser): Promise<ITweet> {
  const tweet = await TweetModel.findById(id).lean();
  if (!tweet) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      TWEET_NOT_FOUND_ERR,
    );
  }

  if (tweet.kudosUserIds.includes(currentUser._id)) {
    // Quitamos el kudo
    (tweet as ITweet).kudosCount -= 1;
    tweet.kudosUserIds = tweet.kudosUserIds
      .filter((ui) => ui != currentUser._id);
  } else {
    (tweet as ITweet).kudosCount += 1;
    tweet.kudosUserIds.push(currentUser._id);
  }

  // Return tweet
  await TweetModel.findByIdAndUpdate(tweet._id, tweet).lean();
  return await TweetModel.findById(tweet._id).lean();
}

/**
 * Delete a tweet
 */
async function _delete(id: string, currentUser: IUser): Promise<void> {
  const tweet = await TweetModel.findById(id).lean();
  if (!tweet) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      TWEET_NOT_FOUND_ERR,
    );
  }

  if (tweet.userId !== currentUser._id) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      TWEET_NOT_DELETE,
    );
  }

  // Delete tweet
  await TweetModel.findByIdAndRemove(id).lean();
}

// **** Export default **** //

export default {
  create,
  kudoToggle,
  getAll,
  delete: _delete,
} as const;
