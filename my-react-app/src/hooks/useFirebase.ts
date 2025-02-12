// TODO: initialize firebase app
import { FirebaseApp, initializeApp } from 'firebase/app';

// TODO: initialize firebase auth
// require('firebase/auth');

import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
  signOut,
  sendPasswordResetEmail,
  browserLocalPersistence,
  setPersistence,
  onAuthStateChanged,
} from 'firebase/auth';

import { useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

setPersistence(auth, browserLocalPersistence); // whatever happens (login, register, etc.), keep the data in the browser
//can also be to sessionlocalPersistence
//can also be to nonePersistence

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user);
    console.log('User is signed in');
  } else {
    console.log('User is signed out');
  }
});

export default () => {
  const navigate = useNavigate();

  const getUserTokenAsync = async () => {
    const response = auth.currentUser
      ?.getIdToken()
      .then((idToken) => {
        return idToken.toString();
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

    return response;
  };

  const login = (emailLogin: string, password: string) => {
    return signInWithEmailAndPassword(auth, emailLogin, password)
      .then((userCredential: UserCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user?.emailVerified) {
          console.log('email verified');
          return 'success';
        } else {
          console.log('email not verified');
          navigate('/auth/verify-email');
          return 'email not verified';
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        console.log(errorCode);
        return errorCode;
      });
  };

  const register = (nickname: string, email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        const user = userCredential.user;
        console.log(auth.currentUser);
        console.log(user);
        await sendEmailVerification(user);
        console.log('sendEmailVerification');
        // Go to the login page
        user
          .getIdToken()
          .then((idToken) => {
            navigate('/auth/login');
          })
          .catch((error) => {
            console.log(error);
          });
        return { errorCode: 'success', errorMessage: 'success' };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        return { errorCode, errorMessage };
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem('User');
        console.log('logged out');
        navigate('/auth/login');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log('email sent');
        return { errorCode: 'success', errorMessage: 'success' };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        return { errorCode, errorMessage };
      });
  };

  return {
    auth,
    login,
    register,
    logout,
    getUserTokenAsync,
    resetPassword,
  };
};
