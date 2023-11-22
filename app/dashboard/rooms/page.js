import React from "react";
import Rooms from "./Rooms";

export const metadata = {
    title: "Rooms - ATG",
    description: "Automatic Timetable Generator"
};

function page() {
    return (
        <main>
            <Rooms />
        </main>
    );
}

export default page;
