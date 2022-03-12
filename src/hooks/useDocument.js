import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'

export const useDocument = (collection, id) => {

    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for a document
    useEffect(() => {

        const ref = projectFirestore.collection(collection).doc(id)

        // snapshot.data() represents a single document
        const unsubscribe = ref.onSnapshot((snapshot) => {
            // if we have data on snapshot - if particular id exist
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            } else {
                setError('No such document exists')
            }
        }, (err) => {
            console.log(err.message)
            setError('failed to get document')
        })
        // clean up function which fire when component unmount
        return () => unsubscribe()
    }, [collection, id])

    return { document, error }
}