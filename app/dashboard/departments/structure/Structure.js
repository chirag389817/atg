"use client";

import React from "react";
import "./Structure.css";
import StructureContext, { useStructureContext } from "./StructureContext";
import StructSubCats from "./StructSubCats";

function Structure() {
    const struct = useStructureContext();
    return (
        <>
            <input
                className="bg-red-500 text-white self-end px-5 py-2 rounded-md w-fit cursor-pointer hover:opacity-70"
                type="submit"
                value="Save"
            />
            <div className="flex m-4 items-center">
                <label className="mr-2" htmlFor="code">
                    Code:{" "}
                </label>
                <input
                    className="p-1 rounded-xl outline outline-blue-50 w-14 mr-10"
                    type="number"
                    defaultValue={struct.deptDetails.code}
                    id="code"
                    disabled
                />
                <label className="mr-2" htmlFor="name">
                    Name:{" "}
                </label>
                <input
                    className="p-1 rounded-xl outline outline-blue-200"
                    type="text"
                    defaultValue={struct.deptDetails.name}
                    {...struct.register("name")}
                    id="name"
                />
            </div>
            <StructSubCats />
        </>
    );
}

export default ({ ...props }) => {
    return (
        <StructureContext {...props}>
            <Structure />
        </StructureContext>
    );
};
