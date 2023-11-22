import React from "react";
import Slots from "./Slots";

export const metadata = {
    title: "Slots - ATG",
    description: "Automatic Timetable Generator"
};

function page() {
    return (
        <main>
            <Slots />
        </main>
    );
}

export default page;
