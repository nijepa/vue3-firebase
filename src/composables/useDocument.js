import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useDocument = (collection, id) => {
  const error = ref(null)
  const isPending = ref(false)

  let docRef = projectFirestore.collection(collection).doc(id)

  const updateDoc = async (updates) => {
    error.value = null
    isPending.value = true
    
    try {
      const res = await docRef.update(updates)
      isPending.value = false
      return res
    } catch(err) {
      error.value = err.message
      isPending.value = false
    }
  }

  const deleteDoc = async () => {
    error.value = null
    isPending.value = true
    
    try {
      const res = await docRef.delete()
      isPending.value = false
      return res
    } catch(err) {
      error.value = err.message
      isPending.value = false
    }
  }

  return { error, deleteDoc, isPending, updateDoc }
}

export default useDocument