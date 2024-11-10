import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../Firebase/Firebase.init';
import { useState } from 'react';


const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    console.log(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider()

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser);
            setUser(loggedInUser);
        })
        .catch(error => {
            console.log('error', error.message)
        });
        
    }

    const handleGithubSignIn = () =>{
        signInWithPopup(auth, githubProvider)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .catch(error => {
            console.log(error);
        })
    }


    const handleSignOut = () => {
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser(null);
        })
        .catch(error => {
            console.log(error)
        })
    }



    return (
        <div>


          { 
            user ?
           <button onClick={handleSignOut}>Sign out</button> :
         <>
            <button onClick={handleGoogleSignIn }>Google login</button>
            <button onClick={handleGithubSignIn}>Github Login</button>
         </>
            }
            { user && < div>
                <h3>User: {user.displayName}</h3>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;