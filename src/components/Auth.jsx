import {auth, googleProvider} from '../config/firebase';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import {useState} from 'react'

export const Auth = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // console.log(auth?.currentUser?.email)

    const signIn = async () => { 
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err)
        }
        
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.error(err)
        }
    } 

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.error(err)
        }
    }

    return (
    <div>
        <label htmlFor='email'>Email: </label>
        <input id='email' onChange={(e)=> setEmail(e.target.value)}/> <br/>
        <label htmlFor='password'>Password: </label>
        <input id='password' type='password' onChange={(e) => setPassword(e.target.value)}/> <br/>
        <button onClick={signIn}>Sign in</button>
        <button onClick={logOut}>Sign out</button>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
    );
}