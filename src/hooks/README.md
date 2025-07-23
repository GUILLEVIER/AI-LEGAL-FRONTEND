# API Calls con Autenticación Automática

Este documento explica cómo realizar llamadas a la API sin usar Redux, implementando automáticamente el flujo de verificación y renovación de tokens.

## 🔄 Flujo Implementado

1. **Verificar Token**: Antes de cualquier llamada, se verifica si el token actual es válido
2. **Renovar si es necesario**: Si el token es inválido, se intenta renovar con `refreshToken`
3. **Ejecutar llamada**: Si el token es válido (o se renovó exitosamente), se ejecuta la llamada original
4. **Limpiar en caso de fallo**: Si no se puede renovar, se limpia la autenticación

## 🛠️ Hooks Disponibles

### 1. `useApiWithAuth` - Para llamadas completas a la API

Hook principal que maneja automáticamente la verificación y renovación de tokens antes de cada llamada.

```typescript
import { useApiWithAuth } from '../hooks/useApiWithAuth'

const MyComponent = () => {
  const { isLoading, error, get, post, put, delete: del } = useApiWithAuth()
  
  // Ejemplo: GET
  const loadData = async () => {
    const response = await get<MyDataType>('/api/data')
    if (response && response.data.data) {
      setData(response.data.data)
    }
  }
  
  // Ejemplo: POST
  const createData = async (newData: any) => {
    const response = await post<MyDataType>('/api/data', newData)
    // El hook ya manejó la validación/renovación del token
  }
}
```

### 2. `useTokenValidator` - Para validaciones específicas

Hook más ligero para casos donde solo necesitas validar tokens sin hacer llamadas específicas.

```typescript
import { useTokenValidator } from '../hooks/useTokenValidator'

const MyComponent = () => {
  const { validateAndRefreshToken, isTokenValid, getAuthStatus } = useTokenValidator()
  
  // Validar y renovar si es necesario
  const checkAccess = async () => {
    const isValid = await validateAndRefreshToken()
    if (isValid) {
      // Proceder con la lógica
    } else {
      // Redirigir a login
    }
  }
  
  // Solo verificar sin renovar
  const quickCheck = async () => {
    const isValid = await isTokenValid()
    return isValid
  }
}
```

## 📁 Ubicación de los Archivos

```
src/
├── hooks/
│   ├── useApiWithAuth.tsx      # Hook principal para llamadas API
│   └── useTokenValidator.tsx   # Hook para validación de tokens
└── examples/
    ├── ExampleComponentWithAuth.tsx    # Ejemplo completo de uso
    └── TokenValidationExample.tsx      # Ejemplo de validación
```

## 🎯 Casos de Uso

### 1. Cargar datos al montar un componente

```typescript
useEffect(() => {
  const loadUserData = async () => {
    const response = await get<UserData>('/api/user/profile')
    if (response && response.data.data) {
      setUserData(response.data.data)
    }
  }
  loadUserData()
}, [get])
```

### 2. Validar acceso antes de mostrar contenido sensible

```typescript
useEffect(() => {
  const checkAccess = async () => {
    const isValid = await validateAndRefreshToken()
    setCanShowContent(isValid)
  }
  checkAccess()
}, [])
```

### 3. Verificar token en guards de rutas

```typescript
const ProtectedRoute = ({ children }) => {
  const { isTokenValid } = useTokenValidator()
  const [canAccess, setCanAccess] = useState(false)
  
  useEffect(() => {
    isTokenValid().then(setCanAccess)
  }, [])
  
  return canAccess ? children : <Navigate to="/login" />
}
```

### 4. Operaciones CRUD con autenticación automática

```typescript
// Crear
const createDocument = async (data) => {
  const response = await post('/api/documents', data)
  // Token verificado/renovado automáticamente
}

// Leer
const getDocuments = async () => {
  const response = await get('/api/documents')
  return response?.data.data || []
}

// Actualizar
const updateDocument = async (id, data) => {
  const response = await put(`/api/documents/${id}`, data)
  return response?.data.data
}

// Eliminar
const deleteDocument = async (id) => {
  const response = await del(`/api/documents/${id}`)
  return response !== null
}
```

## ⚡ Ventajas de esta Implementación

1. **Automática**: No necesitas recordar verificar tokens manualmente
2. **Transparente**: Los componentes usan las llamadas normalmente
3. **Eficiente**: Solo renueva tokens cuando es necesario
4. **Resiliente**: Maneja errores y limpia sesiones comprometidas
5. **Flexible**: Diferentes hooks para diferentes necesidades
6. **Compatible**: Mantiene la lógica de storage existente (localStorage/sessionStorage)

## 🔧 Configuración

Los hooks usan las clases existentes:
- `ApiFactory.getServices()` para las llamadas
- `AuthManager` para el manejo de tokens
- Las interfaces existentes para tipado

No requiere configuración adicional, solo importar y usar.

## 🚨 Manejo de Errores

### Estados automáticos:
- **Token válido**: Procede con la llamada
- **Token inválido pero refresh exitoso**: Renueva token y procede
- **Refresh falla**: Limpia autenticación y retorna error

### En el componente:
```typescript
const { isLoading, error } = useApiWithAuth()

if (isLoading) return <Loading />
if (error) return <ErrorMessage error={error} />
```

## 📝 Notas Importantes

1. **Storage**: Respeta el tipo de storage original (localStorage vs sessionStorage)
2. **Concurrencia**: Maneja múltiples llamadas simultáneas correctamente
3. **Logging**: Incluye logs detallados para debugging
4. **Limpieza**: Limpia automáticamente sesiones comprometidas
5. **Tipado**: Completamente tipado con TypeScript
