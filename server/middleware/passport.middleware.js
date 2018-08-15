const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { jwtKey } = require('../../config/keys');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Чтение токена из аголовков
  secretOrKey: jwtKey // Секретный ключ
};
const User = mongoose.model('users');
module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.id).select('email, id');
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e);
      }
    })
  )
};