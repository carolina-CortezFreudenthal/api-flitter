import { IUser } from '@src/models/User';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';
import pwdUtil from '@src/util/PwdUtil';


// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(email: string): Promise<IUser | null> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.email == email) {
      return user;
    }
  }
  return null;
}

/**
 * Get one user.
 */
async function getOneById(id: number): Promise<IUser | null> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id == id) {
      return user;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const user of db.users) {
    if (user.id == id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  const db = await orm.openDb();
  return db.users;
}

/**
 * Add one user.
 */
async function add(user: IUser): Promise<IUser> {
  const db = await orm.openDb();
  user.id = getRandomInt();
  // Store encrypted password
  user.pwdHash = await pwdUtil.getHash(user.password);
  user.password = '*******';

  db.users.push(user);
  await orm.saveDb(db);
  return user;
}

/**
 * Update a user.
 */
async function update(user: IUser): Promise<IUser | null> {
  // Store encrypted password
  if (user.password) {
    user.pwdHash = await pwdUtil.getHash(user.password);
    user.password = '*******';
  }

  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id == user.id) {
      db.users[i] = { ...db.users[i], ...user};
      await orm.saveDb(db);
      return { ...db.users[i], ...user};
    }
  }
  return null;
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id == id) {
      db.users.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}


// **** Export default **** //

export default {
  getOne,
  getOneById,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
