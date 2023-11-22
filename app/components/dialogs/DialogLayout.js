import React, { useEffect } from "react";

function DialogLayout({
    isOpen,
    setIsDlgOpen,
    title,
    onSubmit,
    form,
    children
}) {
    return (
        <dialog
            id="dlg"
            className="rounded-lg p-5 shadow-2xl w-screen h-screen absolute top-0 left-0 z-20 bg-opacity-50 bg-black"
            open={isOpen}
        >
            <div className="flex justify-center mt-20">
                <form
                    id="form"
                    className="text-lg bg-white p-5 shadow-2xl rounded-md"
                    noValidate
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <h1 className="text-blue-600 text-center text-2xl relative mb-3">
                        {title}
                    </h1>
                    {children}
                    <div className="flex justify-end mt-3">
                        <input
                            className="px-4 py-2 text-blue-500 outline outline-blue-400  rounded-xl cursor-pointer hover:opacity-80"
                            type="reset"
                            value="Discard"
                            onClick={() => {
                                setIsDlgOpen(false);
                                form.reset();
                            }}
                        />
                        <input
                            name="submit"
                            className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-xl cursor-pointer hover:opacity-80"
                            type="submit"
                            value="Save"
                        />
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default DialogLayout;
