import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { ITweet } from '@src/models/Tweet';
import { RouteError } from '@src/other/classes';
import TweetService from '@src/services/TweetService';

import RoutesUtil from '@src/util/RoutesUtil';
import { IReq, IRes, IReqQuery } from './types/types';

// **** Functions **** //

/**
 *  Get All Tweets
 */
async function getAll(req: IReqQuery<{
  userId?: string, 
  text?: string,  
  skip?: string, 
  limit?: string,
}>, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser) throw new RouteError(
    HttpStatusCodes.BAD_REQUEST,
    'no hay un usuario logeado',
  );

  const tweets = await TweetService.getAll(
    req.query.userId, 
    req.query.text, 
    Number(req.query.skip), 
    Number(req.query.limit),
  );
  return res.status(HttpStatusCodes.OK).json({ tweets });
}

/**
 *  Create tweet
 */
async function create(req: IReq<{ tweet: ITweet}>, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser) throw new RouteError(
    HttpStatusCodes.BAD_REQUEST,
    'no hay un usuario logeado',
  );

  const tweets = await TweetService.create({
    // add user id to tweet (person that created the tweet)
    ...req.body.tweet, userId: currentUser._id, 
  });

  return res.status(HttpStatusCodes.OK).json({ tweets });
}

/**
 *  Kudo toggle (if on will go off, and the other way around)
 */
async function kudoToggle(req: IReq<{id: string}>, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser) throw new RouteError(
    HttpStatusCodes.BAD_REQUEST,
    'no hay un usuario logeado',
  );

  const id = req.params.id;
  const tweet = await TweetService.kudoToggle(id, currentUser);

  return res.status(HttpStatusCodes.OK).json({ tweet });
}

/**
 * Delete a tweet
 */
async function deleteTweet(req: IReq<{ id: string }>, res: IRes) {
  const currentUser = RoutesUtil.getCurrentUser(req);
  if (!currentUser) throw new RouteError(
    HttpStatusCodes.BAD_REQUEST,
    'no hay un usuario logeado',
  );

  const id = req.params.id;
  await TweetService.delete(id, currentUser);

  return res.status(HttpStatusCodes.OK).json({
    'message': 'el tweet fue eliminado',
  });
}

// **** Export default **** //

export default {
  create,
  getAll,
  deleteTweet,
  kudoToggle,
} as const;
