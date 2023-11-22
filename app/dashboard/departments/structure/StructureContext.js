import { APIRoutes } from "@/app/data/APIRoutes";
import { DefaultDeptStructure } from "@/app/data/DefaultDeptStructure";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const structContext = createContext({});

export const useStructureContext = () => useContext(structContext);

function StructureContext({ deptDetails, children }) {
    const form = useForm();
    const { register, unregister, formState, setError, setValue } = form;
    const { errors } = formState;

    const [dataStructure, setDataStructure] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `http://localhost:3000/api/structure?deptId=${deptDetails.id}`
            );
            const result = await response.json();
            console.log(result);
            const grpDivs = Object.groupBy(
                result.divs,
                ({ subCatId }) => subCatId
            );
            if (result.status === "error") return;
            const grpBatchs = Object.groupBy(
                result.batchs,
                ({ divId }) => divId
            );
            const data = result.subCats.map((cat) => {
                cat.divs = grpDivs[cat.id];
                if (!cat.divs) cat.divs = [];
                cat.divs.map((div) => {
                    div.batchs = grpBatchs[div.id];
                    if (!div.batchs) div.batchs = [];
                    return div;
                });
                return cat;
            });
            setDataStructure(data);
        })();
        // setDataStructure(DefaultDeptStructure);
    }, []);

    const createId = (arr) => {
        if (arr.length == 0) return 1;
        const lastId = Math.max(...arr.map((i) => i.id));
        console.log(arr.map((i) => i.id));
        console.log(lastId);
        return lastId + 1;
    };

    const addSubCat = () => {
        setDataStructure([
            ...dataStructure,
            {
                id: createId(dataStructure),
                name: "New Cat",
                divs: []
            }
        ]);
    };

    const removeSubCat = (idx, rName) => {
        unregister(rName);
        setDataStructure(dataStructure.filter((item, i) => i != idx));
    };

    const addDiv = (catId) => {
        setDataStructure(
            dataStructure.map((subCat) => {
                if (subCat.id != catId) return subCat;
                subCat.divs.push({
                    id: createId(subCat.divs),
                    name: "New Div",
                    batchs: []
                });
                return subCat;
            })
        );
    };

    const removeDiv = (catId, divIdx, rName) => {
        unregister(rName);
        setDataStructure(
            dataStructure.map((subCat) => {
                if (subCat.id != catId) return subCat;
                subCat.divs = subCat.divs.filter((div, i) => i != divIdx);
                return subCat;
            })
        );
    };

    const addBatch = (catId, divId) => {
        setDataStructure(
            dataStructure.map((subCat) => {
                if (subCat.id != catId) return subCat;
                subCat.divs = subCat.divs.map((div) => {
                    if (div.id != divId) return div;
                    div.batchs.push({
                        id: createId(div.batchs),
                        name: "New Batch"
                    });
                    return div;
                });
                return subCat;
            })
        );
    };

    const removeBatch = (catId, divId, batchIdx, rName) => {
        unregister(rName);
        setDataStructure(
            dataStructure.map((subCat) => {
                if (subCat.id != catId) return subCat;
                subCat.divs = subCat.divs.map((div) => {
                    if (div.id != divId) return div;
                    div.batchs = div.batchs.filter((batch, i) => i != batchIdx);
                    return div;
                });
                return subCat;
            })
        );
    };

    const handleSubmit = async (data) => {
        data.deptId = deptDetails.id;
        data.code = deptDetails.code;
        console.log(data);
        let res = await fetch(APIRoutes.api.structure, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.error) {
            console.log(result);
        } else {
            console.log(result);
            document.location.href = APIRoutes.departments.href;
        }
    };

    return (
        <structContext.Provider
            value={{
                deptDetails,
                form,
                register,
                dataStructure,
                addSubCat,
                removeSubCat,
                addDiv,
                removeDiv,
                addBatch,
                removeBatch
            }}
        >
            <form
                className="p-4 flex flex-col"
                noValidate
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                {children}
            </form>
        </structContext.Provider>
    );
}

export default StructureContext;
