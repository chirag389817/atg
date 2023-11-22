import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export const chkAuth = (handler) => async (req) => {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(
            { error: "authentication failed" },
            { status: 400, statusText: "failed" }
        );
    return handler({ req, email: session.user.email });
};
