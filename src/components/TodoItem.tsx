import React from "react";
import { Todo } from "../services/todoService";
import { useTodos } from "../hooks/useTodos";

interface TodoItemProps {
    todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const { updateTodo, deleteTodo } = useTodos();

    return (
        <li className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                    className="mr-3 h-5 w-5 cursor-pointer"
                />
                <span className={todo.completed ? "line-through text-gray-500" : "text-gray-800"}>
                    {todo.text}
                </span>
            </div>
            <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition duration-200 ease-in-out"
            >
                Delete
            </button>
        </li>
    );
};
