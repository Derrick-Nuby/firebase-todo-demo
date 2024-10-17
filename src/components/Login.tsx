// src/components/Login.tsx
import React, { useState } from "react";
import { authService } from "../services/authService";
import { CreateAccount } from "./CreateAccount";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authService.loginWithEmail(email, password);
            // Handle successful login (e.g., redirect or show a success message)
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authService.loginWithGoogle();
            // Handle successful Google login
        } catch (error) {
            console.error("Google login failed", error);
        }
    };

    return (
        <div className="mb-6">
            {isCreatingAccount ? (
                <CreateAccount
                    onAccountCreated={() => setIsCreatingAccount(false)}
                    onLoginClick={() => setIsCreatingAccount(false)}  // Go back to login
                />
            ) : (
                <>
                    <form onSubmit={handleEmailLogin} className="flex flex-col space-y-4">
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
                            Login
                        </button>
                    </form>
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full mt-4 bg-gray-800 text-white p-3 rounded hover:bg-gray-700 transition duration-200"
                    >
                        Login with Google
                    </button>
                    <p className="text-center mt-4">
                        Don't have an account?
                        <button
                            onClick={() => setIsCreatingAccount(true)}
                            className="text-blue-600 hover:underline ml-1"
                        >
                            Create one!
                        </button>
                    </p>
                </>
            )}
        </div>
    );
};