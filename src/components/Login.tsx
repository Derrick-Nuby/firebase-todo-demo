import React, { useState } from "react";
import { toast } from "react-toastify";
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
            toast.success("Logged in successfully!");
        } catch (error) {
            console.error("Login failed", error);
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authService.loginWithGoogle();
            toast.success("Logged in with Google successfully!");
        } catch (error) {
            console.error("Google login failed", error);
            toast.error("Google login failed. Please try again.");
        }
    };

    const handleGithubLogin = async () => {
        try {
            await authService.loginWithGithub();
            toast.success("Logged in with GitHub successfully!");
        } catch (error) {
            console.error("GitHub login failed", error);
            toast.error("GitHub login failed. Please try again.");
        }
    };

    return (
        <div className="mb-6">
            {isCreatingAccount ? (
                <CreateAccount
                    onAccountCreated={() => {
                        setIsCreatingAccount(false);
                        toast.success("Account created successfully! Please log in.");
                    }}
                    onLoginClick={() => setIsCreatingAccount(false)}
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
                    <button
                        onClick={handleGithubLogin}
                        className="w-full mt-4 bg-gray-800 text-white p-3 rounded hover:bg-gray-700 transition duration-200"
                    >
                        Login with GitHub
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
