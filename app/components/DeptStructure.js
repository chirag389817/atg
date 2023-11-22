"use client";

import "./DeptStructure.css";
import { FaPlus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function DeptStructure({ subCats, divs }) {
    return (
        <div className="structure text-slate-700">
            <ul>
                {subCats.map((subCat, catIdx) => (
                    <li key={catIdx}>
                        <details>
                            <summary className="">
                                <div className="title">
                                    <input
                                        type="text"
                                        defaultValue={subCat.name}
                                    />
                                    <FaPlus className="option" />
                                    <AiFillDelete className="option" />
                                </div>
                            </summary>
                            <ul>
                                {divs.map((div, divIdx) => (
                                    <li key={divIdx}>
                                        <details>
                                            <summary>{div.name}</summary>
                                        </details>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DeptStructure;
