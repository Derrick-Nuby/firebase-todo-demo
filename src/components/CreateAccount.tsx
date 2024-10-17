// src/components/CreateAccount.tsx
import React, { useState } from "react";
import { authService } from "../services/authService";
import { toast } from "react-toastify";

export const CreateAccount: React.FC<{ onAccountCreated: () => void; onLoginClick: () => void; }> = ({ onAccountCreated, onLoginClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.register(email, password);
            toast.success("Account created successfully!");
            onAccountCreated();
        } catch (error) {
            console.error("Registration failed", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Create Account</h2>
            <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
                >
                    Create Account
                </button>
                <p className="text-center">
                    Already have an account?{" "}
                    <span
                        onClick={onLoginClick}
                        className="text-blue-500 font-semibold cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};
