import { PassportStatic } from 'passport';
import { StrategyOptions, ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { coreConfig } from '../config/keys';
import { User, UserModel } from '../models/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import { MongoError } from 'mongodb';

export const authenticateUser = (passport: PassportStatic) => {
  const _userRepository: IUserRepository = new UserRepository(UserModel);

  const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: coreConfig.JWT.secret
  };

  passport.use(
    new Strategy(options, async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
      const user: User = await _userRepository.getById(jwtPayload.user._id);

      if (user instanceof MongoError) return done(user, false);

      if (!user) {
        return done(null, false);
      } else {
        return done(null, user, { issuedAt: jwtPayload.iat });
      }
    })
  );
};

interface JwtPayload {
  user?: User;
  iat?: Date;
}
