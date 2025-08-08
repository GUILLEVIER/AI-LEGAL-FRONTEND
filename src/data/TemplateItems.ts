// Datos de ejemplo para las plantillas
export const TemplateItems = [
  {
    id: '1',
    name: 'Contrato de Arrendamiento.pdf',
    type: 'application/pdf',
    size: 1024567,
    uploadDate: new Date('2025-01-15'),
    status: 'active' as const,
    description:
      'Plantilla estándar para contratos de arrendamiento residencial',
  },
  {
    id: '2',
    name: 'Acuerdo de Confidencialidad.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 567890,
    uploadDate: new Date('2025-01-10'),
    status: 'active' as const,
    description: 'NDA estándar para protección de información confidencial',
  },
  {
    id: '3',
    name: 'Poder Notarial.pdf',
    type: 'application/pdf',
    size: 890123,
    uploadDate: new Date('2025-01-05'),
    status: 'inactive' as const,
    description: 'Plantilla para otorgamiento de poderes notariales',
  },
  {
    id: '4',
    name: 'Testamento.doc',
    type: 'application/msword',
    size: 445566,
    uploadDate: new Date('2024-12-28'),
    status: 'active' as const,
    description: 'Plantilla básica para redacción de testamentos',
  },
]
