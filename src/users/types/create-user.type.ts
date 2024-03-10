import { User } from './user.type';

export type createUserResponse = {
  user: User;
  token: { access_token: string };
};
