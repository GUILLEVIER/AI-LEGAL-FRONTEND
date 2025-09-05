/**
 * Configuración Centralizada de manejo de errores
 */

import { AxiosError } from 'axios'
import { ApiGenericResponse, AppError } from '@/interfaces/configInterface'

export enum ErrorTypes {
  VALIDATION_ERROR = 'ERR_BAD_REQUEST',
  AUTH_ERROR = 'ERR_UNAUTHORIZED',
  FORBIDDEN_ERROR = 'ERR_FORBIDDEN',
  NOT_FOUND_ERROR = 'ERR_NOT_FOUND',
  SERVER_ERROR = 'ERR_INTERNAL_SERVER',
}

export class ErrorHandler {
  static createError(
    type: ErrorTypes,
    message: string,
    status: number,
    details: any
  ): AppError {
    return {
      type,
      status,
      message,
      details,
      timestamp: new Date().toISOString(),
    }
  }

  static logError(error: AppError): void {
    console.error(
      `[${error.timestamp}] ${error.type}: ${error.message}`,
      error.details
    )
  }

  static getUserFriendlyMessage(error: AppError): string {
    switch (error.type) {
      case ErrorTypes.AUTH_ERROR:
        return 'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.'
      case ErrorTypes.VALIDATION_ERROR:
        return 'Los datos proporcionados no son válidos.'
      case ErrorTypes.FORBIDDEN_ERROR:
        return 'No tienes permisos para realizar esta acción.'
      case ErrorTypes.NOT_FOUND_ERROR:
        return 'El recurso solicitado no fue encontrado.'
      case ErrorTypes.SERVER_ERROR:
        return 'Error del servidor. Intenta nuevamente en unos minutos.'
      default:
        return 'Ocurrió un error inesperado. Intenta nuevamente.'
    }
  }

  static mapAxiosErrorToAppError = (error: AxiosError): AppError => {
    console.error('Error captured by ErrorHandler (AxiosError):', error)
    const status = error.response?.status || 500
    const message = error.message || 'Error desconocido'
    const details: ApiGenericResponse = (error.response
      ?.data as ApiGenericResponse) || {
      data: null,
      message: 'No se proporcionaron detalles',
      status: 'error',
      code: 'UNKNOWN_ERROR',
      http_status: status,
      errors: [],
    }

    switch (status) {
      case 400:
        // (Errores de validación o datos incorrectos enviados por el cliente)
        return this.createError(
          ErrorTypes.VALIDATION_ERROR,
          message,
          status,
          details
        )
      case 401:
        // (No autorizado, credenciales inválidas o no enviadas)
        return this.createError(ErrorTypes.AUTH_ERROR, message, status, details)
      case 403:
        // (Prohibido, el usuario no tiene permisos)
        return this.createError(
          ErrorTypes.FORBIDDEN_ERROR,
          message,
          status,
          details
        )
      case 404:
        // (No encontrado, recurso inexistente)
        return this.createError(
          ErrorTypes.NOT_FOUND_ERROR,
          message,
          status,
          details
        )
      case 500:
      default:
        // (Error interno del servidor o cualquier otro error no mapeado)
        return this.createError(
          ErrorTypes.SERVER_ERROR,
          message,
          status,
          details
        )
    }
  }
}
