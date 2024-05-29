import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import userModal from "../../../../../utlis/model/user"
import connectToDB from "../../../../../utlis/connectMongo";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({session, user}) {
      await connectToDB();
      try {
        const existingUser = await userModal.findOne({ email: session?.user?.email });
        if (!existingUser) {
          const nameParts = session?.user?.name ? session?.user?.name.split(" ") : [];
          const firstName = nameParts[0] || ' ';
          const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ' ';

          await userModal.create({
            firstName: firstName,
            lastName: lastName,
            userName: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image || "https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png",
            // bio: session.user.bio || "i am in the bio" 
          });
        }
      } catch (error:any) {
        console.error("Error saving user to MongoDB:", error?.message);
      }
      // session.user.bio="bio herre";
      // console.log("Session => "+ JSON.stringify(session))

      return session;
    },

    async signIn(userDetail) {
      if (Object.keys(userDetail).length === 0) {
        return false;
      }
      return true;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/`;
    },
  },
});

export { handler as GET, handler as POST };
