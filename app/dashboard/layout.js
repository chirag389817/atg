import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const metadata = {
    title: "Dashboard - ATG",
    description: "Automatic Timetable Generator"
};

function layout({ children }) {
    return (
        <div className="dashboard-layout">
            <Navbar />
            <Sidebar />
            {children}
        </div>
    );
}

export default layout;
