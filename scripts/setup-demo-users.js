const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} = require('firebase/auth');
const { getFirestore, setDoc, doc } = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const demoUsers = [
  {
    email: 'demo.admin@seodashboard.com',
    password: 'DemoAdmin123!',
    role: 'admin'
  },
  {
    email: 'demo.manager@seodashboard.com',
    password: 'DemoManager123!',
    role: 'manager'
  },
  {
    email: 'demo.writer@seodashboard.com',
    password: 'DemoWriter123!',
    role: 'writer'
  }
];

async function createDemoUser(user) {
  try {
    // Create user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    // Add user role to Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: user.email,
      role: user.role,
      createdAt: new Date().toISOString()
    });

    console.log(`Created ${user.role} user: ${user.email}`);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      // If user exists, try to sign in to verify credentials
      try {
        await signInWithEmailAndPassword(auth, user.email, user.password);
        console.log(`User already exists and credentials are valid: ${user.email}`);
      } catch (signInError) {
        console.error(`Error verifying existing user ${user.email}:`, signInError);
      }
    } else {
      console.error(`Error creating user ${user.email}:`, error);
    }
  }
}

async function setupDemoUsers() {
  for (const user of demoUsers) {
    await createDemoUser(user);
  }
  process.exit(0);
}

setupDemoUsers().catch(console.error);
