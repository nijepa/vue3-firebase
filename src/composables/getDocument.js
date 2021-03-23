import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {

  const document = ref(null)
  const error = ref(null)

  // register the firestore collection reference
  let documentRef = projectFirestore.collection(collection).doc(id)

  const unsub = documentRef.onSnapshot(doc => {
    if (doc.data()) {
      document.value = { ...doc.data(), id: doc.id }
      error.value = null
    } else {
      error.value = 'that document does not exist'
    }
  }, err => {
    console.log(err.message)
    error.value = 'could not fetch the data'
  })

  /* eslint-disable */
  watchEffect((onInvalidate) => {
    // unsubscribe from prev collection when watcher is stoped (component unmounted)
    onInvalidate(() => unsub())
  })
  /* eslint-enable */

  return { error, document }
}

export default getDocument