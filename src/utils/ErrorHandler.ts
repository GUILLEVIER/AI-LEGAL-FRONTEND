/**
 * Configuración Centralizada de manejo de errores
 */

/*
import { AppError } from "../model_interfaces/configInterface"

export enum ErrorTypes {
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export class ErrorHandler {
  static createError(type: ErrorTypes, message: string, details?: any): AppError {
    return {
      type,
      message,
      details,
      timestamp: new Date()
    }
  }

  static logError(error: AppError): void {
    console.error(`[${error.timestamp.toISOString()}] ${error.type}: ${error.message}`, error.details)
  }

  static getUserFriendlyMessage(error: AppError): string {
    switch (error.type) {
      case ErrorTypes.NETWORK_ERROR:
        return 'Problema de conexión. Verifica tu conexión a internet.'
      case ErrorTypes.AUTH_ERROR:
        return 'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.'
      case ErrorTypes.VALIDATION_ERROR:
        return 'Los datos proporcionados no son válidos.'
      case ErrorTypes.SERVER_ERROR:
        return 'Error del servidor. Intenta nuevamente en unos minutos.'
      default:
        return 'Ocurrió un error inesperado. Intenta nuevamente.'
    }
  }
}
*/