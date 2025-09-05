import { CompaniesResponse, Company } from '@/interfaces/apiResponsesInterface'
import { CompaniesResponseMapper } from '@/interfaces/mappersInterface'

export const CompaniesMapper = {
  fromApiGetCompanies: (
    companies: CompaniesResponse
  ): CompaniesResponseMapper => ({
    count: companies.count,
    next: companies.next,
    previous: companies.previous,
    results: companies.results.map((company: Company) => ({
      id: company.id,
      plan: company.plan,
      planName: company.plan_nombre,
      planPrice: company.plan_precio,
      rut: company.rut,
      name: company.nombre,
      email: company.correo,
      creationDate: company.fecha_creacion,
    })),
  }),
}
