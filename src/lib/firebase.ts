import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with the custom databaseId if configured
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);
export default app;
