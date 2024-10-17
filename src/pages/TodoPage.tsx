import React from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

export const TodoPage: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                Todo App
            </h1>
            <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
                <TodoForm />
                <TodoList />
            </div>
        </div>
    );
};
