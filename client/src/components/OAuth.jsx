import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle} from "react-icons/ai"
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
function OAuth() {
    const auth = getAuth(app)

    

    const handleGoogleClick =async(e)=>{
        e.preventDefault();
       
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({prompt:'select_account'})
            const resultsFromGoogle = await signInWithPopup(auth,provider)
            console.log("resultsFromGoogle")
        } catch (error) {
            console.log(error)
        }

    }       


  return (
    <Button type='button' gradientDuoTone={"pinkToOrange"} outline>
        <AiFillGoogleCircle className='w-6 h-6 mr-2' onClick={handleGoogleClick}/>
        Continue with Google
    </Button>
  )
}

export default OAuth
