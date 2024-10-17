import { db } from "../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth } from "../firebase"; // Assuming you have Firebase Auth set up

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt?: string;
    userId: string; // Add userId field
}

const COLLECTION_NAME = "todos";

export const todoService = {
    async addTodo(text: string): Promise<Todo> {
        const createdAt = new Date().toISOString();
        const userId = auth.currentUser?.uid; // Get the current user's ID

        if (!userId) {
            throw new Error("User not authenticated");
        }

        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            text,
            completed: false,
            createdAt,
            userId, // Add userId when creating a new todo
        });
        return { id: docRef.id, text, completed: false, createdAt, userId }; // Return userId in the todo object
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
        const userId = auth.currentUser?.uid; // Get the current user's ID
        if (!userId) {
            throw new Error("User not authenticated");
        }

        // Fetch todos only for the current user
        const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const todos: Todo[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Todo));

        todos.sort((a, b) => {
            const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return bDate - aDate;
        });

        return todos;
    },
};
