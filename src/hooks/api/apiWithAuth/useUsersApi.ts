import { useState } from 'react'
import {
  UserResponse,
  UsersGroupsResponse,
  UsersResponse,
} from '../../../interfaces/apiResponsesInterface'
import { ManageUsersFormInterface } from '../../../interfaces/formsInterface'
import {
  UserResponseMapper,
  UsersResponseMapper,
  UsersGroupsResponseMapper,
} from '../../../interfaces/mappersInterface'
import { UsersMapper } from '../../../mapper/UsersMapper'
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
    const response = await getWithAuth<UserResponse>(`/users/v1/usuarios/${id}`)
    if (response && response.data && response.data.data) {
      return {
        ...response,
        data: {
          ...response.data,
          data: UsersMapper.fromApiGetUser(response.data.data),
        },
      } as {
        data: {
          data: UserResponseMapper
        }
      }
    }
    return null
  }

  const getUsers = async () => {
    const response = await getWithAuth<UsersResponse>(`/users/v1/usuarios`)
    if (response && response.data && response.data.data) {
      return {
        ...response,
        data: {
          ...response.data,
          data: UsersMapper.fromApiGetUsers(response.data.data),
        },
      } as {
        data: {
          data: UsersResponseMapper
        }
      }
    }
    return null
  }

  const createUser = async (userData: ManageUsersFormInterface) => {
    const userMapped = UsersMapper.toApiCreateUser(userData)
    const response = await postWithAuth<any>(`/users/v1/usuarios/`, userMapped)
    return response
  }

  const updateUser = async (
    userId: string,
    userData: ManageUsersFormInterface
  ) => {
    const userMapped = UsersMapper.toApiUpdateUser(userData)
    const response = await putWithAuth<any>(
      `/users/v1/usuarios/${userId}/`,
      userMapped
    )
    return response
  }

  const deleteUser = async (userId: string) => {
    const response = await deleteWithAuth<any>(`/users/v1/usuarios/${userId}/`)
    return response
  }

  const getUsersGroups = async () => {
    const response = await getWithAuth<UsersGroupsResponse[]>(
      `/users/v1/groups`
    )
    if (response && response.data && response.data.data) {
      return {
        ...response,
        data: {
          ...response.data,
          data: UsersMapper.fromApiGetUsersGroups(response.data.data),
        },
      } as {
        data: {
          data: UsersGroupsResponseMapper[]
        }
      }
    }
    return null
  }

  const getUserPermissions = async (id: string) => {
    const response = await getWithAuth<any>(
      `/users/v1/usuarios/${id}/permissions`
    )
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
