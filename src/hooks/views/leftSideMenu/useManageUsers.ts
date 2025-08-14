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
import { useCompaniesApi } from '../../api/apiWithAuth/useCompaniesApi'
import {
  showToastifyError,
  showToastifySuccess,
} from '../../../utils/showToastify'

export const useManageUsers = () => {
  // USE STATE AND HOOKS
  // isLoading PUEDE SER USADO EN BOTONES DE ACCIÓN.
  const {
    isLoading,
    error,
    getUsers,
    deleteUser,
    getUsersGroups,
    updateUser,
    createUser,
  } = useUsersApi()
  const { getCompanies } = useCompaniesApi()

  const [values, setValues] = useState<ManageUsersFormInterface>(
    resetValuesManageUserForm
  )
  const [users, setUsers] = useState<UserMapper[]>([])
  const [groups, setGroups] = useState<UsersGroupsResponseMapper[]>([])
  const [companies, setCompanies] = useState<CompanyMapper[]>([])
  const [filteredUsers, setFilteredUsers] = useState<UserMapper[]>([])
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const [isViewMode, setIsViewMode] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  //const [selectedUser, setSelectedUser] = useState<UserMapper | null>(null)
  const [openDeleteModalUser, setOpenModalDeleteUser] = useState(false)
  // loading PUEDE SER USADO EN CARGA MULTIPLES DE DATOS.
  const [loading, setLoading] = useState<boolean>(false)

  console.log('useManageUsers isLoading:', isLoading)
  console.log('useManageUsers error:', error)

  // CALLS API
  const firstLoad = async () => {
    setLoading(true)
    await Promise.all([loadUsersData(), loadGroupsData(), loadCompaniesData()])
    setLoading(false)
  }

  const loadUsersData = async () => {
    const response = await getUsers()
    if (response?.data?.data?.results) {
      setUsers(response.data.data.results)
      setFilteredUsers(response.data.data.results)
    }
  }

  const loadGroupsData = async () => {
    const response = await getUsersGroups()
    if (response?.data?.data) {
      setGroups(response.data.data)
    }
  }

  const loadCompaniesData = async () => {
    const response = await getCompanies()
    if (response?.data?.data?.results) {
      setCompanies(response.data.data.results)
    }
  }

  useEffect(() => {
    if (error) {
      ErrorHandler.logError(error as AppError)
      showToastifyError(error.details.errors[0])
    }
  }, [error])

  // FIRST LOAD
  useEffect(() => {
    firstLoad()
  }, [])

  // METHODS
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isEditMode) {
      const response = await updateUser(values.userId.toString(), values)
      if (response) {
        showToastifySuccess('Usuario actualizado con éxito')
        loadUsersData()
        setOpen(false)
        setIsEditMode(false)
        setValues(resetValuesManageUserForm)
      }
    } else {
      const response = await createUser(values)
      if (response) {
        showToastifySuccess('Usuario creado con éxito')
        loadUsersData()
        setOpen(false)
        setValues(resetValuesManageUserForm)
      }
    }
  }

  const handleConfirmDeleteUser = async () => {
    const response = await deleteUser(values.userId.toString())
    if (response) {
      showToastifySuccess('Usuario eliminado con éxito')
      setUsers((prev) => prev.filter((user) => user.id !== values.userId))
      setFilteredUsers((prev) =>
        prev.filter((user) => user.id !== values.userId)
      )
    }
    setOpenModalDeleteUser(false)
    setValues(resetValuesManageUserForm)
  }

  const handleCloseModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false)
    setIsViewMode(false)
    setIsEditMode(false)
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

  const assignValues = (user: UserMapper) => {
    setValues({
      ...values,
      userId: user.id,
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
  }

  const handleViewUserDetails = (user: UserMapper) => {
    setIsViewMode(true)
    setIsEditMode(false)
    assignValues(user)
    setOpen(true)
  }

  const handleEditUser = (user: UserMapper) => {
    setIsEditMode(true)
    setIsViewMode(false)
    assignValues(user)
    setOpen(true)
  }

  const handleDeleteUser = (user: UserMapper) => {
    assignValues(user)
    setOpenModalDeleteUser(true)
  }

  const handleCloseModalDeleteUser = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setOpenModalDeleteUser(false)
    setValues(resetValuesManageUserForm)
  }

  return {
    companies,
    filter,
    filteredUsers,
    groups,
    handleChange,
    handleChangeFilter,
    handleClickDeleteFilter,
    handleClickShowPassword,
    handleCloseModal,
    handleCloseModalDeleteUser,
    handleConfirmDeleteUser,
    handleDeleteUser,
    handleEditUser,
    handleMouseDownPassword,
    handleSubmit,
    handleViewUserDetails,
    isEditMode,
    isLoading, // PARA BOTONES
    isViewMode,
    open,
    openDeleteModalUser,
    setOpen,
    values,
    loading, // PARA CARGAS MULTIPLES
  }
}
