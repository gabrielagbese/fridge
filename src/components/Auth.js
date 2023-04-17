import {auth, googleProvider} from "../config/firebase"
import {signInWithPopup, signOut} from "firebase/auth"

export const Auth = () => {

    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (err) {
            console.log(err)
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
    }

    console.log(auth?.currentUser?.displayName)

    return(
        <div className="controls-top">
            <p className="hello-name">Hello</p>
            <p>{auth?.currentUser?.displayName}</p>
            <button className="log-in" onClick={signInGoogle}>in</button>
			<button className="log-out" onClick={logout}>out</button>
        </div>
    )
}