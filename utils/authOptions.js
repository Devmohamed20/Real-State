import connectDB from "@/config/database";
import GoogleProvider from "next-auth/providers/google";
import UserModel from "@/models/UserModel";
console.log("Google provider authoptions file", process.env.GOOGLE_CLIENT_ID);
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exists
      const userExists = await UserModel.findOne({ email: profile.email });
      // 3. if not, create user
      if (!userExists) {
        // Truncate username if too long
        const username = profile.name.slice(0, 20);
        await UserModel.create({
          email: profile.email,
          username,
          image: profile.picture,
        });

        return true;
      }
      // 4. Return true to allow sign in
    },
    // session callback function that modifies the session object
    async session({ session }) {
      // 1. Get user from database
      const user = await UserModel.findOne({ email: session.user.email });
      // 2. Assign the userId from the function
      session.user.id = user._id.toString();
      // 3. Return the session
      return session;
    },
  },
};
