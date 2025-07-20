import { HttpClient } from './HttpClient'
import { Services } from './Services'

/**
 * Factory para crear instancias de servicios
 * Implementa el patrón Singleton para HttpClient y Services
 * Crea una única instancia de HttpClient y Services
 */
class ApiFactory {
  private static httpClientInstance: HttpClient | null = null
  private static servicesInstance: Services | null = null

  static getHttpClient(): HttpClient {
    if (!this.httpClientInstance) {
      this.httpClientInstance = new HttpClient()
    }
    return this.httpClientInstance
  }

  static getServices(): Services {
    if (!this.servicesInstance) {
      const httpClient = this.getHttpClient()
      this.servicesInstance = new Services(httpClient)
    }
    return this.servicesInstance
  }
}

export default ApiFactory
