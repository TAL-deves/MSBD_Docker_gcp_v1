const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require("./Database/models/SignUpModels");

// create session id
// whenever we login it creares user id inside session
passport.serializeUser((user, done) => {
	done(null, user);
  });
  
// find session info using session id
passport.deserializeUser(async (id, done) => {
try {
	const user = await User.findById(id);
	// console.log("user all details: "+user);
	done(null, user);
} catch (error) {
	// console.log(error);
	done(error, false);
}
});


passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID_DEVELOPMENT,
			clientSecret: process.env.CLIENT_SECRET_DEVELOPMENT,
			callbackURL: process.env.GOOGLE_CALLBACK_URL_DEVELOPMENT,
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			// callback(null, profile);
			User.findOne({ googleId: profile.id }, (err, user) => {
				if (err) return callback(err, null);
		
				// not a user; so create a new user with new google id
				if (!user) {
				  let newUser = new User({
					googleId: profile.id,
					username: profile.id,
					password: profile.id,
					profilename: profile.displayName,
					email: profile.email,
					active: true
				  });
				  newUser.save();
				  return callback(null, newUser);
				} else {
				  // if we find an user just return return user
				  return callback(null, user);
				}
			  });
		}
	)
);

passport.use(new FacebookStrategy({
	clientID: process.env.APP_ID_DEVELOPMENT,
	clientSecret: process.env.APP_SECRET_DEVELOPMENT,
	callbackURL: process.env.FACEBOOK_CALLBACK_URL_DEVELOPMENT
  },
  function(accessToken, refreshToken, profile, callback) {
	// return done(null, profile);
	// console.log(profile.id)
	User.findOne({ facebookId: profile.id }, (err, user) => {
		if (err) return callback(err, null);

		// not a user; so create a new user with new google id
		if (!user) {
		  let newUser = new User({
			facebookId: profile.id,
			username: profile.id,
			password: profile.id,
			profilename: profile.displayName,
			active: true
		  });
		  newUser.save();
		  return callback(null, newUser);
		} else {
		  // if we find an user just return return user
		  return callback(null, user);
		}
	  });
  }
  ));
  
