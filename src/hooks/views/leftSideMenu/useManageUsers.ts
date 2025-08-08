import { use, useEffect, useState } from 'react'
import {
  User,
  UserProfileResponse,
} from '../../../interfaces/apiResponsesInterface'
import { ManageUsersFormInterface } from '../../../interfaces/formsInterface'
import { resetValuesManageUserForm } from '../../../data/resetValuesForm'
import { useUsersApi } from '../../api/apiWithAuth/useUsersApi'

export const useManageUsers = () => {
  // HOOKS
  const { isLoading, error, getUsers, deleteUser } = useUsersApi()

  // USE STATE
  const [values, setValues] = useState<ManageUsersFormInterface>(
    resetValuesManageUserForm
  )
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users)
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [isViewMode, setIsViewMode] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [openDeleteModalUser, setOpenModalDeleteUser] = useState(false)

  // FIRST LOAD
  useEffect(() => {
    const loadUsersData = async () => {
      const response = await getUsers()
      if (response && response.data.data) {
        setUsers(response.data.data.results)
        setFilteredUsers(response.data.data.results)
      }
    }
    loadUsersData()
  }, [])

  // METHODS
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    createUser()
  }

  const createUser = async () => {
    // Logic to create a user
    // Use postWithAuth to send the request
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
          user?.username?.toLowerCase().includes(value) ||
          user?.email?.toLowerCase().includes(value)
      )
    )
  }

  const handleChange =
    (prop: keyof ManageUsersFormInterface) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      return setValues({ ...values, [prop]: event.target.value })
    }

  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user)
    setIsViewMode(true)
    setIsEditMode(false)
    setValues({
      ...values,
      userName: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      empresa: '',
      groupType: '',
    })
    setOpen(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditMode(true)
    setIsViewMode(false)
    setValues({
      ...values,
      userName: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      empresa: '',
      groupType: '',
    })
    setOpen(true)
  }

  const handleDeleteUser = (user: User) => {
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
        await deleteUser(selectedUser.id)
        setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id))
        setFilteredUsers((prev) =>
          prev.filter((user) => user.id !== selectedUser.id)
        )
        setOpenModalDeleteUser(false)
      } catch (error) {
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
  }
}
