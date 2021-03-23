import { ref } from 'vue'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()

const useStorage = (folder) => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file) => {
    filePath.value = `${folder}/${user.value.uid}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
      console.log('utm', + url.value)
    } catch(err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path)

    try {
      await storageRef.delete()
    } catch(err) {
      error.value = err.message
    }
  }

  return { url, filePath, error, uploadImage, deleteImage }
}

export default useStorage