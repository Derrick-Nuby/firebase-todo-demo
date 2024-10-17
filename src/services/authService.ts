// src/services/authService.ts
import { auth } from "../firebase"; // Adjust the import path as necessary
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const authService = {
    async register(email: string, password: string) {
        return await createUserWithEmailAndPassword(auth, email, password);
    },

    async loginWithEmail(email: string, password: string) {
        return await signInWithEmailAndPassword(auth, email, password);
    },

    async loginWithGoogle() {
        return await signInWithPopup(auth, provider);
    },

    async logout() {
        return await signOut(auth);
    },
};
