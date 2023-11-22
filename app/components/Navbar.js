"use client";

import Link from "next/link";
import { BsPersonCircle } from "react-icons/bs";
import { APIRoutes } from "../data/APIRoutes";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 flex items-center shadow-sm shadow-blue-500 sticky top-0">
            <div className="max-w-7xl mx-auto px-3 w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-white text-xl font-bold font-serif"
                        >
                            ATG
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link
                            href={APIRoutes.profile.href}
                            className="text-white mr-5"
                        >
                            <BsPersonCircle className="text-white text-4xl p-2 hover:bg-blue-400 cursor-pointer" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
