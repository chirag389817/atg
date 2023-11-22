import React from "react";
import prisma from "@/app/data/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Structure from "./Structure";

export const metadata = {
    title: "Structure of Department - ATG",
    description: "Department Structure - ATG"
};

async function getDepartmentDetails(deptId) {
    if (!deptId) return false;
    return await prisma.departments.findUnique({
        where: { id: parseInt(deptId) }
    });
}

async function page({ searchParams }) {
    const deptDetails = await getDepartmentDetails(searchParams.deptId);
    return (
        <main>
            {deptDetails ? (
                <Structure deptDetails={deptDetails} />
            ) : (
                <h1 className="h-full grid place-content-center text-3xl text-slate-400">
                    No department found
                </h1>
            )}
        </main>
    );
}

export default page;
