const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User'); // We need our User model

passport.use(
  new GoogleStrategy(
    {
      // --- Part 1: Use the keys from your .env file ---
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // This is the "Authorized redirect URI" you set in the Google console
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // --- Part 2: The "Verify" Callback ---
      // This function is called AFTER Google successfully authenticates the user.
      // 'profile' contains all their Google info (name, email, googleId, etc).

      try {
        // --- Find or Create a User in *our* database ---
        
        // 1. Check if this Google user already exists in our DB
        let user = await User.findOne({ 'providers.googleId': profile.id });

        if (user) {
          // 2. If they exist, we're done.
          // 'done' is a passport function. This line says:
          // "No error (null), here is the user (user)"
          return done(null, user);

        } else {
          // 3. If they don't exist, create a new user in our DB
          const newUser = new User({
            email: profile.emails[0].value, // Get their email
            name: profile.displayName,       // Get their name
            providers: {
              googleId: profile.id         // Store their Google ID
            }
          });
          
          await newUser.save(); // Save the new user to MongoDB

          // 4. We're done. Pass the new user to passport.
          return done(null, newUser);
        }
      } catch (err) {
        // If anything goes wrong (e.g., database error)
        console.error(err);
        return done(err, false); // Pass the error
      }
    }
  )
);