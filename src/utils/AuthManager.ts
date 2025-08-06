/**
 * AuthManager - Manejo centralizado de Autenticación
 *
 * Este módulo se encarga de:
 * - Almacenamiento y recuperación de tokens
 * - Limpieza de sesión
 * - Verificación de estado de autenticación
 */

import { AuthData } from '../interfaces/configInterface'

export enum ClearReason {
  USER_LOGOUT = 'USER_LOGOUT',
  SECURITY_VIOLATION = 'SECURITY_VIOLATION',
}

/**
 * AuthManager - Clase para manejar la autenticación del usuario
 * Esta clase proporciona métodos para almacenar, recuperar y limpiar datos de autenticación.
 */
export class AuthManager {
  private static readonly KEYS = {
    AUTHORIZATION: 'authorization',
    SESSION: 'session',
    REFRESH_TOKEN: 'refreshToken',
  } as const

  /**
   * Obtener token almacenado (Prioritiza localStorage sobre sessionStorage)
   */
  static getToken(): string | null {
    return (
      localStorage.getItem(this.KEYS.AUTHORIZATION) ||
      sessionStorage.getItem(this.KEYS.AUTHORIZATION)
    )
  }

  /**
   * Obtener datos de sesión almacenados
   */
  static getSession(): any | null {
    const sessionData =
      localStorage.getItem(this.KEYS.SESSION) ||
      sessionStorage.getItem(this.KEYS.SESSION)

    if (sessionData) {
      try {
        return JSON.parse(sessionData)
      } catch (error) {
        console.error('Error parsing session data:', error)
        this.clearAuth(ClearReason.SECURITY_VIOLATION)
        return null
      }
    }
    return null
  }

  /**
   * Obtener token de actualización
   */
  static getRefreshToken(): string | null {
    return (
      localStorage.getItem(this.KEYS.REFRESH_TOKEN) ||
      sessionStorage.getItem(this.KEYS.REFRESH_TOKEN)
    )
  }

  /**
   * Almacenar datos de autenticación
   */
  static storeAuth(data: AuthData, remember: boolean = false): void {
    const storage = remember ? localStorage : sessionStorage
    if (data.authorization) {
      storage.setItem(this.KEYS.AUTHORIZATION, data.authorization)
    }
    if (data.session) {
      storage.setItem(this.KEYS.SESSION, JSON.stringify(data.session))
    }
    if (data.refreshToken) {
      storage.setItem(this.KEYS.REFRESH_TOKEN, data.refreshToken)
    }
  }

  /**
   * Limpiar datos de autenticación con logging del motivo
   */
  static clearAuth(reason: ClearReason): void {
    console.log(`🔐 Clearing auth - Reason: ${reason}`)

    // Limpiar localStorage
    localStorage.removeItem(this.KEYS.AUTHORIZATION)
    localStorage.removeItem(this.KEYS.SESSION)
    localStorage.removeItem(this.KEYS.REFRESH_TOKEN)

    // Limpiar sessionStorage
    sessionStorage.removeItem(this.KEYS.AUTHORIZATION)
    sessionStorage.removeItem(this.KEYS.SESSION)
    sessionStorage.removeItem(this.KEYS.REFRESH_TOKEN)
  }

  /**
   * Verificar si el usuario está autenticado
   */
  static isAuthenticated(): boolean {
    const token = this.getToken()
    const session = this.getSession()
    const refreshToken = this.getRefreshToken()
    return !!(token && session && refreshToken)
  }

  /**
   * Obtener información del usuario actual
   */
  static getCurrentUser(): any | null {
    const session = this.getSession()
    return session
  }
}
