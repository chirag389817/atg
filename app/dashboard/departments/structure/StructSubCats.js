import React, { useEffect, useState } from "react";
import { useStructureContext } from "./StructureContext";
import { FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import StructDivs from "./StructDivs";

function StructSubCats() {
    const struct = useStructureContext();

    return (
        <div className="structure text-slate-700 m-4">
            <div className="flex items-center">
                <span className="rounded-md px-3 py-1 outline-blue-300 outline outline-2">
                    Sub Categories
                </span>
                <FaPlus
                    className="option"
                    style={{ display: "inline", marginLeft: "1rem" }}
                    onClick={(e) => {
                        struct.addSubCat();
                    }}
                />
            </div>
            <ul className="ml-14 mt-2">
                {struct.dataStructure.map((subCat, catIdx) => (
                    <li key={`cat${subCat.id}`}>
                        <details>
                            <summary>
                                <div className="title">
                                    <input
                                        type="text"
                                        defaultValue={subCat.name}
                                        {...struct.register(
                                            `subCats.${subCat.id}.name`
                                        )}
                                    />
                                    <FaPlus
                                        className="option"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            struct.addDiv(subCat.id);
                                        }}
                                    />
                                    <AiFillDelete
                                        className="option"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            struct.removeSubCat(
                                                catIdx,
                                                `subCats.${subCat.id}`
                                            );
                                        }}
                                    />
                                </div>
                            </summary>
                            <StructDivs subCatId={subCat.id} catIdx={catIdx} />
                        </details>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StructSubCats;
