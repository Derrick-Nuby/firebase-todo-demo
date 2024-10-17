import { db } from "../firebase";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from "firebase/firestore";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

const COLLECTION_NAME = "todos";

export const todoService = {
    async addTodo(text: string): Promise<Todo> {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            text,
            completed: false,
        });
        return { id: docRef.id, text, completed: false };
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
        const q = query(collection(db, COLLECTION_NAME), orderBy("text"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Todo));
    },
};