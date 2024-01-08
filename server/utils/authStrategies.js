import "dotenv/config";
import passport from "passport";
import passportGoogleOAuth20 from "passport-google-oauth20";
import User from "../models/userModel.js";

const GoogleStrategy = passportGoogleOAuth20.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH20_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH20_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH20_CALLBACK_URL,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ username: profile.displayName,googleId: profile.id, }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default passport;