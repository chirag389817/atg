import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/data/prisma";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        // console.log({ name, email, password });

        if (!name || !email || !password)
            return new NextResponse(200, {
                error: "Missing name, email, or password"
            });

        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists)
            return NextResponse.json(
                { error: "Email alredy registered" },
                { status: 200 }
            );

        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { email, name, password: hashedPwd }
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
