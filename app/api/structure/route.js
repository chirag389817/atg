import { NextResponse } from "next/server";
import { chkAuth } from "../chkAuth";
import prisma from "@/app/data/prisma";

export const GET = chkAuth(async ({ req }) => {
    try {
        const deptId = parseInt(req.nextUrl.searchParams.get("deptId"));
        const subCats = await prisma.subCats.findMany({
            where: { deptId },
            orderBy: {
                name: "asc"
            }
        });
        const divs = await prisma.divs.findMany({
            where: {
                subCatId: {
                    in: subCats.map(({ id }) => id)
                }
            },
            orderBy: {
                name: "asc"
            }
        });
        const batchs = await prisma.batchs.findMany({
            where: {
                divId: {
                    in: divs.map(({ id }) => id)
                }
            },
            orderBy: {
                name: "asc"
            }
        });
        return NextResponse.json({
            status: "success",
            subCats,
            divs,
            batchs
        });
    } catch (error) {
        return NextResponse.json({ status: "error from structure", error });
    }
});

export const POST = chkAuth(async ({ email, req }) => {
    try {
        const { code, name, deptId, subCats } = await req.json();
        const deleteDept = await prisma.departments.delete({
            where: {
                id: deptId
            }
        });
        const dept = await prisma.departments.create({
            data: { email, code, name }
        });
        return await createStructure(dept.id, subCats);
    } catch (error) {
        return NextResponse.json({
            status: "error ",
            src: "structure POST",
            error
        });
    }
});

export const createStructure = async (deptId, subCats) => {
    try {
        if (subCats)
            subCats
                .filter((i) => i)
                .map(async (subCat) => {
                    const newSubCat = await prisma.subCats.create({
                        data: {
                            name: subCat.name,
                            deptId
                        }
                    });
                    if (subCat.divs)
                        subCat.divs
                            .filter((i) => i)
                            .map(async (div) => {
                                const newDiv = await prisma.divs.create({
                                    data: {
                                        name: div.name,
                                        subCatId: newSubCat.id
                                    }
                                });
                                const data = div.batchs
                                    ? div.batchs
                                          .filter((i) => i)
                                          .map((batch) => {
                                              return {
                                                  name: batch.name,
                                                  divId: newDiv.id
                                              };
                                          })
                                    : [];
                                const newBatchs =
                                    await prisma.batchs.createMany({
                                        data
                                    });
                            });
                });
        return NextResponse.json({ status: "success", deptId, subCats });
    } catch (error) {
        return NextResponse.json({
            status: "error",
            src: "structure createStructure",
            error
        });
    }
};
