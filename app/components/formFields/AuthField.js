import React from "react";

function AuthField({ className, form, ...props }) {
    // console.log(props);
    // console.log(register);
    // console.log(className);

    const lcName = props.name.toLowerCase();

    const id = props.id || lcName;
    const type = props.type || lcName;
    const { register, formState } = form;
    const { errors } = formState;

    const pattern = {
        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: "Invalid email address"
    };

    const regParams = register(lcName, {
        required: `${props.name} is required`,
        ...(type === "email" && { pattern })
    });

    return (
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
                htmlFor={id}
            >
                {props.name}
            </label>
            <input
                className="w-full p-2 border border-gray-300 rounded"
                id={id}
                type={type}
                {...props}
                {...regParams}
            />
            <p className="text-red-500 text-xs mt-1">
                {errors[lcName]?.message}
            </p>
        </div>
    );
}

export default AuthField;
