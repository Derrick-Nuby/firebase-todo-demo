import React from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
    const { todos, isLoading, isError, error } = useTodos();

    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
    if (isError && error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <ul className="mt-6">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};
