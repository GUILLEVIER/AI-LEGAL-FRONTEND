const Examples: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Ejemplos de Uso</h1>
      <div
        style={{
          backgroundColor: '#e9ecef',
          padding: '15px',
          borderRadius: '5px',
        }}
      >
        <p>
          Esta sección contiene ejemplos de uso de las funcionalidades del
          sistema.
        </p>
        <ul>
          <strong>
            <li>
              <a href='/examples/token-validation'>Validación de Token</a>
            </li>
          </strong>
          <strong>
            <li>
              <a href='/examples/api-with-auth'>
                API con Autenticación (useApiWithAuth)
              </a>
            </li>
          </strong>
          <strong>
            <li>
              <a href='/examples/api-with-auth-using-hook'>
                API con Autenticación (Usando Hook useUsersApi)
              </a>
            </li>
          </strong>
          <strong>
            <li>
              <a href='/examples/documents'>
                API de Documentos (Usando Hook useDocumentsApi)
              </a>
            </li>
          </strong>
          {/* Agregar más ejemplos aquí */}
        </ul>
        <p>
          Para más información, consulta la documentación o contacta al soporte.
        </p>
        <p>¡Gracias por usar nuestro sistema!</p>
        <p>Desarrollado por el equipo de AILegal.</p>
      </div>
    </div>
  )
}

export default Examples
