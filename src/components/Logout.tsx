// src/components/Logout.tsx
import React from "react";
import { authService } from "../services/authService";

export const Logout: React.FC = () => {
    const handleLogout = async () => {
        try {
            await authService.logout();
            // Handle successful logout (e.g., redirect or show a success message)
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-200 mb-4"
        >
            Logout
        </button>
    );
};
