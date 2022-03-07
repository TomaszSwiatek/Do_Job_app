import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // after we ve got UID in auth proccess we can use it:
      // upload user thumbnail
      // create upload path:
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      // uploading image
      const img = await projectStorage.ref(uploadPath).put(thumbnail) //firstly we give reference path, then what we gonna put to this path (directory). this give us an response we encaps in var called img.
      // from this object which we get back from fb.stor we can get for example image url wich we want to update our profile next:
      const imgUrl = await img.ref.getDownloadURL()

      // add display name to user, and photoURL.
      await res.user.updateProfile({ displayName, photoURL: imgUrl })

      //create a user firestore document - so we later can grab this data of each user to show it on app (not only the one user that is at now logged in - in global context)
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}