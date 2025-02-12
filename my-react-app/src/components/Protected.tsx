import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

import useFirebase from '../hooks/useFirebase';
import { useNavigate } from 'react-router-dom';

interface DelayedNavigationProps {
    children: React.ReactNode;
}

const DelayedNavigation: React.FC<DelayedNavigationProps> = ({ children }) => {
    const Navigate = useNavigate();
    const [navigate, setNavigate] = useState(false);

    const { auth } = useFirebase();


    useEffect(() => {

        // Check if the user is already logged-in in the cache
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.emailVerified) {
                    console.log("User is signed in");
                    setNavigate(true);
                } else {
                    console.log("User is not verified");
                    Navigate('/auth/login');
                }
            } else {
                Navigate('/auth/login');
            }
        });
    }, [])

    return navigate ? <>{children}</> : <div>Loading....</div>
};

export default DelayedNavigation;

