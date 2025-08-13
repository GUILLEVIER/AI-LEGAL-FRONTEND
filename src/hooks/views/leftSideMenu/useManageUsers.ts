import { useEffect, useState } from 'react'
import { ManageUsersFormInterface } from '../../../interfaces/formsInterface'
import { resetValuesManageUserForm } from '../../../data/resetValuesForm'
import { useUsersApi } from '../../api/apiWithAuth/useUsersApi'
import { ErrorHandler } from '../../../utils/ErrorHandler'
import { AppError } from '../../../interfaces/configInterface'
import {
  CompanyMapper,
  UserMapper,
  UsersGroupsResponseMapper,
} from '../../../interfaces/mappersInterface'
import { useApiWithAuth } from '../../utils/useApiWithAuth'
import { useCompaniesApi } from '../../api/apiWithAuth/useCompaniesApi'

export const useManageUsers = () => {
  // HOOKS
  const { isLoading, error } = useApiWithAuth()
  const { getUsers, deleteUser, getUsersGroups, updateUser, createUser } =
    useUsersApi()
  const { getCompanies } = useCompaniesApi()

  // USE STATE
  const [values, setValues] = useState<ManageUsersFormInterface>(
    resetValuesManageUserForm
  )
  const [users, setUsers] = useState<UserMapper[]>([])
  const [groups, setGroups] = useState<UsersGroupsResponseMapper[]>([])
  const [companies, setCompanies] = useState<CompanyMapper[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserMapper[]>(users)
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [isViewMode, setIsViewMode] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserMapper | null>(null)
  const [openDeleteModalUser, setOpenModalDeleteUser] = useState(false)

  // CALLS API
  const loadUsersData = async () => {
    try {
      const response = await getUsers()
      if (response?.data?.data?.results) {
        setUsers(response.data.data.results)
        setFilteredUsers(response.data.data.results)
      }
    } catch (error) {
      ErrorHandler.logError(error as AppError)
      console.error('Error loading users:', error)
    }
  }

  const loadGroupsData = async () => {
    try {
      const response = await getUsersGroups()
      if (response?.data?.data) {
        setGroups(response.data.data)
      }
    } catch (error) {
      ErrorHandler.logError(error as AppError)
      console.error('Error loading groups:', error)
    }
  }

  const loadCompaniesData = async () => {
    try {
      const response = await getCompanies()
      if (response?.data?.data?.results) {
        setCompanies(response.data.data.results)
      }
    } catch (error) {
      ErrorHandler.logError(error as AppError)
      console.error('Error loading companies:', error)
    }
  }

  // FIRST LOAD
  useEffect(() => {
    loadUsersData()
    loadGroupsData()
    loadCompaniesData()
  }, [])

  // METHODS
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isEditMode && selectedUser) {
      try {
        const response = await updateUser(selectedUser.id.toString(), values)
        if (response) {
          loadUsersData()
          setOpen(false)
          setIsEditMode(false)
          setSelectedUser(null)
          setValues(resetValuesManageUserForm)
        }
      } catch (error) {
        ErrorHandler.logError(error as AppError)
        console.error('Error updating user:', error)
      }
    } else {
      try {
        const response = await createUser(values)
        if (response) {
          loadUsersData()
          setOpen(false)
          setValues(resetValuesManageUserForm)
        }
      } catch (error) {
        ErrorHandler.logError(error as AppError)
        console.error('Error creating user:', error)
      }
    }
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false)
    setIsViewMode(false)
    setIsEditMode(false)
    setSelectedUser(null)
    setValues(resetValuesManageUserForm)
  }

  const handleClickDeleteFilter = () => {
    setFilter('')
    setFilteredUsers(users)
  }

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    if (!value) {
      setFilter('')
      setFilteredUsers(users)
      return
    }
    setFilter(value)
    setFilteredUsers((prev) =>
      prev.filter(
        (user) =>
          user?.userName?.toLowerCase().includes(value) ||
          user?.email?.toLowerCase().includes(value)
      )
    )
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handleChange =
    (prop: keyof ManageUsersFormInterface) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (prop === 'company') {
        return setValues({
          ...values,
          [prop]: {
            id: Number(event.target.value),
            name:
              companies.find(
                (company) => company.id === Number(event.target.value)
              )?.name || 'Sin empresa',
          },
        })
      }
      return setValues({ ...values, [prop]: event.target.value })
    }

  const handleViewUserDetails = (user: UserMapper) => {
    setSelectedUser(user)
    setIsViewMode(true)
    setIsEditMode(false)
    setValues({
      ...values,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      company: {
        name: user.company?.name || 'Sin empresa',
        id: user.company?.id || 0,
      },
      group: user.group || 'Sin grupo',
    })
    setOpen(true)
  }

  const handleEditUser = (user: UserMapper) => {
    setSelectedUser(user)
    setIsEditMode(true)
    setIsViewMode(false)
    setValues({
      ...values,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      company: {
        name: user.company?.name || 'Sin empresa',
        id: user.company?.id || 0,
      },
      group: user.group || 'Sin grupo',
    })
    setOpen(true)
  }

  const handleDeleteUser = (user: UserMapper) => {
    setSelectedUser(user)
    setOpenModalDeleteUser(true)
  }

  const handleCloseModalDeleteUser = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpenModalDeleteUser(false)
    setSelectedUser(null)
  }

  const handleConfirmDeleteUser = async () => {
    if (selectedUser) {
      try {
        const response = await deleteUser(selectedUser.id.toString())
        if (response) {
          setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id))
          setFilteredUsers((prev) =>
            prev.filter((user) => user.id !== selectedUser.id)
          )
        }
        setOpenModalDeleteUser(false)
        setSelectedUser(null)
      } catch (error) {
        ErrorHandler.logError(error as AppError)
        console.error('Error deleting user:', error)
      }
    }
  }

  return {
    isLoading,
    error,
    open,
    setOpen,
    handleSubmit,
    handleCloseModal,
    users,
    filteredUsers,
    setFilteredUsers,
    handleClickDeleteFilter,
    handleChangeFilter,
    filter,
    values,
    handleChange,
    isViewMode,
    setIsViewMode,
    isEditMode,
    setIsEditMode,
    selectedUser,
    handleViewUserDetails,
    handleEditUser,
    handleCloseModalDeleteUser,
    openDeleteModalUser,
    handleConfirmDeleteUser,
    setOpenModalDeleteUser,
    handleDeleteUser,
    groups,
    companies,
    handleClickShowPassword,
    handleMouseDownPassword,
  }
}
