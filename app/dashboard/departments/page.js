import prisma from "@/app/data/prisma";
import Departments from "./Departments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export const metadata = {
    title: "Departments - ATG",
    description: "Automatic Timetable Generator"
};

async function getDepartments() {
    // TODO: get departments from database
    const session = await getServerSession(authOptions);
    return await prisma.departments.findMany({
        where: {
            email: session.user.email
        },
        orderBy: {
            code: "asc"
        }
    });
}

export default async function Home() {
    const arrDepartments = await getDepartments();
    return (
        <main>
            <Departments arrDepartments={arrDepartments} />
        </main>
    );
}
