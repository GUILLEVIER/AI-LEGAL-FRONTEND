import { UserReponse } from '../../../interfaces/apiResponsesInterface'
import { useApiWithAuth } from '../../utils/useApiWithAuth'

/**
 * API calls for user management
 * Aqui se llamaran las funciones para manejar a los usuarios en la API.
 */
export const useUsersApi = () => {
  const {
    isLoading,
    error,
    getWithAuth,
    postWithAuth,
    putWithAuth,
    deleteWithAuth,
  } = useApiWithAuth()
  const getUser = async (id: string) => {
    const response = await getWithAuth<UserReponse>(`/users/v1/${id}`)
    return response
  }
  const getUsers = async () => {
    const response = await getWithAuth<any>(`/users/v1`)
    return response
  }
  const createUser = async (userData) => {
    const response = await postWithAuth<any>(`/users/v1`, userData)
    return response
  }
  const updateUser = async (userId, userData) => {
    // Logic to update a user
  }
  const deleteUser = async (userId) => {
    // Logic to delete a user
  }
  const getUsersGroups = async () => {
    const response = await getWithAuth<any>(`/users/v1/groups`)
    return response
  }
  const getUserPermissions = async (id: string) => {
    const response = await getWithAuth<any>(`/users/v1/${id}/permissions`)
    return response
  }

  return {
    isLoading,
    error,
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUsersGroups,
    getUserPermissions,
  }
}
