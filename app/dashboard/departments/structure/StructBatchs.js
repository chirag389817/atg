import React from "react";
import { useStructureContext } from "./StructureContext";
import { FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function StructBatchs({ divIdx, divId, subCatId, catIdx }) {
    const struct = useStructureContext();
    return (
        <ul>
            {struct.dataStructure[catIdx].divs[divIdx].batchs.map(
                (batch, batchIdx) => (
                    <li className="batch" key={`batch${batchIdx}`}>
                        <div className="title">
                            <input
                                type="text"
                                defaultValue={batch.name}
                                {...struct.register(
                                    `subCats.${subCatId}.divs.${divId}.batchs.${batch.id}.name`
                                )}
                            />
                            <AiFillDelete
                                className="option"
                                onClick={(e) => {
                                    e.preventDefault();
                                    struct.removeBatch(
                                        subCatId,
                                        divId,
                                        batchIdx,
                                        `subCats.${subCatId}.divs.${divId}.batchs.${batch.id}`
                                    );
                                }}
                            />
                        </div>
                    </li>
                )
            )}
        </ul>
    );
}

export default StructBatchs;
