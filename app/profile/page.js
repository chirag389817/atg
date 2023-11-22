import React from "react";
import Profile from "./Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { PrismaClient } from "@prisma/client";

export const metadata = {
    title: "Profile - ATG",
    description: "Your profile on ATG"
};

const prisma = new PrismaClient();

async function page() {
    const session = await getServerSession(authOptions);
    return (
        <div>
            <Profile name={session.user.name} email={session.user.email} />
        </div>
    );
}

export default page;
