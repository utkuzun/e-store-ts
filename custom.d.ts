import { UserPublic } from './src/schemas/userSchema';

declare global {
  namespace Express {
    interface Request {
      user: UserPublic;
    }
  }
}
