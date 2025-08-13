import { CompaniesResponse } from '../../../interfaces/apiResponsesInterface'
import { CompaniesResponseMapper } from '../../../interfaces/mappersInterface'
import { CompaniesMapper } from '../../../mapper/CompaniesMapper'
import { useApiWithAuth } from '../../utils/useApiWithAuth'

export const useCompaniesApi = () => {
  const { getWithAuth } = useApiWithAuth()

  const getCompanies = async () => {
    const response = await getWithAuth<CompaniesResponse>(
      '/companies/v1/empresas/'
    )
    if (response && response.data && response.data.data) {
      return {
        ...response,
        data: {
          ...response.data,
          data: CompaniesMapper.fromApiGetCompanies(response.data.data),
        },
      } as {
        data: {
          data: CompaniesResponseMapper
        }
      }
    }
    return null
  }

  return {
    getCompanies,
  }
}
