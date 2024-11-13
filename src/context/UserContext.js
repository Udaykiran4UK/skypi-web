// src/context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Create the context
const UserContext = createContext();

// Hook to use UserContext easily
export const useUser = () => {
    return useContext(UserContext);
};

// Provider component to wrap around the app
export const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Fetch user details from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserDetails(userDoc.data());
                } else {
                    console.log("No user data found");
                    setUserDetails(null);
                }
            } else {
                setUserDetails(null); // Clear user details if logged out
            }
            setLoading(false); // Stop loading once data is fetched or user is logged out
        });

        // Cleanup on component unmount
        return unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ userDetails, loading }}>
            {children}
        </UserContext.Provider>
    );
};
