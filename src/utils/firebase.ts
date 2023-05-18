import { FirebaseOptions, initializeApp } from "firebase/app";
import {
    getAuth,
    signOut as authSignOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCredential as signInWithStoredCredential,
    onAuthStateChanged,
    User,
    AuthCredential,
    updateProfile as updateProfileFirebase,
    indexedDBLocalPersistence,
} from "firebase/auth";
import {
    CollectionReference,
    DocumentReference,
    Timestamp,
    collection,
    deleteDoc,
    doc,
    getFirestore,
    setDoc,
} from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyCiXrzm7uTRUP65jrAAoANqTwvHAT97mRI",
    authDomain: "react-project-f7c8b.firebaseapp.com",
    projectId: "react-project-f7c8b",
    storageBucket: "react-project-f7c8b.appspot.com",
    messagingSenderId: "836682853510",
    appId: "1:836682853510:web:d2bc49d9533c50bdd07507",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = async (
    email: string,
    password: string,
    remembered: boolean
) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (remembered) {
        auth.setPersistence(indexedDBLocalPersistence);
    }
    return response;
};
export const updateProfile = (displayName: string) => {
    const user = auth.currentUser;
    if (user) {
        updateProfileFirebase(user, { displayName });
    }
};

export const signInWithCredential = (credential: AuthCredential) =>
    signInWithStoredCredential(auth, credential);

export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
    onAuthStateChanged(auth, callback);

export type Location = {
    lat: number;
    lng: number;
    city: string;
    createdAt: Timestamp;
};

const db = getFirestore();

export const userSavedLocations = (userId: string) =>
    collection(
        db,
        "users",
        userId,
        "favorites"
    ) as CollectionReference<Location>;

export const userSavedLocationDocument = (userId: string) =>
    doc(userSavedLocations(userId)) as DocumentReference<Location>;

export const addSavedLocation = async (
    userId: string,
    location: Omit<Location, "createdAt">
) =>
    await setDoc(doc(db, "users", userId, "favorites", location.city), {
        ...location,
        createdAt: Timestamp.now(),
    });

export const deleteSavedLocation = async (
    userId: string,
    location: Omit<Location, "createdAt">
) => {
    await deleteDoc(doc(db, "users", userId, "favorites", location.city));
};
