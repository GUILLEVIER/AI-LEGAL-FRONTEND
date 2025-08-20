import {
  AvailableField,
  AvailableFieldsResponse,
  TemplateType,
  TemplateTypesResponse,
} from '../interfaces/apiResponsesInterface'
import {
  AvailableFieldsResponseMapper,
  TemplateTypesResponseMapper,
} from '../interfaces/mappersInterface'

export const DocumentsMapper = {
  fromApiGetAvailableFields: (
    availableFields: AvailableFieldsResponse
  ): AvailableFieldsResponseMapper => ({
    count: availableFields.count,
    next: availableFields.next,
    previous: availableFields.previous,
    results: availableFields.results.map((field: AvailableField) => ({
      id: field.id,
      name: field.nombre,
      dataType: field.tipo_dato,
    })),
  }),

  fromApiGetTemplateTypes: (
    templateTypes: TemplateTypesResponse
  ): TemplateTypesResponseMapper => ({
    count: templateTypes.count,
    next: templateTypes.next,
    previous: templateTypes.previous,
    results: templateTypes.results.map((type: TemplateType) => ({
      id: type.id,
      name: type.nombre,
    })),
  }),
}
