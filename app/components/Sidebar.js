"use client";

import Link from "next/link";
import React from "react";
import { APIRoutes } from "../data/APIRoutes";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathName = usePathname();
    return (
        <sidebar className={"sidebar border-r-2 border-dotted border-blue-500"}>
            {/* Sidebar Content */}
            <ul className="mt-4 grid gap-1 justify-center">
                {Object.values(APIRoutes).map(
                    (item, index) =>
                        item.inSidebar && (
                            <li
                                key={index}
                                className={`p-2 rounded-md hover:bg-slate-100 w-44 ${
                                    pathName == item.href &&
                                    "bg-slate-200 hover:bg-slate-200"
                                }`}
                            >
                                <Link className="w-full block" href={item.href}>
                                    {item.lable}
                                </Link>
                            </li>
                        )
                )}
            </ul>
        </sidebar>
    );
};

export default Sidebar;
