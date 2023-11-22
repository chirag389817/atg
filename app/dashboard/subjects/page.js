import React from "react";
import Subjects from "./Subjects";

export const metadata = {
    title: "Subjects - ATG",
    description: "Automatic Timetable Generator"
};

function page() {
    return (
        <main>
            <Subjects />
        </main>
    );
}

export default page;
