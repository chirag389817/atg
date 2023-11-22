import React from "react";

function AuthBtn({ name }) {
    return (
        <div className="mt-4">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
                type="submit"
            >
                {name}
            </button>
        </div>
    );
}

export default AuthBtn;
