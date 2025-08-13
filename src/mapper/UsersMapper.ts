import { UserUpdateRequest } from '../interfaces/apiRequestsInteface'
import {
  Company,
  User,
  UsersResponse,
  UserResponse,
  UsersGroupsResponse,
  Permission,
} from '../interfaces/apiResponsesInterface'
import { ManageUsersFormInterface } from '../interfaces/formsInterface'
import {
  UserMapper,
  UsersResponseMapper,
  UserResponseMapper,
  UsersGroupsResponseMapper,
} from '../interfaces/mappersInterface'

export const UsersMapper = {
  /**
   * Recibe un objeto de tipo ManageUsersFormInterface y lo convierte en un objeto de tipo UserUpdateRequest.
   * Esto es útil cuando necesitas enviar datos al backend en el formato que la
   * API espera para actualizar usuarios.
   * Hacia la API.
   */
  toApiUpdateUser: (data: ManageUsersFormInterface): UserUpdateRequest => ({
    username: data.userName,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    empresa: data.company.id !== 0 ? data.company.id : null, // Si la empresa es "Sin empresa", no enviamos el ID
    password: data.password,
  }),

  /**
   * Recibe un objeto de tipo ManageUsersFormInterface y lo convierte en un objeto de tipo UserUpdateRequest.
   * Esto es útil cuando necesitas enviar datos al backend en el formato que la
   * API espera para crear usuarios.
   * Hacia la API.
   */
  toApiCreateUser: (data: ManageUsersFormInterface): UserUpdateRequest => ({
    username: data.userName,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    empresa: data.company.id !== 0 ? data.company.id : null, // Si la empresa es "Sin empresa", no enviamos el ID
    password: data.password, // Para crear usuario usamos la password del formulario
  }),

  /**
   * Recibe un objeto de tipo UsersResponse y lo convierte en un objeto de tipo UsersResponseMapper.
   * Esto es útil cuando recibes datos del backend y necesitas trabajar con ellos
   * en tu aplicación.
   * Desde la API.
   */
  fromApiGetUsers: (users: UsersResponse): UsersResponseMapper => ({
    count: users.count,
    next: users.next,
    previous: users.previous,
    results: users.results.map((user: User) => ({
      id: user.id,
      userName: user.username,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      company: user.empresa
        ? {
            id: user.empresa.id,
            plan: user.empresa.plan,
            planName: user.empresa.plan_nombre,
            planPrice: user.empresa.plan_precio,
            rut: user.empresa.rut,
            name: user.empresa.nombre,
            email: user.empresa.correo,
            creationDate: user.empresa.fecha_creacion,
          }
        : null,
      group: user.grupos,
    })),
  }),

  /**
   * Recibe un objeto de tipo UserResponse y lo convierte en un objeto de tipo UserResponseMapper.
   * Esto es útil cuando recibes datos del backend y necesitas trabajar con ellos
   * en tu aplicación.
   * Desde la API.
   */
  fromApiGetUser: (user: UserResponse): UserResponseMapper => ({
    id: user.id,
    name: user.name,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    company: user.empresa
      ? {
          id: user.empresa.id,
          plan: user.empresa.plan,
          planName: user.empresa.plan_nombre,
          planPrice: user.empresa.plan_precio,
          rut: user.empresa.rut,
          name: user.empresa.nombre,
          email: user.empresa.correo,
          creationDate: user.empresa.fecha_creacion,
        }
      : null,
  }),

  fromApiGetUsersGroups: (
    groups: UsersGroupsResponse[]
  ): UsersGroupsResponseMapper[] => {
    return groups.map((group: UsersGroupsResponse) => ({
      id: group.id,
      name: group.name,
      permissions: group.permissions.map((permission: Permission) => ({
        codename: permission.codename,
        contentType: permission.content_type,
        id: permission.id,
        name: permission.name,
      })),
    }))
  },
}
