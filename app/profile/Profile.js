"use client";

import Navbar from "../components/Navbar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = ({ name, email }) => {
    const router = useRouter();
    const onLogoutClick = async () => {
        await signOut({ redirect: false });
        router.push("/");
    };
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 mt-8">
                <div className="bg-white p-8 rounded shadow flex flex-col">
                    <h1 className="text-xl font-bold mb-4 text-gray-800">
                        Profile
                    </h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
                            Name
                        </label>
                        <p className="text-gray-800">{name}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer">
                            Email
                        </label>
                        <p className="text-gray-800">{email}</p>
                    </div>
                    <div className="mb-4 self-end">
                        <button
                            className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-600 focus:outline-none mx-2"
                            onClick={onLogoutClick}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
