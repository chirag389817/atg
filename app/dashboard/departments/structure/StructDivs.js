import React, { useEffect, useState } from "react";
import { useStructureContext } from "./StructureContext";
import { FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import StructBatchs from "./StructBatchs";

function StructDivs({ propDivs, subCatId, catIdx }) {
    const struct = useStructureContext();
    return (
        <ul>
            {struct.dataStructure[catIdx].divs.map((div, divIdx) => (
                <li key={`div${divIdx}`}>
                    <details>
                        <summary className="">
                            <div className="title">
                                <input
                                    type="text"
                                    defaultValue={div.name}
                                    {...struct.register(
                                        `subCats.${subCatId}.divs.${div.id}.name`
                                    )}
                                />
                                <FaPlus
                                    className="option"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        struct.addBatch(subCatId, div.id);
                                    }}
                                />
                                <AiFillDelete
                                    className="option"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        struct.removeDiv(
                                            subCatId,
                                            divIdx,
                                            `subCats.${subCatId}.divs.${div.id}`
                                        );
                                    }}
                                />
                            </div>
                        </summary>
                        <StructBatchs
                            divIdx={divIdx}
                            divId={div.id}
                            subCatId={subCatId}
                            catIdx={catIdx}
                        />
                    </details>
                </li>
            ))}
        </ul>
    );
}

export default StructDivs;
