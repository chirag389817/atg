"use client";

import NewDept from "@/app/components/dialogs/NewDept";
import { APIRoutes } from "@/app/data/APIRoutes";
import React, { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

function Departments({ arrDepartments }) {
    const [isDlgOpen, setIsDlgOpen] = useState(false);
    const [departments, setDepartments] = useState(arrDepartments);
    const deleteDept = async (deptId) => {
        let res = await fetch(APIRoutes.api.departments, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ deptId })
        });
        const result = await res.json();
        if (result.error) {
            console.log(result);
        } else {
            setDepartments(departments.filter((dept) => dept.id != deptId));
        }
    };
    return (
        <>
            <NewDept isOpen={isDlgOpen} setIsDlgOpen={setIsDlgOpen} />
            <BiPlusCircle
                className="absolute bottom-0 right-0 text-white text-6xl bg-blue-500 mx-7 my-7 p-2 rounded-full z-10 hover:opacity-70 cursor-pointer"
                onClick={(e) => setIsDlgOpen(true)}
            />
            <div className="grid grid-cols-3 gap-4 mx-auto p-4 max-w-4xl">
                {departments.map((dept, idx) => (
                    <div
                        className="cursor-pointer outline outline-blue-200 p-2 rounded-md hover:bg-blue-500 hover:text-white hover:opacity-80 flex items-center"
                        key={idx}
                    >
                        <a
                            className="flex-grow"
                            href={
                                APIRoutes.departments.structure +
                                "?deptId=" +
                                dept.id
                            }
                        >
                            <span className="font-bold">{dept.code}</span>
                            &nbsp; {dept.name}
                        </a>
                        <AiFillDelete
                            className="p-1.5 rounded-md hover:text-red-600 hover:bg-slate-200  text-3xl"
                            onClick={(e) => {
                                deleteDept(dept.id);
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Departments;
