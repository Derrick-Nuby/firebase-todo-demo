import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";

export const TodoForm: React.FC = () => {
    const [text, setText] = useState("");
    const { addTodo } = useTodos();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            addTodo(text);
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-lg rounded-lg p-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new todo"
                className="p-3 border rounded-lg mr-4 w-full focus:ring focus:ring-blue-300"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg w-full mt-3 transition duration-200 ease-in-out"
            >
                Add Todo
            </button>
        </form>
    );
};
