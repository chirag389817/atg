import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { APIRoutes } from "@/app/data/APIRoutes";
import prisma from "@/app/data/prisma";

export const authOptions = {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                name: {
                    label: "Name",
                    type: "text",
                    placeholder: "Chirag Patel"
                },
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "chirag389817@gmail.com"
                },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                if (!user) throw new Error("user not found");

                const pswdMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!pswdMatch) throw new Error("Invalid password");

                return user;
            }
        })
    ],
    pages: {
        signIn: "/auth/login/"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debugger: process.env.NODE_ENV === "development"
};
