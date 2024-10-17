import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService, Todo } from "../services/todoService";

export function useTodos() {
    const queryClient = useQueryClient();

    const todosQuery = useQuery<Todo[], Error>({
        queryKey: ["todos"],
        queryFn: todoService.getTodos,
    });

    const addTodoMutation = useMutation({
        mutationFn: todoService.addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const updateTodoMutation = useMutation({
        mutationFn: todoService.updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const deleteTodoMutation = useMutation({
        mutationFn: todoService.deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    return {
        todos: todosQuery.data ?? [],
        isLoading: todosQuery.isLoading,
        isError: todosQuery.isError,
        error: todosQuery.error,
        addTodo: addTodoMutation.mutate,
        updateTodo: updateTodoMutation.mutate,
        deleteTodo: deleteTodoMutation.mutate,
    };
}
