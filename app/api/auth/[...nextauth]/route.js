import NextAuth from "next-auth";
import { authOptions } from "./options";

const auth = NextAuth(authOptions);

export { auth as GET, auth as POST };
