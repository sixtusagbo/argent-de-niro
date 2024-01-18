import React from "react";
import { Outlet } from "react-router-dom";
import Menubar from "../components/menubar";

const Dashboard = () => {
    return (
        <section className="flex">
            <Menubar className="" /> {/* Set the width of the menu bar */}
            <div className="flex justify-center items-center bg-[#D9D9D9]"> {/* Use flexbox to center the content */}
                <Outlet />
            </div>
        </section>
    );
};

export default Dashboard;

