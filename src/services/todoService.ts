import { db } from "../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt?: string; // Optional createdAt field
}

const COLLECTION_NAME = "todos";

export const todoService = {
    async addTodo(text: string): Promise<Todo> {
        const createdAt = new Date().toISOString(); // Create a timestamp
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            text,
            completed: false,
            createdAt, // Add createdAt field
        });
        return { id: docRef.id, text, completed: false, createdAt }; // Return createdAt in the todo object
    },

    async updateTodo(todo: Todo): Promise<void> {
        const todoRef = doc(db, COLLECTION_NAME, todo.id);
        await updateDoc(todoRef, { text: todo.text, completed: todo.completed });
    },

    async deleteTodo(id: string): Promise<void> {
        const todoRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(todoRef);
    },

    async getTodos(): Promise<Todo[]> {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const todos: Todo[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Todo));

        // Sort todos by createdAt, placing those without createdAt at the bottom
        todos.sort((a, b) => {
            const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0; // Treat missing createdAt as 0
            const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0; // Treat missing createdAt as 0
            return bDate - aDate; // Descending order
        });

        return todos;
    },
};
