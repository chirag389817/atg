import React, { useEffect, useRef } from "react";
import DialogLayout from "./DialogLayout";
import { useForm } from "react-hook-form";
import TextField from "../formFields/TextField";
import { APIRoutes } from "@/app/data/APIRoutes";

function NewDept({ isOpen, setIsDlgOpen }) {
    const form = useForm();
    const { register, formState, setError } = form;
    const { errors } = formState;

    const onSubmit = async (data) => {
        let res = await fetch(APIRoutes.api.departments, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ ...data })
        });
        const result = await res.json();
        if (result.error) {
            console.log(result);
            if (result.error.code === "P2002") {
                setError("code", {
                    type: "manual",
                    message: "code already exists"
                });
            }
        } else {
            //TODO: redirect to /departments/details
            console.log(result);
            document.location.href = `/dashboard/departments/structure?deptId=${result.deptId}`;
        }
    };

    return (
        <DialogLayout
            isOpen={isOpen}
            setIsDlgOpen={setIsDlgOpen}
            onSubmit={onSubmit}
            form={form}
            title="Add Department"
        >
            <TextField
                regParams={register("code", {
                    required: "Code is required"
                })}
                error={errors["code"]}
                type="number"
                placeholder="Code: 028"
            />
            <TextField
                regParams={register("name", {
                    required: "Name is required"
                })}
                error={errors["name"]}
                type="text"
                placeholder="Name: Computer Engineering"
            />
        </DialogLayout>
    );
}

export default NewDept;
