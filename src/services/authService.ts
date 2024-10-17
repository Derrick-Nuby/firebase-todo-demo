// src/services/authService.ts
import { auth } from "../firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const authService = {
    async register(email: string, password: string) {
        return await createUserWithEmailAndPassword(auth, email, password);
    },

    async loginWithEmail(email: string, password: string) {
        return await signInWithEmailAndPassword(auth, email, password);
    },

    async loginWithGoogle() {
        return await signInWithPopup(auth, googleProvider);
    },

    loginWithGithub: async () => {
        await signInWithPopup(auth, githubProvider);
    },

    async logout() {
        return await signOut(auth);
    },
};
