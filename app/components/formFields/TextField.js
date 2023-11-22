import React from "react";

function TextField({ regParams, error, ...props }) {
    return (
        <div className="my-4">
            <input
                className="p-2 rounded-xl outline outline-blue-200 placeholder:text-[1rem]"
                {...props}
                {...regParams}
            />
            {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
            )}
        </div>
    );
}

export default TextField;
