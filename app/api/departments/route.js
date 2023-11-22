import { NextResponse } from "next/server";
import { chkAuth } from "../chkAuth";
import prisma from "@/app/data/prisma";
import { createStructure } from "../structure/route";
import { DefaultDeptStructure } from "@/app/data/DefaultDeptStructure";

export const POST = chkAuth(async ({ req, email }) => {
    try {
        const { code, name } = await req.json();
        if (!code || !name)
            return NextResponse.json({
                status: "error",
                error: "Code and Name are required"
            });
        const dept = await prisma.departments.create({
            data: { email, code: parseInt(code), name }
        });
        return await createStructure(dept.id, DefaultDeptStructure);
    } catch (error) {
        return NextResponse.json({ status: "error", error });
    }
});

export const DELETE = chkAuth(async ({ req }) => {
    try {
        const { deptId } = await req.json();
        const deleteDept = await prisma.departments.delete({
            where: { id: deptId }
        });
        return NextResponse.json({ status: "success", deleteDept });
    } catch (error) {
        return NextResponse.json({ status: "error", error });
    }
});
