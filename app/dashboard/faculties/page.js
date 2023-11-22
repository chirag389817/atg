import React from "react";
import Faculties from "./Faculties";

export const metadata = {
    title: "Faculties - ATG",
    description: "Automatic Timetable Generator"
};

function page() {
    return (
        <main>
            <Faculties />
        </main>
    );
}

export default page;
